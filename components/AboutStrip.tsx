import type { SiteSettings } from "@/lib/schema";
import { EmailLink } from "./EmailLink";
import styles from "./AboutStrip.module.css";

/** Closing contact block on every page: the email address is the call to action. */
export function AboutStrip({ site, from = "footer" }: { site: SiteSettings; from?: string }) {
  return (
    <footer id="contact" className={styles.strip}>
      <p className={styles.lead}>Say hello</p>
      <EmailLink email={site.email} from={from} className={styles.email}>
        {site.email}
      </EmailLink>
      <div className={styles.meta}>
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        {site.socials.length > 0 && (
          <ul className={styles.socials}>
            {site.socials.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
