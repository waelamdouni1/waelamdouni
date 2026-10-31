"use client";

import { track } from "@/lib/analytics";

export function EmailLink({
  email,
  className = "btn btn-primary",
  children = "Say hello",
  from,
}: {
  email: string;
  className?: string;
  children?: React.ReactNode;
  from: string;
}) {
  return (
    <a className={className} href={`mailto:${email}`} onClick={() => track("email_cta", { from })}>
      {children}
    </a>
  );
}
