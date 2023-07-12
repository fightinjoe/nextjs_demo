import styles from "./page.module.css";

export default function RootLayout({ children }) {
  return (
    <main className={styles.main}>
      { children }
    </main>
  )
}
