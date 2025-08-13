import styles from './styles.module.css';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={styles.container}><div className={styles.topLine}></div>{children}</main>;
}