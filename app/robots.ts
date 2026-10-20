import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Always enforce www canonical URL for robots and sitemap
  const baseUrl = 'https://www.quranacademee.com';


  const isStagingOrPreview =
    (process.env.NODE_ENV as string) === 'staging' ||
    process.env.VERCEL_ENV === 'preview' ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ||
    process.env.DISABLE_INDEXING === 'true';

  if (isStagingOrPreview) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
