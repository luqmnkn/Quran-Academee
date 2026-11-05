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

export default function DownloadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
