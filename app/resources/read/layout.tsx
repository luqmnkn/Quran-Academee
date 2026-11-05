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

export default function ReadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
