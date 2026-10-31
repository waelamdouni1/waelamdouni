import Link from "next/link";
import { getSiteSettings } from "@/lib/content";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header site={getSiteSettings()} />
      <main id="main" style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "96px var(--gutter)" }}>
        <p className="label">404</p>
        <h1 style={{ fontSize: 40, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.05, marginTop: 8 }}>This wall is empty.</h1>
        <p style={{ marginTop: 24 }}>
          <Link className="btn btn-primary" href="/">
            Back to the gallery
          </Link>
        </p>
      </main>
    </>
  );
}
