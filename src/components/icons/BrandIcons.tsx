import type { SVGProps } from "react";
import type { ServiceIconName } from "@/config/services";

/**
 * Hand-drawn-style line icons matching the mockup: thick black outlines with
 * yellow fills. Decorative — always pair with a visible text label.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "#111111",
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function KeyIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="42" cy="20" r="13" fill="#FFCC00" />
      <circle cx="45" cy="17" r="4" fill="#fff" />
      <path d="M33 29 9 53l4 4 4-4 3 3 4-4-3-3 3-3 3 3 4-4-3-3 6-6" fill="#FFCC00" />
    </svg>
  );
}

export function ToolsIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* wrench */}
      <path
        d="M14 6a10 10 0 0 0 9 14l24 24a5 5 0 0 0 7-7L30 13A10 10 0 0 0 16 4l6 6-2 6-6 2-6-6a10 10 0 0 0 6 0Z"
        fill="#fff"
      />
      <path d="M43 40l7 7" />
      {/* screwdriver */}
      <path d="M50 6l8 8-5 5-8-8z" fill="#FFCC00" />
      <path d="M45 11 36 20M47 13l-9 9" />
      <path d="M36 20l2 2-24 24-5 9 9-5 24-24" fill="#FFCC00" />
    </svg>
  );
}

export function DrillIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="8" y="12" width="36" height="18" rx="5" fill="#FFCC00" />
      <path d="M44 17h7v8h-7" fill="#fff" />
      <path d="M51 21h10" />
      <path d="M58 19l3 2-3 2" />
      <path d="M18 30h14l-3 16H21z" fill="#FFCC00" />
      <rect x="15" y="46" width="20" height="10" rx="3" fill="#111111" />
      <path d="M14 18h12" stroke="#111111" />
      <path d="M33 34h-4" />
    </svg>
  );
}

export function GearIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path
        d="M28 5h8l1.5 7 5 2 6-4 5.5 5.5-4 6 2 5 7 1.5v8l-7 1.5-2 5 4 6-5.5 5.5-6-4-5 2L36 59h-8l-1.5-7-5-2-6 4L10 48.5l4-6-2-5L5 36v-8l7-1.5 2-5-4-6L15.5 10l6 4 5-2z"
        fill="#FFCC00"
      />
      <circle cx="32" cy="32" r="9" fill="#fff" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="32" cy="32" r="26" fill="#FFCC00" strokeWidth={4} />
      <circle cx="32" cy="32" r="19" fill="#fff" />
      <path d="M32 19v13l9 6" strokeWidth={4} />
    </svg>
  );
}

export function FastTruckIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 80 64" {...props}>
      <path d="M3 24h14M7 32h12M2 40h16" />
      <path d="M22 16h30v30H22z" fill="#fff" />
      <path d="M52 24h12l10 11v11H52z" fill="#fff" />
      <path d="M56 28h7l6 7H56z" fill="#FFCC00" />
      <circle cx="32" cy="48" r="6" fill="#fff" />
      <circle cx="64" cy="48" r="6" fill="#fff" />
    </svg>
  );
}

export function VanLockIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 84 64" {...props}>
      <path d="M2 26h12M6 34h10M2 42h12" />
      <path d="M18 18h40l12 12 10 3v13H18z" fill="#fff" />
      <path d="M58 18v15h21" />
      <path d="M61 21l8 9h-8z" fill="#FFCC00" />
      <rect x="31" y="27" width="14" height="11" rx="2" fill="#111111" />
      <path d="M34 27v-4a4 4 0 0 1 8 0v4" />
      <circle cx="30" cy="47" r="6" fill="#fff" />
      <circle cx="66" cy="47" r="6" fill="#fff" />
    </svg>
  );
}

export function ServiceIcon({ name, ...props }: IconProps & { name: ServiceIconName }) {
  switch (name) {
    case "key":
      return <KeyIcon {...props} />;
    case "tools":
      return <ToolsIcon {...props} />;
    case "drill":
      return <DrillIcon {...props} />;
    case "gear":
      return <GearIcon {...props} />;
  }
}

/** Yellow speed lines accent used next to CTAs and highlights. */
export function SpeedLines({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden focusable="false" fill="none">
      <path d="M30 6 22 14M36 20H24M30 34l-8-8" stroke="#FFCC00" strokeWidth={4} strokeLinecap="round" />
    </svg>
  );
}
