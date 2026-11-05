import type { MetadataRoute } from 'next';
import { COURSES_DATA } from '@/lib/coursesData';
import {
  SURAHS,
  JUZ_LIST,
  DUAS,
  DOWNLOADABLE_RESOURCES,
  getSurahSlug,
  getJuzSlug,
} from '@/lib/quranData';

export const revalidate = 86400; // Cache and revalidate sitemap every 24 hours

export default function sitemap(): MetadataRoute.Sitemap {
  // Always use the www version as the canonical base
  const baseUrl = 'https://www.quranacademee.com';

  const currentDate = new Date();

  // All 8 core courses
  const courseUrls: MetadataRoute.Sitemap = COURSES_DATA.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // All 114 Surah PDF download pages
  const surahUrls: MetadataRoute.Sitemap = SURAHS.map((surah) => ({
    url: `${baseUrl}/resources/downloads/surah/${getSurahSlug(surah)}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  // All 30 Para / Juz PDF download pages
  const juzUrls: MetadataRoute.Sitemap = JUZ_LIST.map((juz) => ({
    url: `${baseUrl}/resources/downloads/juz/${getJuzSlug(juz)}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  // All 28 Daily Masnoon Duas pages
  const duaUrls: MetadataRoute.Sitemap = DUAS.map((dua) => ({
    url: `${baseUrl}/resources/downloads/dua/${dua.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  // Downloadable booklet resources (e.g., daily-duas handbook)
  const bookletUrls: MetadataRoute.Sitemap = DOWNLOADABLE_RESOURCES.map((r) => ({
    url: `${baseUrl}/resources/downloads/${r.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    // Core pages
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resources/read`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resources/downloads`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // Dedicated course pages
    ...courseUrls,
    // Trust & Profile pages
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/teachers`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // Dedicated conversion page
    {
      url: `${baseUrl}/free-trial`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Audience pillar pages
    {
      url: `${baseUrl}/online-quran-classes-for-kids`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/learn-quran-online-for-adults`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/female-quran-teacher-online`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    // Country targeted geo pages
    {
      url: `${baseUrl}/online-quran-classes-uk`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/online-quran-classes-usa`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/online-quran-classes-canada`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/online-quran-classes-australia`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Downloadable Surahs, Juz, Duas and Booklets
    ...surahUrls,
    ...juzUrls,
    ...duaUrls,
    ...bookletUrls,
    // Legal pages
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];
}
