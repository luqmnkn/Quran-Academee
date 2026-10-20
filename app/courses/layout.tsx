import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Quran Courses & Programs | Quran Academee',
  description:
    'Explore 1-on-1 online Quran courses with certified male & female scholars. Madani Qaida, Tajweed, Quran Reading, Hifz, Islamic Studies & Arabic. Book a free trial class today.',
  alternates: {
    canonical: 'https://www.quranacademee.com/courses',
  },
  openGraph: {
    title: 'Online Quran Courses & Programs | Quran Academee',
    description:
      'Explore 1-on-1 online Quran courses with certified male & female scholars. Madani Qaida, Tajweed, Quran Reading, Hifz, Islamic Studies & Arabic. Book a free trial class today.',
    url: 'https://www.quranacademee.com/courses',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Quran Academee Courses and Programs',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
