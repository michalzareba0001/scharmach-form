import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  title: 'Wycena Aplikacji Mobilnej | Scharmach',
  description:
    'Otrzymaj wycenę swojej aplikacji mobilnej Flutter. Formularz zaprojektowany przez Scharmach - Twoją agencję marketingową 360°',
  icons: {
    icon: 'https://scharmach.pl/wp-content/uploads/2022/02/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
