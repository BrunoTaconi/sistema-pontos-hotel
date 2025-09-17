import type { Metadata } from "next";
import "./globals.css"; 
import { UserProvider } from "./contexts/UserContext";

export const metadata: Metadata = {
  title: "Meu App",
  description: "Descrição do meu app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
