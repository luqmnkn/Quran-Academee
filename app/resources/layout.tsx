import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Quran & Masnoon Duas Resources | Quran Academee',
  description:
    'Download free Quran PDFs, Masnoon Duas, Tajweed guides, and educational materials for students and families worldwide. Complete 114 Surahs and 30 Juz.',
  alternates: {
    canonical: 'https://www.quranacademee.com/resources',
  },
  openGraph: {
    title: 'Free Quran & Masnoon Duas Resources | Quran Academee',
    description:
      'Download free Quran PDFs, Masnoon Duas, Tajweed guides, and educational materials for students and families worldwide. Complete 114 Surahs and 30 Juz.',
    url: 'https://www.quranacademee.com/resources',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Quran Academee Free Resources',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Quran & Masnoon Duas Resources | Quran Academee',
    description:
      'Download free Quran PDFs, Masnoon Duas, Tajweed guides, and educational materials for students and families worldwide. Complete 114 Surahs and 30 Juz.',
    images: ['/images/link.png'],
  },
};

const resourcesHubSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://www.quranacademee.com/resources#collection',
      url: 'https://www.quranacademee.com/resources',
      name: 'Free Quran & Islamic Learning Resources Hub',
      description:
        'Central repository for free Quran PDFs, 28 Masnoon Duas, interactive digital Quran reader, and authentic educational materials.',
      inLanguage: ['ar', 'en'],
      publisher: {
        '@type': 'EducationalOrganization',
        name: 'Quran Academee',
        url: 'https://www.quranacademee.com',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.quranacademee.com/resources#breadcrumb',
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
      ],
    },
  ],
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resourcesHubSchema) }}
      />
      {children}
    </>
  );
}
