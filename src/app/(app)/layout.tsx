
import Sidebar from '@/components/sidebar/Sidebar';
import styles from './styles.module.css';

// Este layout envolve todas as páginas autenticadas
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}