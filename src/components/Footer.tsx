"use client";

import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";

const EMAIL = "hola@adriarobles.com";

/** Fixed contact bar. Color follows the page: blue on Home, yellow on About. On phones it scrolls like a ticker. */
export default function Footer() {
  const onAbout = usePathname().startsWith("/about");

  const row = (
    <>
      <span className={styles.lead}>Welcome to my site!</span>
      <span className={styles.dot}>•</span>
      <span>Got an idea? Want to collaborate?</span>
      <span className={styles.dot}>•</span>
      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      <span className={styles.dot}>•</span>
      <span>© 2026 All Rights Reserved.</span>
    </>
  );

  return (
    <footer className={`${styles.footer} ${onAbout ? styles.yellow : styles.blue}`}>
      <div className={styles.row}>{row}</div>
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.track}>
          <div className={styles.group}>{row}</div>
          <div className={styles.group}>{row}</div>
        </div>
      </div>
    </footer>
  );
}
