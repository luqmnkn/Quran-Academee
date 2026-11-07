import React from 'react';
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
  twitter: {
    card: 'summary_large_image',
    title: 'Online Quran Classes Pricing Plans from $35/month | Quran Academee',
    description:
      'Explore flexible, affordable online Quran class pricing plans starting from $35/month for Tajweed, Hifz, and Recitation.',
    images: ['/images/link.png'],
  },
};

const pricingPageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.quranacademee.com/pricing#webpage',
      url: 'https://www.quranacademee.com/pricing',
      name: 'Online Quran Classes Pricing Plans from $35/month',
      description:
        'Explore flexible, affordable online Quran class pricing plans starting from $35/month for Tajweed, Hifz, and Recitation with certified teachers.',
      publisher: {
        '@type': 'EducationalOrganization',
        name: 'Quran Academee',
        url: 'https://www.quranacademee.com',
      },
      mainEntity: {
        '@type': 'OfferCatalog',
        name: 'Online Quran Class Tuition Plans',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Plan 1: 2 Days/Week',
            price: '35.00',
            priceCurrency: 'USD',
            description: '8 one-on-one live interactive sessions per month (30 minutes each).',
            availability: 'https://schema.org/InStock',
            url: 'https://www.quranacademee.com/pricing',
          },
          {
            '@type': 'Offer',
            name: 'Plan 2: 3 Days/Week (Recommended)',
            price: '50.00',
            priceCurrency: 'USD',
            description: '12 one-on-one live interactive sessions per month (30 minutes each).',
            availability: 'https://schema.org/InStock',
            url: 'https://www.quranacademee.com/pricing',
          },
          {
            '@type': 'Offer',
            name: 'Plan 3: 5 Days/Week (Intensive)',
            price: '70.00',
            priceCurrency: 'USD',
            description: '20 one-on-one live interactive sessions per month (30 minutes each).',
            availability: 'https://schema.org/InStock',
            url: 'https://www.quranacademee.com/pricing',
          },
        ],
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.quranacademee.com/pricing#breadcrumb',
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
          name: 'Pricing',
          item: 'https://www.quranacademee.com/pricing',
        },
      ],
    },
  ],
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingPageSchema) }}
      />
      {children}
    </>
  );
}
