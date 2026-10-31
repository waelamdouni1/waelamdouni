type EventName = "project_open" | "filter" | "email_cta";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

/** Privacy-friendly event hook. Sends to Plausible once its script is added; a no-op until then. */
export function track(event: EventName, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
  if (process.env.NODE_ENV === "development") console.debug("[track]", event, props ?? "");
}
