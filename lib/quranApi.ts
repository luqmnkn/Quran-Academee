// Quran.com API v4 Client Service for Quran Academee
// Provides Uthmani Madani, Color-Coded Tajweed, IndoPak, English & Urdu Translations, and Audio Recitations

export interface VerseItem {
  id: number;
  verse_key: string;
  verse_number: number;
  text_uthmani?: string;
  text_uthmani_tajweed?: string;
  text_indopak?: string;
  translation?: string;
  translation_ur?: string;
}

export interface ReciterItem {
  id: number;
  name: string;
  style?: string;
}

export const POPULAR_RECITERS: ReciterItem[] = [
  { id: 7, name: 'Mishary Rashid Alafasy' },
  { id: 1, name: 'AbdulBaset AbdulSamad' },
  { id: 6, name: 'Mahmoud Khalil Al-Husary' },
  { id: 4, name: 'Abu Bakr al-Shatri' },
  { id: 3, name: 'Abdur-Rahman as-Sudais' }
];

const API_BASE = 'https://api.quran.com/api/v4';

// In-memory cache to make switching instant
const cache: Record<string, any> = {};

async function fetchWithCache(url: string) {
  if (cache[url]) return cache[url];
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    cache[url] = data;
    return data;
  } catch (err) {
    console.error(`Error fetching ${url}:`, err);
    throw err;
  }
}

/**
 * Fetch verses in Color-Coded Tajweed format (HTML with tajweed CSS classes)
 */
export async function getSurahVersesTajweed(chapterNumber: number): Promise<VerseItem[]> {
  const url = `${API_BASE}/quran/verses/uthmani_tajweed?chapter_number=${chapterNumber}`;
  const data = await fetchWithCache(url);
  return data.verses || [];
}

/**
 * Fetch verses in Uthmani Madani Mushaf format
 */
export async function getSurahVersesMadani(chapterNumber: number): Promise<VerseItem[]> {
  const url = `${API_BASE}/quran/verses/uthmani?chapter_number=${chapterNumber}`;
  const data = await fetchWithCache(url);
  return data.verses || [];
}

/**
 * Fetch verses in IndoPak format
 */
export async function getSurahVersesIndopak(chapterNumber: number): Promise<VerseItem[]> {
  const url = `${API_BASE}/quran/verses/indopak?chapter_number=${chapterNumber}`;
  const data = await fetchWithCache(url);
  return data.verses || [];
}

/**
 * Fetch verses with Translation (English or Urdu)
 */
export async function getSurahTranslation(chapterNumber: number, lang: 'en' | 'ur' = 'en'): Promise<VerseItem[]> {
  const translationId = lang === 'ur' ? 158 : 131; // 158 = Fateh Muhammad Jalandhari (Urdu), 131 = Mustafa Khattab (English)
  const [uthmaniData, transData] = await Promise.all([
    fetchWithCache(`${API_BASE}/quran/verses/uthmani?chapter_number=${chapterNumber}`),
    fetchWithCache(`${API_BASE}/verses/by_chapter/${chapterNumber}?language=${lang}&words=false&translations=${translationId}&fields=text_uthmani&per_page=300`)
  ]);

  const uthmaniVerses = uthmaniData.verses || [];
  const transVerses = transData.verses || [];

  return uthmaniVerses.map((v: any, idx: number) => {
    const t = transVerses[idx];
    const transText = t && t.translations && t.translations[0] ? t.translations[0].text : '';
    // Clean HTML tags from translation text
    const cleanTrans = transText.replace(/<sup[^>]*>.*?<\/sup>/gi, '').replace(/<[^>]+>/g, '');
    return {
      id: v.id,
      verse_key: v.verse_key,
      verse_number: idx + 1,
      text_uthmani: v.text_uthmani,
      translation: cleanTrans
    };
  });
}

/**
 * Fetch audio recitation URL for a given Surah and Reciter
 */
export async function getSurahAudioUrl(chapterNumber: number, reciterId: number = 7): Promise<string | null> {
  const url = `${API_BASE}/chapter_recitations/${reciterId}/${chapterNumber}`;
  const data = await fetchWithCache(url);
  return data.audio_file ? data.audio_file.audio_url : null;
}

/**
 * Fetch Juz verses for Madani or Tajweed
 */
export async function getJuzVerses(juzNumber: number, mode: 'madani' | 'tajweed' | 'indopak' = 'madani'): Promise<VerseItem[]> {
  const endpoint = mode === 'tajweed' ? 'uthmani_tajweed' : mode === 'indopak' ? 'indopak' : 'uthmani';
  const url = `${API_BASE}/quran/verses/${endpoint}?juz_number=${juzNumber}`;
  const data = await fetchWithCache(url);
  return data.verses || [];
}
