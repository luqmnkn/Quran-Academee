import React, { Suspense } from 'react';
import Script from 'next/script';
import LayoutContent from './LayoutContent';
import './globals.css';

export const metadata = {
  title: 'Online Quran Classes for Kids & Adults | Quran Academee',
  description:
    'Master Tajweed, reading & Hifz with certified 1-on-1 online Quran teachers. Interactive online Quran classes for kids and adults worldwide. Book a free trial class today.',
  // Base URL ensures all relative Open Graph image paths resolve correctly
  metadataBase: new URL('https://www.quranacademee.com'),

  // Self-referencing canonical tag for the root
  alternates: {
    canonical: 'https://www.quranacademee.com',
  },

  openGraph: {
    title: 'Online Quran Classes for Kids & Adults | Quran Academee',
    description:
      'Master Tajweed, reading & Hifz with certified 1-on-1 online Quran teachers. Interactive online Quran classes for kids and adults worldwide. Book a free trial class today.',
    url: 'https://www.quranacademee.com',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Quran Academee Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      'msvalidate.01':
        process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ||
        process.env.BING_SITE_VERIFICATION,
    },
  },
};

const organizationAndWebsiteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://www.quranacademee.com/#organization',
      name: 'Quran Academee',
      url: 'https://www.quranacademee.com',
      logo: 'https://www.quranacademee.com/images/favicon.png',
      image: 'https://www.quranacademee.com/images/link.png',
      description:
        'An international online Quran academy guiding students from proper recitation and Hifz to deep translation, understanding, and daily Islamic life application under scholarly supervision.',
      email: 'contact@quranacademee.com',
      telephone: '+923702680670',
      areaServed: 'Worldwide',
      sameAs: [
        'https://www.facebook.com/quranacademee1',
        'https://www.instagram.com/quranacademee/',
        'https://www.youtube.com/@quranacademee',
        'https://www.linkedin.com/company/quran-academee',
        'https://www.tiktok.com/@quranacademee',
        'https://www.reddit.com/user/quranacademee',
      ],
      knowsAbout: [
        'Quran Recitation',
        'Tajweed Rules',
        'Quran Memorization (Hifz)',
        'Arabic Language',
        'Islamic Studies',
        'Masnoon Duas',
      ],
      priceRange: '$$',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.quranacademee.com/#website',
      url: 'https://www.quranacademee.com',
      name: 'Quran Academee',
      publisher: {
        '@id': 'https://www.quranacademee.com/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.quranacademee.com/resources?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Structured Data: EducationalOrganization & WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationAndWebsiteSchema),
          }}
        />
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

            gtag('config', 'G-T1HV73Q5RN', {
              send_page_view: true
            });
          `}
        </Script>
        <link rel="icon" href="/images/favicon.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/images/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Courgette&family=Inter:wght@300;400;500;600;700&family=Rubik:wght@300;400;500;600;700;800;900&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/sf-pro-display" />
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