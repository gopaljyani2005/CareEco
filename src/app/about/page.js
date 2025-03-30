

import styles from "../../style/about.module.css"

export default function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Mock Exchange</h1>
      <h2 className={styles.subtitle}>Our Mission</h2>
      <p className={styles.paragraph}>
        To provide a seamless and efficient trading experience for all investors through our innovative mock exchange platform.
      </p>
      <h2 className={styles.subtitle}>Why Choose Us</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>Realistic trading simulation</li>
        <li className={styles.listItem}>Fast and reliable order processing</li>
        <li className={styles.listItem}>User-friendly interface</li>
      </ul>
    </div>
  );
}


