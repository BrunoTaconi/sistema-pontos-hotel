import styles from './styles.module.css';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={styles.container}>{children}</main>;
}