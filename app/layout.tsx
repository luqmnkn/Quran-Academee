import React, { Suspense } from 'react';
import Script from 'next/script';
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
  title: 'Quran Academee - Sacred Recitation to Living Wisdom',
  description: 'Master Tajweed, reading & Hifz as vital foundations, then connect deeply through Quran understanding, translation & daily life application.',
  // 1. Set your domain base URL so Next.js can resolve relative paths
  metadataBase: new URL('https://quranacademee.com'),
  
  openGraph: {
    title: 'Quran Academee - Sacred Recitation to Living Wisdom',
    description: 'Master Tajweed, reading & Hifz as vital foundations, then connect deeply through Quran understanding, translation & daily life application.',
    url: 'https://quranacademee.com',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png', // 2. Points directly to your static file in public/images/
        width: 1200,
        height: 630,
        alt: 'Quran Academee Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${rubik.variable} ${courgette.variable}`}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-T1HV73Q5RN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-T1HV73Q5RN');
          `}
        </Script>
        <link rel="icon" href="/images/favicon.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/images/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/favicon.png" />
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