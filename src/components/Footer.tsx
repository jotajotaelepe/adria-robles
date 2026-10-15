"use client";

import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";

const EMAIL = "hola@adriarobles.com";

function Items({ hidden }: { hidden?: boolean }) {
  return (
    <>
      <span className={styles.lead}>Welcome to my site!</span>
      <span className={styles.dot}>•</span>
      <span>Got an idea? Want to collaborate?</span>
      <span className={styles.dot}>•</span>
      <a href={`mailto:${EMAIL}`} tabIndex={hidden ? -1 : undefined}>
        {EMAIL}
      </a>
      <span className={styles.dot}>•</span>
      <span>© 2026 All Rights Reserved.</span>
      <span className={styles.dot}>•</span>
      <span className={styles.hint}>
        HINT: <em>there are frogs hiding on this page</em>
      </span>
      <span className={styles.dot}>•</span>
    </>
  );
}

/** Fixed contact marquee. Color follows the page: blue on Home, yellow on About. Pauses on hover. */
export default function Footer() {
  const onAbout = usePathname().startsWith("/about");

  return (
    <footer className={`${styles.footer} ${onAbout ? styles.yellow : styles.blue}`}>
      <div className={styles.track}>
        <div className={styles.group}>
          <Items />
        </div>
        <div className={styles.group} aria-hidden="true">
          <Items hidden />
        </div>
      </div>
    </footer>
  );
}
