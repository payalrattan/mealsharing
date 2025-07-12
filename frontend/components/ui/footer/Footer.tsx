import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3 className={styles.heading}>Follow us</h3>
      <ul className={styles.socialLinks}>
        <li><a href="https://facebook.com">Facebook</a></li>
        <li><a href="https://instagram.com">Instagram</a></li>
        <li><a href="https://tiktok.com">Tiktok</a></li>
        <li><a href="https://google.com">Google</a></li>
        <li><a href="https://linkedin.com">LinkedIn</a></li>
      </ul>
    </footer>
  );
};
