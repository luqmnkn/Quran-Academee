import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Quran Classes Pricing Plans from $35/month | Quran Academee',
  description:
    'Explore flexible, affordable online Quran class pricing plans starting from $35/month for Tajweed, Hifz, and Recitation. Book a free trial class with certified teachers.',
  alternates: {
    canonical: 'https://www.quranacademee.com/pricing',
  },
  openGraph: {
    title: 'Online Quran Classes Pricing Plans from $35/month | Quran Academee',
    description:
      'Explore flexible, affordable online Quran class pricing plans starting from $35/month for Tajweed, Hifz, and Recitation. Book a free trial class with certified teachers.',
    url: 'https://www.quranacademee.com/pricing',
    siteName: 'Quran Academee',
    images: [
      {
        url: '/images/link.png',
        width: 1200,
        height: 630,
        alt: 'Quran Academee Pricing Plans',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
