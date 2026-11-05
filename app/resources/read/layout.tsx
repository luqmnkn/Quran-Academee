import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Read Holy Quran Online (114 Surahs & 30 Juz) | Quran Academee',
  description:
    'Read the complete Holy Quran online with English translations, audio recitations, and chapter selection across all 114 Surahs and 30 Juz. Interactive digital Mushaf for desktop and mobile.',
  alternates: {
    canonical: 'https://www.quranacademee.com/resources/read',
  },
  openGraph: {
    title: 'Read Holy Quran Online (114 Surahs & 30 Juz) | Quran Academee',
    description:
      'Read the complete Holy Quran online with English translations, audio recitations, and chapter selection across all 114 Surahs and 30 Juz. Interactive digital Mushaf for desktop and mobile.',
    url: 'https://www.quranacademee.com/resources/read',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Read Holy Quran Online',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Read Holy Quran Online (114 Surahs & 30 Juz) | Quran Academee',
    description:
      'Read the complete Holy Quran online with English translations, audio recitations, and chapter selection across all 114 Surahs and 30 Juz.',
    images: ['/images/link.png'],
  },
};

const readPageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.quranacademee.com/resources/read#webpage',
      url: 'https://www.quranacademee.com/resources/read',
      name: 'Read Holy Quran Online (114 Surahs & 30 Juz)',
      description:
        'Interactive digital Quran reader featuring complete Arabic script, English translations, and verse-by-verse audio recitations.',
      inLanguage: ['ar', 'en'],
      publisher: {
        '@type': 'EducationalOrganization',
        name: 'Quran Academee',
        url: 'https://www.quranacademee.com',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.quranacademee.com/resources/read#breadcrumb',
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
          name: 'Read Quran Online',
          item: 'https://www.quranacademee.com/resources/read',
        },
      ],
    },
  ],
};

export default function ReadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(readPageSchema) }}
      />
      {children}
    </>
  );
}
