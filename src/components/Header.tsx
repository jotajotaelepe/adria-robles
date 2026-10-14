import Link from "next/link";
import Badge from "./Badge";
import styles from "./Header.module.css";

type Props = { title: string; titleHref?: string };

export default function Header({ title, titleHref }: Props) {
  return (
    <header className={styles.header}>
      {titleHref ? (
        <Link href={titleHref} className={styles.name}>
          {title}
        </Link>
      ) : (
        <h1 className={styles.name}>{title}</h1>
      )}
      <Badge />
    </header>
  );
}
