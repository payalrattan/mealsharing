import Link from "next/link";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.link}>HOME</Link>
      <Link href="/reservations" className={styles.link}>VIEW RESERVATIONS</Link>
      <Link href="/reviews" className={styles.link}>VIEW REVIEWS</Link>

    </nav>
  );
};
