"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { Icon } from "./Icon";
import styles from "./CopyEmail.module.css";

/**
 * Copies the email address and confirms with "Copied" for a moment. The two labels share
 * one cell so the button never changes width.
 * - "dock": solid pill; shrinks to its icon on phones.
 * - "card": glass pill, used in the About card.
 */
export function CopyEmail({
  email,
  variant,
  label = "Copy my email",
  from,
}: {
  email: string;
  variant: "dock" | "card";
  label?: string;
  from: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard API can be blocked (permissions, unfocused document); fall back to a selection copy.
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const ok = document.execCommand("copy");
      field.remove();
      if (!ok) return;
    }
    track("email_cta", { from });
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      className={styles.copy}
      data-variant={variant}
      data-copied={copied || undefined}
      onClick={copy}
      aria-label={copied ? `Copied ${email}` : `Copy my email, ${email}`}
    >
      <span className={styles.icon} aria-hidden="true">
        <Icon name={copied ? "check" : "copy"} />
      </span>
      <span className={styles.labels} aria-hidden="true">
        <span data-hidden={copied || undefined}>{label}</span>
        <span data-hidden={!copied || undefined}>Copied</span>
      </span>
      <span className="visually-hidden" aria-live="polite">
        {copied ? "Email copied" : ""}
      </span>
    </button>
  );
}
