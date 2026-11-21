"use client";

import Script from "next/script";
import { useEffect } from "react";
import { business } from "@/config/business";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

/** Send a GA4 event if analytics is configured. Safe to call anywhere on the client. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") window.gtag("event", name, params);
}

/**
 * Google Analytics 4, loaded only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 * Tracks every tap on a tel: link as `call_click` (mark it as a key event in GA4)
 * so you can see which pages turn visitors into phone calls.
 */
export function Analytics() {
  const id = business.gaMeasurementId;

  useEffect(() => {
    if (!id) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="tel:"]');
      if (link) trackEvent("call_click", { page_path: window.location.pathname, link_text: link.textContent?.trim() });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [id]);

  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(id)});`}
      </Script>
    </>
  );
}
