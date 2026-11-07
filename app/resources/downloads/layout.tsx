import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download Holy Quran & Daily Masnoon Duas PDFs | Quran Academee',
  description:
    'Download clean, printable simple-text PDFs for all 114 Surahs, 30 Juz (Paras), and 28 authentic Masnoon Duas for offline reading, memorization, and revision.',
  alternates: {
    canonical: 'https://www.quranacademee.com/resources/downloads',
  },
  openGraph: {
    title: 'Download Holy Quran & Daily Masnoon Duas PDFs | Quran Academee',
    description:
      'Download clean, printable simple-text PDFs for all 114 Surahs, 30 Juz (Paras), and 28 authentic Masnoon Duas for offline reading, memorization, and revision.',
    url: 'https://www.quranacademee.com/resources/downloads',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Download Holy Quran and Duas PDFs',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download Holy Quran & Daily Masnoon Duas PDFs | Quran Academee',
    description:
      'Download clean, printable simple-text PDFs for all 114 Surahs, 30 Juz (Paras), and 28 authentic Masnoon Duas for offline reading, memorization, and revision.',
    images: ['/images/link.png'],
  },
};

const downloadsPageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://www.quranacademee.com/resources/downloads#collection',
      url: 'https://www.quranacademee.com/resources/downloads',
      name: 'Download Holy Quran & Daily Masnoon Duas PDFs',
      description:
        'Download clean, printable simple-text PDFs for all 114 Surahs, 30 Juz (Paras), and 28 authentic Masnoon Duas for offline reading, memorization, and revision.',
      inLanguage: ['ar', 'en'],
      publisher: {
        '@type': 'EducationalOrganization',
        name: 'Quran Academee',
        url: 'https://www.quranacademee.com',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.quranacademee.com/resources/downloads#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.quranacademee.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Resources',
          item: 'https://www.quranacademee.com/resources',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Downloads',
          item: 'https://www.quranacademee.com/resources/downloads',
        },
      ],
    },
  ],
};

export default function DownloadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(downloadsPageSchema) }}
      />
      {children}
    </>
  );
}
