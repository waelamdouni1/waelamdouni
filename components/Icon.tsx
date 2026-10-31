import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Download, X as Close } from "lucide-react";

/*
 * Line icons from Lucide (lucide.dev, ISC). Brand marks come from Simple Icons
 * (simpleicons.org, CC0), since a line set doesn't carry real logos.
 */

function Brand({ d, ...props }: { d: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d={d} />
    </svg>
  );
}

const X_LOGO =
  "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z";
const LINKEDIN_LOGO =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";
const FRAMER_LOGO = "M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z";

const LINE = { copy: Copy, check: Check, download: Download, close: Close, external: ArrowUpRight, arrowLeft: ArrowLeft, arrowRight: ArrowRight } as const;
const BRAND = { x: X_LOGO, linkedin: LINKEDIN_LOGO, framer: FRAMER_LOGO } as const;

export type IconName = keyof typeof LINE | keyof typeof BRAND;

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  if (name in BRAND) {
    // Logos read heavier than line icons, so they sit a touch smaller.
    const s = Math.round(size * 0.85);
    return <Brand d={BRAND[name as keyof typeof BRAND]} width={s} height={s} aria-hidden="true" focusable="false" />;
  }
  const Line = LINE[name as keyof typeof LINE];
  return <Line size={size} strokeWidth={1.75} aria-hidden="true" focusable="false" />;
}
