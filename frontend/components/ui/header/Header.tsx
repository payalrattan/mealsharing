import Link from "next/link";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.link}>HOME</Link>
      <Link href="/meals" className={styles.link}>MEALS</Link>
      <Link href="/becomehost" className={styles.link}>BECOME A HOST</Link>
    </nav>
  );
};
