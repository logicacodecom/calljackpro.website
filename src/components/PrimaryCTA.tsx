import Link from "next/link";
import { ArrowRight, MessageCircleMore, Phone } from "lucide-react";
import { business } from "@/config/business";
import { REQUEST_FORM_HREF } from "@/config/navigation";
import { Button, type ButtonProps } from "@/components/ui/button";

type CallProps = {
  /** Visible label. Defaults to "Call Now". */
  label?: string;
  /** Append the phone number to the label. */
  showNumber?: boolean;
  size?: ButtonProps["size"];
  className?: string;
};

/** Yellow click-to-call button. Every phone CTA on the site uses this. */
export function CallButton({ label = "Call Now", showNumber = false, size = "lg", className }: CallProps) {
  const text = showNumber ? `${label === "Call Now" ? "Call" : label} ${business.phone.display}` : label;
  return (
    <Button asChild variant="primary" size={size} className={className}>
      <a href={business.phone.href} aria-label={`${text} — calls ${business.name} at ${business.phone.display}`}>
        <Phone aria-hidden fill="currentColor" strokeWidth={1.5} />
        <span>{text}</span>
      </a>
    </Button>
  );
}

/** Outlined secondary CTA that opens the service request form. */
export function HelpButton({
  label = "Get Immediate Help",
  size = "lg",
  className,
  icon = "arrow",
}: {
  label?: string;
  size?: ButtonProps["size"];
  className?: string;
  icon?: "arrow" | "chat";
}) {
  return (
    <Button asChild variant="outline" size={size} className={className}>
      <Link href={REQUEST_FORM_HREF}>
        {icon === "chat" && <MessageCircleMore aria-hidden />}
        <span>{label}</span>
        <ArrowRight aria-hidden />
      </Link>
    </Button>
  );
}
