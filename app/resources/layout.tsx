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
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
