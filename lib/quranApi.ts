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
 * Fetch verses in Uthmani Madani Mushaf format
 */
export async function getSurahVersesMadani(chapterNumber: number): Promise<VerseItem[]> {
  const url = `${API_BASE}/quran/verses/uthmani?chapter_number=${chapterNumber}`;
  const data = await fetchWithCache(url);
  return data.verses || [];
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
