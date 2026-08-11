import React, { Suspense } from 'react';
import { Inter, Rubik, Courgette } from 'next/font/google';
import LayoutContent from './LayoutContent';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-headings',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const courgette = Courgette({
  subsets: ['latin'],
  variable: '--font-rotating',
  display: 'swap',
  weight: ['400'],
});

export const metadata = {
  title: 'Quran Academee - Live 1-on-1 Quran Classes',
  description: 'Learn Quran online with qualified, certified male and female scholars. Tajweed rules, memorization, and Arabic lessons.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${rubik.variable} ${courgette.variable}`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className="relative min-h-screen font-sans antialiased text-gray-950 bg-gray-50/50">
        <Suspense fallback={<main>{children}</main>}>
          <LayoutContent>{children}</LayoutContent>
        </Suspense>
      </body>
    </html>
  );
}