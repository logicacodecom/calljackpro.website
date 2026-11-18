import "server-only";
import { business } from "@/config/business";
import { requestCategories } from "@/config/services";
import type { ServiceRequestInput } from "./service-request";

/**
 * Lead delivery integration interface.
 *
 * A service request is only reported as "sent" if at least one configured
 * provider accepts it. With no provider configured, the form tells visitors
 * to call instead — it never pretends a request was received.
 *
 * Providers (configure via environment variables, see .env.example):
 *  - Webhook: LEAD_WEBHOOK_URL (+ optional LEAD_WEBHOOK_SECRET) — POSTs JSON.
 *    Works with Zapier, Make, n8n, Slack workflow webhooks, a CRM, etc.
 *  - Resend email: RESEND_API_KEY + LEAD_EMAIL_TO + LEAD_EMAIL_FROM.
 */
export type ServiceLead = ServiceRequestInput & {
  serviceLabel: string;
  emergency: boolean;
  submittedAt: string;
  source: string;
};

export interface LeadDeliveryProvider {
  name: string;
  isConfigured(): boolean;
  deliver(lead: ServiceLead): Promise<void>;
}

const webhookProvider: LeadDeliveryProvider = {
  name: "webhook",
  isConfigured: () => Boolean(process.env.LEAD_WEBHOOK_URL),
  async deliver(lead) {
    const res = await fetch(process.env.LEAD_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET && { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` }),
      },
      body: JSON.stringify({ type: "service_request", business: business.name, lead }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  },
};

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const resendProvider: LeadDeliveryProvider = {
  name: "resend",
  isConfigured: () =>
    Boolean(process.env.RESEND_API_KEY && process.env.LEAD_EMAIL_TO && process.env.LEAD_EMAIL_FROM),
  async deliver(lead) {
    const rows: [string, string][] = [
      ["Name", lead.name],
      ["Phone", lead.phone],
      ["Service", lead.serviceLabel + (lead.emergency ? " (EMERGENCY)" : "")],
      ["Location / ZIP", lead.location],
      ["Problem", lead.description],
      ["Preferred time", lead.preferredTime || "—"],
      ["Submitted", lead.submittedAt],
    ];
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_EMAIL_FROM,
        to: process.env.LEAD_EMAIL_TO!.split(",").map((s) => s.trim()),
        subject: `${lead.emergency ? "[URGENT] " : ""}New request: ${lead.serviceLabel} — ${lead.name}`,
        text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
        html: `<table>${rows
          .map(([k, v]) => `<tr><th align="left">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`)
          .join("")}</table>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  },
};

const providers: LeadDeliveryProvider[] = [webhookProvider, resendProvider];

export const isLeadDeliveryConfigured = () => providers.some((p) => p.isConfigured());

export function buildLead(input: ServiceRequestInput): ServiceLead {
  const category = requestCategories.find((c) => c.value === input.service);
  return {
    ...input,
    serviceLabel: category?.label ?? input.service,
    emergency: Boolean(category?.emergency),
    submittedAt: new Date().toISOString(),
    source: business.siteUrl,
  };
}

/** Delivers to every configured provider; succeeds if at least one accepts. */
export async function deliverLead(lead: ServiceLead): Promise<{ delivered: string[]; failed: string[] }> {
  const active = providers.filter((p) => p.isConfigured());
  const results = await Promise.allSettled(active.map((p) => p.deliver(lead)));
  const delivered: string[] = [];
  const failed: string[] = [];
  results.forEach((r, i) => {
    if (r.status === "fulfilled") delivered.push(active[i].name);
    else {
      failed.push(active[i].name);
      console.error(`[lead-delivery] ${active[i].name} failed:`, r.reason);
    }
  });
  return { delivered, failed };
}
