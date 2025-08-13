import type { Metadata } from "next";
import "./globals.css"; // Seus estilos globais já importam a fonte

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
      <body>{children}</body>
    </html>
  );
}