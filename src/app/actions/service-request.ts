"use server";

import { headers } from "next/headers";
import { buildLead, deliverLead, isLeadDeliveryConfigured } from "@/lib/lead-delivery";
import { rateLimit } from "@/lib/rate-limit";
import {
  readServiceRequest,
  validateServiceRequest,
  type ServiceRequestState,
} from "@/lib/service-request";

const MIN_FILL_MS = 2500;

export async function submitServiceRequest(
  _prev: ServiceRequestState,
  form: FormData,
): Promise<ServiceRequestState> {
  const values = readServiceRequest(form);

  // --- Spam protection -----------------------------------------------------
  // 1) Honeypot: real visitors never see or fill this field.
  const honeypot = String(form.get("company_website") ?? "");
  // 2) Time trap: bots tend to submit instantly.
  const startedAt = Number(form.get("startedAt") ?? 0);
  const tooFast = !startedAt || Date.now() - startedAt < MIN_FILL_MS;
  if (honeypot || tooFast) {
    // Respond like a normal failure without revealing the reason.
    return { status: "error", message: "We couldn't send your request. Please call us instead.", values };
  }
  // 3) Per-IP rate limit.
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (!rateLimit(`sr:${ip}`)) {
    return {
      status: "error",
      message: "Too many requests from this connection. Please call us — it's the fastest way to reach Jack.",
      values,
    };
  }

  // --- Validation ----------------------------------------------------------
  const fieldErrors = validateServiceRequest(values);
  if (Object.keys(fieldErrors).length > 0) return { status: "invalid", fieldErrors, values };

  // --- Delivery ------------------------------------------------------------
  if (!isLeadDeliveryConfigured()) return { status: "not_configured", values };

  const { delivered } = await deliverLead(buildLead(values));
  if (delivered.length === 0) {
    return {
      status: "error",
      message: "Something went wrong sending your request. Please call us so we can help right away.",
      values,
    };
  }
  return { status: "success", name: values.name.split(" ")[0] };
}
