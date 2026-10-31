import Link from "next/link";
import type { SiteSettings } from "@/lib/schema";
import { EmailLink } from "./EmailLink";
import styles from "./Header.module.css";

export function Header({ site, children }: { site: SiteSettings; children?: React.ReactNode }) {
  return (
    <header className={styles.header} data-has-tabs={children ? "" : undefined}>
      <div className={styles.inner}>
        <Link href="/" className={styles.identity}>
          <span className={styles.name}>{site.name}</span>
          <span className={styles.role}>{site.role}</span>
        </Link>
        {children && <div className={styles.tabs}>{children}</div>}
        <EmailLink email={site.email} from="header" className={styles.contact} />
      </div>
    </header>
  );
}
