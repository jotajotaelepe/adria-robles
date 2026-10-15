import Link from "next/link";
import Badge from "./Badge";
import styles from "./Header.module.css";

type Props = { title: string; titleHref?: string };

export default function Header({ title, titleHref }: Props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.name}>{titleHref ? <Link href={titleHref}>{title}</Link> : title}</h1>
      <Badge />
    </header>
  );
}
