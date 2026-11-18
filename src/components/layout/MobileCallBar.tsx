import Link from "next/link";
import { MessageCircleMore, Phone } from "lucide-react";
import { business } from "@/config/business";
import { REQUEST_FORM_HREF } from "@/config/navigation";

/** Sticky bottom call bar — mobile only. Never hides, never pops up. */
export function MobileCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-paper px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:hidden"
      role="region"
      aria-label="Quick contact"
    >
      <div className="flex gap-2">
        <a
          href={business.phone.href}
          className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-ink bg-brand font-display text-lg font-bold italic text-ink shadow-pop active:translate-y-0.5 active:shadow-none"
        >
          <Phone aria-hidden className="size-5" fill="currentColor" strokeWidth={1.5} />
          <span>
            Call Now <span className="font-semibold not-italic">· 24/7</span>
          </span>
          <span className="sr-only">{business.phone.display}</span>
        </a>
        <Link
          href={REQUEST_FORM_HREF}
          className="flex min-h-14 w-[4.5rem] flex-col items-center justify-center rounded-xl border-2 border-ink bg-paper text-xs font-bold text-ink"
        >
          <MessageCircleMore aria-hidden className="size-5" />
          Request
        </Link>
      </div>
    </div>
  );
}
