// Auto-generated Quran Academee Resource Data Registry

export interface SurahItem {
  id: number;
  name: string;
  slug?: string;
  arabic: string;
  transliteration: string;
  verses: number;
  type: 'Meccan' | 'Medinan';
  theme: string;
  fileName: string;
  filePath: string;
}

export function getSurahSlug(s: SurahItem): string {
  if (s.slug) return s.slug;
  const cleanName = s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `surah-${cleanName}-${s.id}`;
}

export interface JuzItem {
  id: number;
  name: string;
  paraName?: string;
  slug?: string;
  arabic: string;
  startSurah: string;
  versesSpan: string;
  theme: string;
  fileName: string;
  filePath: string;
}

export const PARA_NAMES: Record<number, { paraName: string; slug: string }> = {
  1: { paraName: "Alif Lam Meem", slug: "juz-1-alif-lam-meem" },
  2: { paraName: "Sayaqool", slug: "juz-2-sayaqool" },
  3: { paraName: "Tilkal Rusul", slug: "juz-3-tilkal-rusul" },
  4: { paraName: "Lan Tanalu", slug: "juz-4-lan-tanalu" },
  5: { paraName: "Wal Muhsanat", slug: "juz-5-wal-muhsanat" },
  6: { paraName: "La Yuhibbullah", slug: "juz-6-la-yuhibbullah" },
  7: { paraName: "Wa Iza Samiu", slug: "juz-7-wa-iza-samiu" },
  8: { paraName: "Wa Lau Annana", slug: "juz-8-wa-lau-annana" },
  9: { paraName: "Qalal Mala'u", slug: "juz-9-qalal-malau" },
  10: { paraName: "Wa A'lamu", slug: "juz-10-wa-alamu" },
  11: { paraName: "Yatazeroon", slug: "juz-11-yatazeroon" },
  12: { paraName: "Wa Mamin Dabbah", slug: "juz-12-wa-mamin-dabbah" },
  13: { paraName: "Wa Ma Ubri'u", slug: "juz-13-wa-ma-ubriu" },
  14: { paraName: "Rubama", slug: "juz-14-rubama" },
  15: { paraName: "Subhanallazi", slug: "juz-15-subhanallazi" },
  16: { paraName: "Qala Alam", slug: "juz-16-qala-alam" },
  17: { paraName: "Iqtaraba", slug: "juz-17-iqtaraba" },
  18: { paraName: "Qad Aflaha", slug: "juz-18-qad-aflaha" },
  19: { paraName: "Wa Qalallazina", slug: "juz-19-wa-qalallazina" },
  20: { paraName: "A'man Khalaq", slug: "juz-20-aman-khalaq" },
  21: { paraName: "Utlu Ma Oohiya", slug: "juz-21-utlu-ma-oohiya" },
  22: { paraName: "Wa Manyaqnut", slug: "juz-22-wa-manyaqnut" },
  23: { paraName: "Wa Mali", slug: "juz-23-wa-mali" },
  24: { paraName: "Faman Azlam", slug: "juz-24-faman-azlam" },
  25: { paraName: "Elaehi Yurad", slug: "juz-25-elaehi-yurad" },
  26: { paraName: "Ha'a Meem", slug: "juz-26-haa-meem" },
  27: { paraName: "Qala Fama Khatbukum", slug: "juz-27-qala-fama-khatbukum" },
  28: { paraName: "Qad Sami Allah", slug: "juz-28-qad-sami-allah" },
  29: { paraName: "Tabarakallazi", slug: "juz-29-tabarakallazi" },
  30: { paraName: "Amma Yatasa'aloon", slug: "juz-30-amma-yatasaaloon-juz-amma" },
};

export function getJuzSlug(juz: JuzItem): string {
  return juz.slug || PARA_NAMES[juz.id]?.slug || `juz-${juz.id}`;
}

export function getJuzParaName(juz: JuzItem): string {
  return juz.paraName || PARA_NAMES[juz.id]?.paraName || juz.name;
}

export interface DownloadableResource {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription?: string;
  outlines?: string[];
  thumbnail: string;
  fileSize: string;
  pages: number;
  format: string;
  downloadPath: string;
  badge?: string;
}

export const SURAHS: SurahItem[] = [
  {
    "id": 1,
    "name": "Al-Fatihah",
    "arabic": "الفاتحة",
    "transliteration": "Fatiha",
    "verses": 7,
    "type": "Meccan",
    "theme": "The Opening & Fundamental Supplication",
    "fileName": "Surah-Fatiha-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Fatiha-in-Arabic.pdf"
  },
  {
    "id": 2,
    "name": "Al-Baqarah",
    "arabic": "البقرة",
    "transliteration": "Baqarah",
    "verses": 286,
    "type": "Medinan",
    "theme": "Guidance, Laws, Faith & Covenant",
    "fileName": "Surah-Baqarah-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Baqarah-in-Arabic.pdf"
  },
  {
    "id": 3,
    "name": "Ali 'Imran",
    "arabic": "آل عمران",
    "transliteration": "Al-Imran",
    "verses": 200,
    "type": "Medinan",
    "theme": "Unity, Steadfastness & Truth of Monotheism",
    "fileName": "Surah-Al-Imran-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Al-Imran-in-Arabic.pdf"
  },
  {
    "id": 4,
    "name": "An-Nisa",
    "arabic": "النساء",
    "transliteration": "Nisa",
    "verses": 176,
    "type": "Medinan",
    "theme": "Social Justice, Family Structure & Rights",
    "fileName": "Surah-Nisa-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Nisa-in-Arabic.pdf"
  },
  {
    "id": 5,
    "name": "Al-Ma'idah",
    "arabic": "المائدة",
    "transliteration": "Maidah",
    "verses": 120,
    "type": "Medinan",
    "theme": "Covenants, Divine Law & Halal Living",
    "fileName": "Surah-Maidah-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Maidah-in-Arabic.pdf"
  },
  {
    "id": 6,
    "name": "Al-An'am",
    "arabic": "الأنعام",
    "transliteration": "Anam",
    "verses": 165,
    "type": "Meccan",
    "theme": "Tawhid (Oneness), Creation & Divine Power",
    "fileName": "Surah-Anam-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Anam-in-Arabic.pdf"
  },
  {
    "id": 7,
    "name": "Al-A'raf",
    "arabic": "الأعراف",
    "transliteration": "Araf",
    "verses": 206,
    "type": "Meccan",
    "theme": "Prophetic Warnings & Spiritual Discernment",
    "fileName": "Surah-Araf-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Araf-in-Arabic.pdf"
  },
  {
    "id": 8,
    "name": "Al-Anfal",
    "arabic": "الأنفال",
    "transliteration": "Anfal",
    "verses": 75,
    "type": "Medinan",
    "theme": "Trust in Allah & Principles of Victory",
    "fileName": "Surah-Anfal-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Anfal-in-Arabic.pdf"
  },
  {
    "id": 9,
    "name": "At-Tawbah",
    "arabic": "التوبة",
    "transliteration": "Taubah",
    "verses": 129,
    "type": "Medinan",
    "theme": "Sincerity, Repentance & Divine Protection",
    "fileName": "Surah-Taubah-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Taubah-in-Arabic.pdf"
  },
  {
    "id": 10,
    "name": "Yunus",
    "arabic": "يونس",
    "transliteration": "Yunus",
    "verses": 109,
    "type": "Meccan",
    "theme": "Divine Signs, Patience & Truth of Revelation",
    "fileName": "Surah-Yunus-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Yunus-in-Arabic.pdf"
  },
  {
    "id": 11,
    "name": "Hud",
    "arabic": "هود",
    "transliteration": "Hud",
    "verses": 123,
    "type": "Meccan",
    "theme": "Perseverance of Prophets & Accountability",
    "fileName": "Surah-Hud-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Hud-in-Arabic.pdf"
  },
  {
    "id": 12,
    "name": "Yusuf",
    "arabic": "يوسف",
    "transliteration": "Yusuf",
    "verses": 111,
    "type": "Meccan",
    "theme": "Patience, Divine Decree & Moral Character",
    "fileName": "Surah-Yusuf-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Yusuf-in-Arabic.pdf"
  },
  {
    "id": 13,
    "name": "Ar-Ra'd",
    "arabic": "الرعد",
    "transliteration": "Ar-Rad",
    "verses": 43,
    "type": "Medinan",
    "theme": "Truth of Divine Revelation & Natural Laws",
    "fileName": "Surah-Ar-Rad-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Ar-Rad-in-Arabic.pdf"
  },
  {
    "id": 14,
    "name": "Ibrahim",
    "arabic": "إبراهيم",
    "transliteration": "Ibrahim",
    "verses": 52,
    "type": "Meccan",
    "theme": "Gratitude, Prayer & Legacy of Prophet Ibrahim",
    "fileName": "Surah-Ibrahim-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Ibrahim-in-Arabic.pdf"
  },
  {
    "id": 15,
    "name": "Al-Hijr",
    "arabic": "الحجر",
    "transliteration": "Hijr",
    "verses": 99,
    "type": "Meccan",
    "theme": "Divine Preservation of Quran & Warnings",
    "fileName": "Surah-Hijr-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Hijr-in-Arabic.pdf"
  },
  {
    "id": 16,
    "name": "An-Nahl",
    "arabic": "النحل",
    "transliteration": "Nahl",
    "verses": 128,
    "type": "Meccan",
    "theme": "Blessings of Allah & Practical Gratitude",
    "fileName": "Surah-Nahl-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Nahl-in-Arabic.pdf"
  },
  {
    "id": 17,
    "name": "Al-Isra",
    "arabic": "الإسراء",
    "transliteration": "Isra",
    "verses": 111,
    "type": "Meccan",
    "theme": "Spiritual Elevation & Practical Commandments",
    "fileName": "Surah-Isra-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Isra-in-Arabic.pdf"
  },
  {
    "id": 18,
    "name": "Al-Kahf",
    "arabic": "الكهف",
    "transliteration": "Kahf",
    "verses": 110,
    "type": "Meccan",
    "theme": "Protection from Trials & Wisdom of Faith",
    "fileName": "Surah-Kahf-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Kahf-in-Arabic.pdf"
  },
  {
    "id": 19,
    "name": "Maryam",
    "arabic": "مريم",
    "transliteration": "Maryam",
    "verses": 98,
    "type": "Meccan",
    "theme": "Divine Mercy, Miracles & Prophetic Devotion",
    "fileName": "Surah-Maryam-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Maryam-in-Arabic.pdf"
  },
  {
    "id": 20,
    "name": "Taha",
    "arabic": "طه",
    "transliteration": "Taha",
    "verses": 135,
    "type": "Meccan",
    "theme": "Solace in Worship & Call of Prophet Musa",
    "fileName": "Surah-Taha-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Taha-in-Arabic.pdf"
  },
  {
    "id": 21,
    "name": "Al-Anbiya",
    "arabic": "الأنبياء",
    "transliteration": "Anbiya",
    "verses": 112,
    "type": "Meccan",
    "theme": "Unity of Prophetic Message & Accountability",
    "fileName": "Surah-Anbiya-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Anbiya-in-Arabic.pdf"
  },
  {
    "id": 22,
    "name": "Al-Hajj",
    "arabic": "الحج",
    "transliteration": "Hajj",
    "verses": 78,
    "type": "Medinan",
    "theme": "Sacred Pilgrimage, Sacrifice & Devotion",
    "fileName": "Surah-Hajj-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Hajj-in-Arabic.pdf"
  },
  {
    "id": 23,
    "name": "Al-Mu'minun",
    "arabic": "المؤمنون",
    "transliteration": "Muminun",
    "verses": 118,
    "type": "Meccan",
    "theme": "Attributes of True Believers & Salvation",
    "fileName": "Surah-Muminun-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Muminun-in-Arabic.pdf"
  },
  {
    "id": 24,
    "name": "An-Nur",
    "arabic": "النور",
    "transliteration": "Noor",
    "verses": 64,
    "type": "Medinan",
    "theme": "Moral Purity, Light of Faith & Family Ethics",
    "fileName": "Surah-Noor-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Noor-in-Arabic.pdf"
  },
  {
    "id": 25,
    "name": "Al-Furqan",
    "arabic": "الفرقان",
    "transliteration": "Furqan",
    "verses": 77,
    "type": "Meccan",
    "theme": "Criterion Between Truth & Falsehood",
    "fileName": "Surah-Furqan-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Furqan-in-Arabic.pdf"
  },
  {
    "id": 26,
    "name": "Ash-Shu'ara",
    "arabic": "الشعراء",
    "transliteration": "Shuara",
    "verses": 227,
    "type": "Meccan",
    "theme": "Signs of Truth & Prophetic Guidance",
    "fileName": "Surah-Shuara-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Shuara-in-Arabic.pdf"
  },
  {
    "id": 27,
    "name": "An-Naml",
    "arabic": "النمل",
    "transliteration": "Naml",
    "verses": 93,
    "type": "Meccan",
    "theme": "Wisdom, Knowledge & Gratitude for Favors",
    "fileName": "Surah-Naml-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Naml-in-Arabic.pdf"
  },
  {
    "id": 28,
    "name": "Al-Qasas",
    "arabic": "القصص",
    "transliteration": "Qasas",
    "verses": 88,
    "type": "Meccan",
    "theme": "Triumph of Humility Over Oppression",
    "fileName": "Surah-Qasas-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Qasas-in-Arabic.pdf"
  },
  {
    "id": 29,
    "name": "Al-'Ankabut",
    "arabic": "العنكبوت",
    "transliteration": "Ankabut",
    "verses": 69,
    "type": "Meccan",
    "theme": "Testing of Faith & Spiritual Resilience",
    "fileName": "Surah-Ankabut-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Ankabut-in-Arabic.pdf"
  },
  {
    "id": 30,
    "name": "Ar-Rum",
    "arabic": "الروم",
    "transliteration": "Rum",
    "verses": 60,
    "type": "Meccan",
    "theme": "Divine Promise, History & Signs in Cosmos",
    "fileName": "Surah-Rum-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Rum-in-Arabic.pdf"
  },
  {
    "id": 31,
    "name": "Luqman",
    "arabic": "لقمان",
    "transliteration": "Luqman",
    "verses": 34,
    "type": "Meccan",
    "theme": "Parental Wisdom, Character & Gratitude",
    "fileName": "Surah-Luqman-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Luqman-in-Arabic.pdf"
  },
  {
    "id": 32,
    "name": "As-Sajdah",
    "arabic": "السجدة",
    "transliteration": "Sajdah",
    "verses": 30,
    "type": "Meccan",
    "theme": "Prostration in Humility & Creation",
    "fileName": "Surah-Sajdah-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Sajdah-in-Arabic.pdf"
  },
  {
    "id": 33,
    "name": "Al-Ahzab",
    "arabic": "الأحزاب",
    "transliteration": "Ahzab",
    "verses": 73,
    "type": "Medinan",
    "theme": "Trust in Allah During Trials & Family Duty",
    "fileName": "Surah-Ahzab-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Ahzab-in-Arabic.pdf"
  },
  {
    "id": 34,
    "name": "Saba",
    "arabic": "سبإ",
    "transliteration": "Saba",
    "verses": 54,
    "type": "Meccan",
    "theme": "All-Knowing God & Consequences of Pride",
    "fileName": "Surah-Saba-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Saba-in-Arabic.pdf"
  },
  {
    "id": 35,
    "name": "Fatir",
    "arabic": "فاطر",
    "transliteration": "Fatir",
    "verses": 45,
    "type": "Meccan",
    "theme": "Creator of Angels & Universe, Human Need",
    "fileName": "Surah-Fatir-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Fatir-in-Arabic.pdf"
  },
  {
    "id": 36,
    "name": "Ya-Sin",
    "arabic": "يس",
    "transliteration": "Yaseen",
    "verses": 83,
    "type": "Meccan",
    "theme": "Heart of Quran, Resurrection & Prophecy",
    "fileName": "Surah-Yaseen-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Yaseen-in-Arabic.pdf"
  },
  {
    "id": 37,
    "name": "As-Saffat",
    "arabic": "الصافات",
    "transliteration": "Saffat",
    "verses": 182,
    "type": "Meccan",
    "theme": "Ranks of Angels & Uncompromising Faith",
    "fileName": "Surah-Saffat-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Saffat-in-Arabic.pdf"
  },
  {
    "id": 38,
    "name": "Sad",
    "arabic": "ص",
    "transliteration": "Sad",
    "verses": 88,
    "type": "Meccan",
    "theme": "Sincerity in Worship & Prophetic Patience",
    "fileName": "Surah-Sad-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Sad-in-Arabic.pdf"
  },
  {
    "id": 39,
    "name": "Az-Zumar",
    "arabic": "الزمر",
    "transliteration": "Zumar",
    "verses": 75,
    "type": "Meccan",
    "theme": "Pure Monotheism & Divine Mercy",
    "fileName": "Surah-Zumar-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Zumar-in-Arabic.pdf"
  },
  {
    "id": 40,
    "name": "Ghafir",
    "arabic": "غافر",
    "transliteration": "Ghafir",
    "verses": 85,
    "type": "Meccan",
    "theme": "Forgiver of Sin & Acceptance of Prayer",
    "fileName": "Surah-Ghafir-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Ghafir-in-Arabic.pdf"
  },
  {
    "id": 41,
    "name": "Fussilat",
    "arabic": "فصلت",
    "transliteration": "Fussilat",
    "verses": 54,
    "type": "Meccan",
    "theme": "Clear Explanation of Divine Guidance",
    "fileName": "Surah-Fussilat-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Fussilat-in-Arabic.pdf"
  },
  {
    "id": 42,
    "name": "Ash-Shura",
    "arabic": "الشورى",
    "transliteration": "Shura",
    "verses": 53,
    "type": "Meccan",
    "theme": "Consultation, Unity & Divine Order",
    "fileName": "Surah-Shura-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Shura-in-Arabic.pdf"
  },
  {
    "id": 43,
    "name": "Az-Zukhruf",
    "arabic": "الزخرف",
    "transliteration": "Zukhruf",
    "verses": 89,
    "type": "Meccan",
    "theme": "True Wealth vs Material Ornaments",
    "fileName": "Surah-Zukhruf-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Zukhruf-in-Arabic.pdf"
  },
  {
    "id": 44,
    "name": "Ad-Dukhan",
    "arabic": "الدخان",
    "transliteration": "Dukhan",
    "verses": 59,
    "type": "Meccan",
    "theme": "Night of Decree & Warning to Careless",
    "fileName": "Surah-Dukhan-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Dukhan-in-Arabic.pdf"
  },
  {
    "id": 45,
    "name": "Al-Jathiyah",
    "arabic": "الجاثية",
    "transliteration": "Jathiya",
    "verses": 37,
    "type": "Meccan",
    "theme": "Kneeling Before Divine Majesty & Justice",
    "fileName": "Surah-Jathiya-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Jathiya-in-Arabic.pdf"
  },
  {
    "id": 46,
    "name": "Al-Ahqaf",
    "arabic": "الأحقاف",
    "transliteration": "Al-Ahqaf",
    "verses": 35,
    "type": "Meccan",
    "theme": "Duty to Parents & Truth of Revelation",
    "fileName": "Surah-Al-Ahqaf-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Al-Ahqaf-in-Arabic.pdf"
  },
  {
    "id": 47,
    "name": "Muhammad",
    "arabic": "محمد",
    "transliteration": "Muhammad",
    "verses": 38,
    "type": "Medinan",
    "theme": "Striving for Truth & Good Deeds",
    "fileName": "Surah-Muhammad-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Muhammad-in-Arabic.pdf"
  },
  {
    "id": 48,
    "name": "Al-Fath",
    "arabic": "الفتح",
    "transliteration": "Fath",
    "verses": 29,
    "type": "Medinan",
    "theme": "Manifest Victory, Peace & Loyalty",
    "fileName": "Surah-Fath-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Fath-in-Arabic.pdf"
  },
  {
    "id": 49,
    "name": "Al-Hujurat",
    "arabic": "الحجرات",
    "transliteration": "Hujurat",
    "verses": 18,
    "type": "Medinan",
    "theme": "Social Manners, Brotherhood & Character",
    "fileName": "Surah-Hujurat-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Hujurat-in-Arabic.pdf"
  },
  {
    "id": 50,
    "name": "Qaf",
    "arabic": "ق",
    "transliteration": "Qaf",
    "verses": 45,
    "type": "Meccan",
    "theme": "Resurrection, Creation & Vigilant Angels",
    "fileName": "Surah-Qaf-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Qaf-in-Arabic.pdf"
  },
  {
    "id": 51,
    "name": "Adh-Dhariyat",
    "arabic": "الذاريات",
    "transliteration": "Dhariyat",
    "verses": 60,
    "type": "Meccan",
    "theme": "Purpose of Human Creation & Provision",
    "fileName": "Surah-Dhariyat-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Dhariyat-in-Arabic.pdf"
  },
  {
    "id": 52,
    "name": "At-Tur",
    "arabic": "الطور",
    "transliteration": "Tur",
    "verses": 49,
    "type": "Meccan",
    "theme": "Sacred Mount, Oaths & Reality of Judgment",
    "fileName": "Surah-Tur-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Tur-in-Arabic.pdf"
  },
  {
    "id": 53,
    "name": "An-Najm",
    "arabic": "النجم",
    "transliteration": "Najm",
    "verses": 62,
    "type": "Meccan",
    "theme": "Celestial Miracles & Pure Divine Inspiration",
    "fileName": "Surah-Najm-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Najm-in-Arabic.pdf"
  },
  {
    "id": 54,
    "name": "Al-Qamar",
    "arabic": "القمر",
    "transliteration": "Qamar",
    "verses": 55,
    "type": "Meccan",
    "theme": "Signs of Power & Ease of Quranic Remembrance",
    "fileName": "Surah-Qamar-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Qamar-in-Arabic.pdf"
  },
  {
    "id": 55,
    "name": "Ar-Rahman",
    "arabic": "الرحمن",
    "transliteration": "Rahman",
    "verses": 78,
    "type": "Medinan",
    "theme": "Infinite Mercies & Divine Bounty",
    "fileName": "Surah-Rahman-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Rahman-in-Arabic.pdf"
  },
  {
    "id": 56,
    "name": "Al-Waqi'ah",
    "arabic": "الواقعة",
    "transliteration": "Waqiah",
    "verses": 96,
    "type": "Meccan",
    "theme": "Inevitable Event & Ranks of Believers",
    "fileName": "Surah-Waqiah-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Waqiah-in-Arabic.pdf"
  },
  {
    "id": 57,
    "name": "Al-Hadid",
    "arabic": "الحديد",
    "transliteration": "Hadid",
    "verses": 29,
    "type": "Medinan",
    "theme": "Light of Faith, Charity & Divine Strength",
    "fileName": "Surah-Hadid-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Hadid-in-Arabic.pdf"
  },
  {
    "id": 58,
    "name": "Al-Mujadila",
    "arabic": "المجادلة",
    "transliteration": "Mujadila",
    "verses": 22,
    "type": "Medinan",
    "theme": "Allah Hears Supplication & Family Justice",
    "fileName": "Surah-Mujadila-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Mujadila-in-Arabic.pdf"
  },
  {
    "id": 59,
    "name": "Al-Hashr",
    "arabic": "الحشر",
    "transliteration": "Hashr",
    "verses": 24,
    "type": "Medinan",
    "theme": "Beautiful Names of Allah & Community Unity",
    "fileName": "Surah-Hashr-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Hashr-in-Arabic.pdf"
  },
  {
    "id": 60,
    "name": "Al-Mumtahanah",
    "arabic": "الممتحنة",
    "transliteration": "Mumtahanah",
    "verses": 13,
    "type": "Medinan",
    "theme": "Examining Faith, Loyalty & Fairness",
    "fileName": "Surah-Mumtahanah-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Mumtahanah-in-Arabic.pdf"
  },
  {
    "id": 61,
    "name": "As-Saff",
    "arabic": "الصف",
    "transliteration": "Saff",
    "verses": 14,
    "type": "Medinan",
    "theme": "Solid Ranks & Harmony of Speech and Action",
    "fileName": "Surah-Saff-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Saff-in-Arabic.pdf"
  },
  {
    "id": 62,
    "name": "Al-Jumu'ah",
    "arabic": "الجمعة",
    "transliteration": "Jumuah",
    "verses": 11,
    "type": "Medinan",
    "theme": "Friday Congregation, Remembrance & Commerce",
    "fileName": "Surah-Jumuah-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Jumuah-in-Arabic.pdf"
  },
  {
    "id": 63,
    "name": "Al-Munafiqun",
    "arabic": "المنافقون",
    "transliteration": "Munafiqun",
    "verses": 11,
    "type": "Medinan",
    "theme": "Sincerity vs Hypocrisy & Generosity",
    "fileName": "Surah-Munafiqun-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Munafiqun-in-Arabic.pdf"
  },
  {
    "id": 64,
    "name": "At-Taghabun",
    "arabic": "التغابن",
    "transliteration": "Taghabun",
    "verses": 18,
    "type": "Medinan",
    "theme": "Mutual Loss & Gain, Trusting Destiny",
    "fileName": "Surah-Taghabun-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Taghabun-in-Arabic.pdf"
  },
  {
    "id": 65,
    "name": "At-Talaq",
    "arabic": "الطلاق",
    "transliteration": "Talaq",
    "verses": 12,
    "type": "Medinan",
    "theme": "Compassionate Family Laws & Taqwa",
    "fileName": "Surah-Talaq-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Talaq-in-Arabic.pdf"
  },
  {
    "id": 66,
    "name": "At-Tahrim",
    "arabic": "التحريم",
    "transliteration": "Tahrim",
    "verses": 12,
    "type": "Medinan",
    "theme": "Protecting Household & Repentance",
    "fileName": "Surah-Tahrim-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Tahrim-in-Arabic.pdf"
  },
  {
    "id": 67,
    "name": "Al-Mulk",
    "arabic": "الملك",
    "transliteration": "Mulk",
    "verses": 30,
    "type": "Meccan",
    "theme": "Sovereignty of Cosmos & Life as a Test",
    "fileName": "Surah-Mulk-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Mulk-in-Arabic.pdf"
  },
  {
    "id": 68,
    "name": "Al-Qalam",
    "arabic": "القلم",
    "transliteration": "Qalam",
    "verses": 52,
    "type": "Meccan",
    "theme": "Pen of Knowledge & Noble Prophetic Character",
    "fileName": "Surah-Qalam-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Qalam-in-Arabic.pdf"
  },
  {
    "id": 69,
    "name": "Al-Haqqah",
    "arabic": "الحاقة",
    "transliteration": "Haqqah",
    "verses": 52,
    "type": "Meccan",
    "theme": "Inescapable Truth & Reality of Record",
    "fileName": "Surah-Haqqah-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Haqqah-in-Arabic.pdf"
  },
  {
    "id": 70,
    "name": "Al-Ma'arij",
    "arabic": "المعارج",
    "transliteration": "Maarij",
    "verses": 44,
    "type": "Meccan",
    "theme": "Ascending Stairways & Virtues of Believers",
    "fileName": "Surah-Maarij-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Maarij-in-Arabic.pdf"
  },
  {
    "id": 71,
    "name": "Nuh",
    "arabic": "نوح",
    "transliteration": "Nooh",
    "verses": 28,
    "type": "Meccan",
    "theme": "Persistent Da'wah & Power of Seeking Forgiveness",
    "fileName": "Surah-Nooh-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Nooh-in-Arabic.pdf"
  },
  {
    "id": 72,
    "name": "Al-Jinn",
    "arabic": "الجن",
    "transliteration": "Jinn",
    "verses": 28,
    "type": "Meccan",
    "theme": "Unseen Realm Listening to Sacred Quran",
    "fileName": "Surah-Jinn-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Jinn-in-Arabic.pdf"
  },
  {
    "id": 73,
    "name": "Al-Muzzammil",
    "arabic": "المزمل",
    "transliteration": "Muzammil",
    "verses": 20,
    "type": "Meccan",
    "theme": "Night Prayer, Devotion & Reciting Quran",
    "fileName": "Surah-Muzammil-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Muzammil-in-Arabic.pdf"
  },
  {
    "id": 74,
    "name": "Al-Muddaththir",
    "arabic": "المدثر",
    "transliteration": "Mudassir",
    "verses": 56,
    "type": "Meccan",
    "theme": "Arising to Warn, Purity & Duty",
    "fileName": "Surah-Mudassir-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Mudassir-in-Arabic.pdf"
  },
  {
    "id": 75,
    "name": "Al-Qiyamah",
    "arabic": "القيامة",
    "transliteration": "Qiyamah",
    "verses": 40,
    "type": "Meccan",
    "theme": "Day of Resurrection & Loving Sacred Quran",
    "fileName": "Surah-Qiyamah-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Qiyamah-in-Arabic.pdf"
  },
  {
    "id": 76,
    "name": "Al-Insan",
    "arabic": "الإنسان",
    "transliteration": "Insan",
    "verses": 31,
    "type": "Medinan",
    "theme": "Creation of Man, Gratitude & Pure Charity",
    "fileName": "Surah-Insan-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Insan-in-Arabic.pdf"
  },
  {
    "id": 77,
    "name": "Al-Mursalat",
    "arabic": "المرسلات",
    "transliteration": "Mursalat",
    "verses": 50,
    "type": "Meccan",
    "theme": "Winds Sent Forth & Confirmation of Truth",
    "fileName": "Surah-Mursalat-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Mursalat-in-Arabic.pdf"
  },
  {
    "id": 78,
    "name": "An-Naba",
    "arabic": "النبإ",
    "transliteration": "Naba",
    "verses": 40,
    "type": "Meccan",
    "theme": "Great News of Eternal Destiny",
    "fileName": "Surah-Naba-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Naba-in-Arabic.pdf"
  },
  {
    "id": 79,
    "name": "An-Nazi'at",
    "arabic": "النازعات",
    "transliteration": "Naziat",
    "verses": 46,
    "type": "Meccan",
    "theme": "Angels Extracting Souls & Fear of God",
    "fileName": "Surah-Naziat-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Naziat-in-Arabic.pdf"
  },
  {
    "id": 80,
    "name": "'Abasa",
    "arabic": "عبس",
    "transliteration": "Abasa",
    "verses": 42,
    "type": "Meccan",
    "theme": "Universal Dignity & Value of Seeking Knowledge",
    "fileName": "Surah-Abasa-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Abasa-in-Arabic.pdf"
  },
  {
    "id": 81,
    "name": "At-Takwir",
    "arabic": "التكوير",
    "transliteration": "Takwir",
    "verses": 29,
    "type": "Meccan",
    "theme": "Unfolding of Universe & Noble Messenger",
    "fileName": "Surah-Takwir-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Takwir-in-Arabic.pdf"
  },
  {
    "id": 82,
    "name": "Al-Infitar",
    "arabic": "الانفطار",
    "transliteration": "Infitar",
    "verses": 19,
    "type": "Meccan",
    "theme": "Cleaving of Sky & Recording Angels",
    "fileName": "Surah-Infitar-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Infitar-in-Arabic.pdf"
  },
  {
    "id": 83,
    "name": "Al-Mutaffifin",
    "arabic": "المطففين",
    "transliteration": "Mutaffifin",
    "verses": 36,
    "type": "Meccan",
    "theme": "Honesty in Trade & Scales of Justice",
    "fileName": "Surah-Mutaffifin-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Mutaffifin-in-Arabic.pdf"
  },
  {
    "id": 84,
    "name": "Al-Inshiqaq",
    "arabic": "الانشقاق",
    "transliteration": "Inshiqaq",
    "verses": 25,
    "type": "Meccan",
    "theme": "Splitting Heaven & Returning to Lord",
    "fileName": "Surah-Inshiqaq-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Inshiqaq-in-Arabic.pdf"
  },
  {
    "id": 85,
    "name": "Al-Buruj",
    "arabic": "البروج",
    "transliteration": "Buruj",
    "verses": 22,
    "type": "Meccan",
    "theme": "Constellations, Steadfast Faith & Divine Protection",
    "fileName": "Surah-Buruj-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Buruj-in-Arabic.pdf"
  },
  {
    "id": 86,
    "name": "At-Tariq",
    "arabic": "الطارق",
    "transliteration": "Tariq",
    "verses": 17,
    "type": "Meccan",
    "theme": "Morning Star & Divine Guard Over Soul",
    "fileName": "Surah-Tariq-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Tariq-in-Arabic.pdf"
  },
  {
    "id": 87,
    "name": "Al-A'la",
    "arabic": "الأعلى",
    "transliteration": "Ala",
    "verses": 19,
    "type": "Meccan",
    "theme": "Glorifying the Most High & Eternal Success",
    "fileName": "Surah-Ala-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Ala-in-Arabic.pdf"
  },
  {
    "id": 88,
    "name": "Al-Ghashiyah",
    "arabic": "الغاشية",
    "transliteration": "Ghashiya",
    "verses": 26,
    "type": "Meccan",
    "theme": "Overwhelming Event & Contemplation of Nature",
    "fileName": "Surah-Ghashiya-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Ghashiya-in-Arabic.pdf"
  },
  {
    "id": 89,
    "name": "Al-Fajr",
    "arabic": "الفجر",
    "transliteration": "Fajr",
    "verses": 30,
    "type": "Meccan",
    "theme": "Break of Day, Wealth Test & Peaceful Soul",
    "fileName": "Surah-Fajr-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Fajr-in-Arabic.pdf"
  },
  {
    "id": 90,
    "name": "Al-Balad",
    "arabic": "البلد",
    "transliteration": "Balad",
    "verses": 20,
    "type": "Meccan",
    "theme": "Sacred City & Freeing Captives / Helping Needy",
    "fileName": "Surah-Balad-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Balad-in-Arabic.pdf"
  },
  {
    "id": 91,
    "name": "Ash-Shams",
    "arabic": "الشمس",
    "transliteration": "Shams",
    "verses": 15,
    "type": "Meccan",
    "theme": "Sun, Moon & Purification of the Soul",
    "fileName": "Surah-Shams-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Shams-in-Arabic.pdf"
  },
  {
    "id": 92,
    "name": "Al-Lail",
    "arabic": "الليل",
    "transliteration": "Lail",
    "verses": 21,
    "type": "Meccan",
    "theme": "Night Veil, Generosity & Seeking Allah's Face",
    "fileName": "Surah-Lail-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Lail-in-Arabic.pdf"
  },
  {
    "id": 93,
    "name": "Ad-Duha",
    "arabic": "الضحى",
    "transliteration": "Duha",
    "verses": 11,
    "type": "Meccan",
    "theme": "Morning Light, Hope & Care for Orphans",
    "fileName": "Surah-Duha-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Duha-in-Arabic.pdf"
  },
  {
    "id": 94,
    "name": "Ash-Sharh",
    "arabic": "الشرح",
    "transliteration": "Sharh",
    "verses": 8,
    "type": "Meccan",
    "theme": "Expansion of Chest & Ease With Hardship",
    "fileName": "Surah-Sharh-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Sharh-in-Arabic.pdf"
  },
  {
    "id": 95,
    "name": "At-Tin",
    "arabic": "التين",
    "transliteration": "Tin",
    "verses": 8,
    "type": "Meccan",
    "theme": "Fig & Olive, Noble Mold of Human Creation",
    "fileName": "Surah-Tin-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Tin-in-Arabic.pdf"
  },
  {
    "id": 96,
    "name": "Al-'Alaq",
    "arabic": "العلق",
    "transliteration": "Alaq",
    "verses": 19,
    "type": "Meccan",
    "theme": "First Revelation: Read in Name of Your Lord",
    "fileName": "Surah-Alaq-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Alaq-in-Arabic.pdf"
  },
  {
    "id": 97,
    "name": "Al-Qadr",
    "arabic": "القدر",
    "transliteration": "Qadr",
    "verses": 5,
    "type": "Meccan",
    "theme": "Night of Power & Peace Until Dawn",
    "fileName": "Surah-Qadr-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Qadr-in-Arabic.pdf"
  },
  {
    "id": 98,
    "name": "Al-Bayyinah",
    "arabic": "البينة",
    "transliteration": "Bayyinah",
    "verses": 8,
    "type": "Medinan",
    "theme": "Clear Proof & Pure Sincerity in Religion",
    "fileName": "Surah-Bayyinah-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Bayyinah-in-Arabic.pdf"
  },
  {
    "id": 99,
    "name": "Az-Zalzalah",
    "arabic": "الزلزلة",
    "transliteration": "Zalzalah",
    "verses": 8,
    "type": "Medinan",
    "theme": "Earthquake & Atom's Weight of Good/Evil",
    "fileName": "Surah-Zalzalah-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Zalzalah-in-Arabic.pdf"
  },
  {
    "id": 100,
    "name": "Al-'Adiyat",
    "arabic": "العاديات",
    "transliteration": "Adiyat",
    "verses": 11,
    "type": "Meccan",
    "theme": "Courser Horses & Ungratefulness vs Judgment",
    "fileName": "Surah-Adiyat-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Adiyat-in-Arabic.pdf"
  },
  {
    "id": 101,
    "name": "Al-Qari'ah",
    "arabic": "القارعة",
    "transliteration": "Qariah",
    "verses": 11,
    "type": "Meccan",
    "theme": "Striking Hour & Heavy Scales of Good",
    "fileName": "Surah-Qariah-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Qariah-in-Arabic.pdf"
  },
  {
    "id": 102,
    "name": "At-Takathur",
    "arabic": "التكاثر",
    "transliteration": "Takathur",
    "verses": 8,
    "type": "Meccan",
    "theme": "Rivalry for Material Increase vs True Wisdom",
    "fileName": "Surah-Takathur-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Takathur-in-Arabic.pdf"
  },
  {
    "id": 103,
    "name": "Al-'Asr",
    "arabic": "العصر",
    "transliteration": "Asr",
    "verses": 3,
    "type": "Meccan",
    "theme": "Time, Faith, Righteousness & Patience",
    "fileName": "Surah-Asr-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Asr-in-Arabic.pdf"
  },
  {
    "id": 104,
    "name": "Al-Humazah",
    "arabic": "الهمزة",
    "transliteration": "Humazah",
    "verses": 9,
    "type": "Meccan",
    "theme": "Slanderer, Hoarding Wealth & Consequence",
    "fileName": "Surah-Humazah-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Humazah-in-Arabic.pdf"
  },
  {
    "id": 105,
    "name": "Al-Fil",
    "arabic": "الفيل",
    "transliteration": "Fil",
    "verses": 5,
    "type": "Meccan",
    "theme": "Army of Elephant & Divine Protection of Ka'bah",
    "fileName": "Surah-Fil-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Fil-in-Arabic.pdf"
  },
  {
    "id": 106,
    "name": "Quraysh",
    "arabic": "قريش",
    "transliteration": "Quraish",
    "verses": 4,
    "type": "Meccan",
    "theme": "Custodians of Sacred House & Gratitude",
    "fileName": "Surah-Quraish-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Quraish-in-Arabic.pdf"
  },
  {
    "id": 107,
    "name": "Al-Ma'un",
    "arabic": "الماعون",
    "transliteration": "Maun",
    "verses": 7,
    "type": "Meccan",
    "theme": "Neighborly Assistance, Charity & Sincere Prayer",
    "fileName": "Surah-Maun-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Maun-in-Arabic.pdf"
  },
  {
    "id": 108,
    "name": "Al-Kawthar",
    "arabic": "الكوثر",
    "transliteration": "Kauthar",
    "verses": 3,
    "type": "Meccan",
    "theme": "Abundance of Divine Favor & Sacrifice",
    "fileName": "Surah-Kauthar-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Kauthar-in-Arabic.pdf"
  },
  {
    "id": 109,
    "name": "Al-Kafirun",
    "arabic": "الكافرون",
    "transliteration": "Kafirun",
    "verses": 6,
    "type": "Meccan",
    "theme": "Purity of Faith & Uncompromising Monotheism",
    "fileName": "Surah-Kafirun-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Kafirun-in-Arabic.pdf"
  },
  {
    "id": 110,
    "name": "An-Nasr",
    "arabic": "النصر",
    "transliteration": "Nasr",
    "verses": 3,
    "type": "Medinan",
    "theme": "Divine Help, Victory & Glorifying Allah",
    "fileName": "Surah-Nasr-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Nasr-in-Arabic.pdf"
  },
  {
    "id": 111,
    "name": "Al-Masad",
    "arabic": "المسد",
    "transliteration": "Masad",
    "verses": 5,
    "type": "Meccan",
    "theme": "Destruction of Opposers of Truth",
    "fileName": "Surah-Masad-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Masad-in-Arabic.pdf"
  },
  {
    "id": 112,
    "name": "Al-Ikhlas",
    "arabic": "الإخلاص",
    "transliteration": "Ikhlas",
    "verses": 4,
    "type": "Meccan",
    "theme": "Purity of Tawhid: Allah the One & Eternal",
    "fileName": "Surah-Ikhlas-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Ikhlas-in-Arabic.pdf"
  },
  {
    "id": 113,
    "name": "Al-Falaq",
    "arabic": "الفلق",
    "transliteration": "Falaq",
    "verses": 5,
    "type": "Meccan",
    "theme": "Seeking Refuge from Outer Harms & Envy",
    "fileName": "Surah-Falaq-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Falaq-in-Arabic.pdf"
  },
  {
    "id": 114,
    "name": "An-Nas",
    "arabic": "الناس",
    "transliteration": "Nas",
    "verses": 6,
    "type": "Meccan",
    "theme": "Seeking Refuge in Lord of Mankind from Whispers",
    "fileName": "Surah-Nas-in-Arabic.pdf",
    "filePath": "/resources/quranBySurah/Surah-Nas-in-Arabic.pdf"
  }
];

export const JUZ_LIST: JuzItem[] = [
  {
    "id": 1,
    "name": "Juz 1",
    "arabic": "الجزء الأول",
    "startSurah": "Al-Fatihah 1:1 - Al-Baqarah 2:141",
    "versesSpan": "Verses 1-148",
    "theme": "Creation, Guidance & Covenants",
    "fileName": "Chapter01.pdf",
    "filePath": "/resources/quranByJuz/Chapter01.pdf"
  },
  {
    "id": 2,
    "name": "Juz 2",
    "arabic": "الجزء الثاني",
    "startSurah": "Al-Baqarah 2:142 - 2:252",
    "versesSpan": "Verses 142-252",
    "theme": "Qiblah Change, Fasting & Laws",
    "fileName": "Chapter02.pdf",
    "filePath": "/resources/quranByJuz/Chapter02.pdf"
  },
  {
    "id": 3,
    "name": "Juz 3",
    "arabic": "الجزء الثالث",
    "startSurah": "Al-Baqarah 2:253 - Ali 'Imran 3:92",
    "versesSpan": "Ayat al-Kursi & Generosity",
    "theme": "Ayat al-Kursi, Charity & Firm Faith",
    "fileName": "Chapter03.pdf",
    "filePath": "/resources/quranByJuz/Chapter03.pdf"
  },
  {
    "id": 4,
    "name": "Juz 4",
    "arabic": "الجزء الرابع",
    "startSurah": "Ali 'Imran 3:93 - An-Nisa 4:23",
    "versesSpan": "Family & Social Unity",
    "theme": "Family Order & Social Justice",
    "fileName": "Chapter04.pdf",
    "filePath": "/resources/quranByJuz/Chapter04.pdf"
  },
  {
    "id": 5,
    "name": "Juz 5",
    "arabic": "الجزء الخامس",
    "startSurah": "An-Nisa 4:24 - 4:147",
    "versesSpan": "Rights & Protection",
    "theme": "Rights of Weak & Hypocrisy Warning",
    "fileName": "Chapter05.pdf",
    "filePath": "/resources/quranByJuz/Chapter05.pdf"
  },
  {
    "id": 6,
    "name": "Juz 6",
    "arabic": "الجزء السادس",
    "startSurah": "An-Nisa 4:148 - Al-Ma'idah 5:81",
    "versesSpan": "Covenants & Halal Living",
    "theme": "Justice & Prophetic Teachings",
    "fileName": "Chapter06.pdf",
    "filePath": "/resources/quranByJuz/Chapter06.pdf"
  },
  {
    "id": 7,
    "name": "Juz 7",
    "arabic": "الجزء السابع",
    "startSurah": "Al-Ma'idah 5:82 - Al-An'am 6:110",
    "versesSpan": "Tawhid & Divine Signs",
    "theme": "Monotheism & Cosmic Evidence",
    "fileName": "Chapter07.pdf",
    "filePath": "/resources/quranByJuz/Chapter07.pdf"
  },
  {
    "id": 8,
    "name": "Juz 8",
    "arabic": "الجزء الثامن",
    "startSurah": "Al-An'am 6:111 - Al-A'raf 7:87",
    "versesSpan": "Prophetic History & Warnings",
    "theme": "History of Nations & Accountability",
    "fileName": "Chapter08.pdf",
    "filePath": "/resources/quranByJuz/Chapter08.pdf"
  },
  {
    "id": 9,
    "name": "Juz 9",
    "arabic": "الجزء التاسع",
    "startSurah": "Al-A'raf 7:88 - Al-Anfal 8:40",
    "versesSpan": "Resilience & Trust in Allah",
    "theme": "Patience of Believers & Divine Help",
    "fileName": "Chapter09.pdf",
    "filePath": "/resources/quranByJuz/Chapter09.pdf"
  },
  {
    "id": 10,
    "name": "Juz 10",
    "arabic": "الجزء العاشر",
    "startSurah": "Al-Anfal 8:41 - At-Tawbah 9:92",
    "versesSpan": "Sincerity & Pure Devotion",
    "theme": "Sincerity & Protection of Community",
    "fileName": "Chapter10.pdf",
    "filePath": "/resources/quranByJuz/Chapter10.pdf"
  },
  {
    "id": 11,
    "name": "Juz 11",
    "arabic": "الجزء الحادي عشر",
    "startSurah": "At-Tawbah 9:93 - Hud 11:5",
    "versesSpan": "Repentance & Divine Mercy",
    "theme": "Acceptance of Repentance & Truth",
    "fileName": "Chapter11.pdf",
    "filePath": "/resources/quranByJuz/Chapter11.pdf"
  },
  {
    "id": 12,
    "name": "Juz 12",
    "arabic": "الجزء الثاني عشر",
    "startSurah": "Hud 11:6 - Yusuf 12:52",
    "versesSpan": "Story of Prophet Yusuf",
    "theme": "Patience, Chastity & Moral Triumph",
    "fileName": "Chapter12.pdf",
    "filePath": "/resources/quranByJuz/Chapter12.pdf"
  },
  {
    "id": 13,
    "name": "Juz 13",
    "arabic": "الجزء الثالث عشر",
    "startSurah": "Yusuf 12:53 - Ibrahim 14:52",
    "versesSpan": "Gratitude & Truth of Signs",
    "theme": "Peace of Heart in Remembrance",
    "fileName": "Chapter13.pdf",
    "filePath": "/resources/quranByJuz/Chapter13.pdf"
  },
  {
    "id": 14,
    "name": "Juz 14",
    "arabic": "الجزء الرابع عشر",
    "startSurah": "Al-Hijr 15:1 - An-Nahl 16:128",
    "versesSpan": "Blessings of Creation",
    "theme": "Cosmic Favors & Natural Order",
    "fileName": "Chapter14.pdf",
    "filePath": "/resources/quranByJuz/Chapter14.pdf"
  },
  {
    "id": 15,
    "name": "Juz 15",
    "arabic": "الجزء الخامس عشر",
    "startSurah": "Al-Isra 17:1 - Al-Kahf 18:74",
    "versesSpan": "Night Journey & Wisdom",
    "theme": "Spiritual Elevation & Youth of Cave",
    "fileName": "Chapter15.pdf",
    "filePath": "/resources/quranByJuz/Chapter15.pdf"
  },
  {
    "id": 16,
    "name": "Juz 16",
    "arabic": "الجزء السادس عشر",
    "startSurah": "Al-Kahf 18:75 - Taha 20:135",
    "versesSpan": "Prophetic Miracles & Solace",
    "theme": "Call of Musa & Comfort in Prayer",
    "fileName": "Chapter16.pdf",
    "filePath": "/resources/quranByJuz/Chapter16.pdf"
  },
  {
    "id": 17,
    "name": "Juz 17",
    "arabic": "الجزء السابع عشر",
    "startSurah": "Al-Anbiya 21:1 - Al-Hajj 22:78",
    "versesSpan": "Pilgrimage & Unity of Faith",
    "theme": "Sacred Rites & Prophetic Legacy",
    "fileName": "Chapter17.pdf",
    "filePath": "/resources/quranByJuz/Chapter17.pdf"
  },
  {
    "id": 18,
    "name": "Juz 18",
    "arabic": "الجزء الثامن عشر",
    "startSurah": "Al-Mu'minun 23:1 - An-Nur 24:64",
    "versesSpan": "Light of Faith & Character",
    "theme": "Purity of Heart & Family Honor",
    "fileName": "Chapter18.pdf",
    "filePath": "/resources/quranByJuz/Chapter18.pdf"
  },
  {
    "id": 19,
    "name": "Juz 19",
    "arabic": "الجزء التاسع عشر",
    "startSurah": "Al-Furqan 25:21 - An-Naml 27:55",
    "versesSpan": "Criterion & Wisdom of Sulaiman",
    "theme": "Distinction of Right & Knowledge",
    "fileName": "Chapter19.pdf",
    "filePath": "/resources/quranByJuz/Chapter19.pdf"
  },
  {
    "id": 20,
    "name": "Juz 20",
    "arabic": "الجزء العشرون",
    "startSurah": "An-Naml 27:56 - Al-Ankabut 29:45",
    "versesSpan": "Humility Over Arrogance",
    "theme": "Triumph of Faith Over Tyranny",
    "fileName": "Chapter20.pdf",
    "filePath": "/resources/quranByJuz/Chapter20.pdf"
  },
  {
    "id": 21,
    "name": "Juz 21",
    "arabic": "الجزء الحادي والعشرون",
    "startSurah": "Al-Ankabut 29:46 - Al-Ahzab 33:30",
    "versesSpan": "Parental Wisdom & Harmony",
    "theme": "Family Character & Steadfastness",
    "fileName": "Chapter21.pdf",
    "filePath": "/resources/quranByJuz/Chapter21.pdf"
  },
  {
    "id": 22,
    "name": "Juz 22",
    "arabic": "الجزء الثاني والعشرون",
    "startSurah": "Al-Ahzab 33:31 - Ya-Sin 36:27",
    "versesSpan": "Heart of Quran & Devotion",
    "theme": "Noble Character & Eternal Destiny",
    "fileName": "Chapter22.pdf",
    "filePath": "/resources/quranByJuz/Chapter22.pdf"
  },
  {
    "id": 23,
    "name": "Juz 23",
    "arabic": "الجزء الثالث والعشرون",
    "startSurah": "Ya-Sin 36:28 - Az-Zumar 39:31",
    "versesSpan": "Ranks of Angels & Pure Tawhid",
    "theme": "Single-minded Devotion to God",
    "fileName": "Chapter23.pdf",
    "filePath": "/resources/quranByJuz/Chapter23.pdf"
  },
  {
    "id": 24,
    "name": "Juz 24",
    "arabic": "الجزء الرابع والعشرون",
    "startSurah": "Az-Zumar 39:32 - Fussilat 41:46",
    "versesSpan": "Forgiveness & Clear Truth",
    "theme": "Hope in Divine Mercy & Faith",
    "fileName": "Chapter24.pdf",
    "filePath": "/resources/quranByJuz/Chapter24.pdf"
  },
  {
    "id": 25,
    "name": "Juz 25",
    "arabic": "الجزء الخامس والعشرون",
    "startSurah": "Fussilat 41:47 - Ad-Dukhan 44:59",
    "versesSpan": "Consultation & True Wealth",
    "theme": "Unity, Justice & Cosmic Power",
    "fileName": "Chapter25.pdf",
    "filePath": "/resources/quranByJuz/Chapter25.pdf"
  },
  {
    "id": 26,
    "name": "Juz 26",
    "arabic": "الجزء السادس والعشرون",
    "startSurah": "Al-Ahqaf 46:1 - Qaf 50:45",
    "versesSpan": "Victory, Brotherhood & Manners",
    "theme": "Community Harmony & Creation",
    "fileName": "Chapter26.pdf",
    "filePath": "/resources/quranByJuz/Chapter26.pdf"
  },
  {
    "id": 27,
    "name": "Juz 27",
    "arabic": "الجزء السابع والعشرون",
    "startSurah": "Adh-Dhariyat 51:1 - Al-Hadid 57:29",
    "versesSpan": "Infinite Mercies & Divine Light",
    "theme": "Ar-Rahman, Waqi'ah & Iron Strength",
    "fileName": "Chapter27.pdf",
    "filePath": "/resources/quranByJuz/Chapter27.pdf"
  },
  {
    "id": 28,
    "name": "Juz 28",
    "arabic": "الجزء الثامن والعشرون",
    "startSurah": "Al-Mujadila 58:1 - At-Tahrim 66:12",
    "versesSpan": "Social Integrity & Household",
    "theme": "Family Harmony & Sincere Repentance",
    "fileName": "Chapter28.pdf",
    "filePath": "/resources/quranByJuz/Chapter28.pdf"
  },
  {
    "id": 29,
    "name": "Juz 29",
    "arabic": "الجزء التاسع والعشرون",
    "startSurah": "Al-Mulk 67:1 - Al-Mursalat 77:50",
    "versesSpan": "Sovereignty & Pen of Knowledge",
    "theme": "Cosmic Sovereignty & Divine Pen",
    "fileName": "Chapter29.pdf",
    "filePath": "/resources/quranByJuz/Chapter29.pdf"
  },
  {
    "id": 30,
    "name": "Juz 30 (Juz Amma)",
    "arabic": "الجزء الثلاثون",
    "startSurah": "An-Naba 78:1 - An-Nas 114:6",
    "versesSpan": "Short Surahs & Daily Practice",
    "theme": "Essential Daily Recitation & Refuge",
    "fileName": "Chapter30.pdf",
    "filePath": "/resources/quranByJuz/Chapter30.pdf"
  }
];

export const DOWNLOADABLE_RESOURCES: DownloadableResource[] = [
  {
    "id": "daily-duas",
    "title": "Essential Daily Masnoon Duas Guide",
    "category": "Duas & Supplications",
    "description": "Authentic daily supplications from Sunnah for morning, evening, sleep, meals, and home protection with Arabic, transliteration, and translation.",
    "fullDescription": "This comprehensive educational booklet provides authentic supplications (Masnoon Duas) derived from Sahih Hadith for every aspect of daily Muslim life. Designed for children, students, and families, each Dua includes clear Arabic Tashkeel, English transliteration for pronunciation, and English translation to build deep spiritual connection.",
    "outlines": [
      "Morning & Evening Adhkar (Protection & Remembrance)",
      "Duas for Entering & Leaving Home, Masjid, and Washroom",
      "Duas for Meals, Waking Up, Sleeping, and Dressing",
      "Supplications for Times of Difficulty, Illness & Travel",
      "Pronunciation & Memorization Tips for Beginners"
    ],
    "thumbnail": "/images/dua.jpg",
    "fileSize": "2.4 MB",
    "pages": 18,
    "format": "PDF",
    "downloadPath": "/images/dua.jpg",
    "badge": "Popular"
  }
];

export interface DuaItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  imagePath: string;
  keyBenefits?: string[];
}

export const DUAS: DuaItem[] = [
  {
    "id": 1,
    "title": "Dua When Starting Any Good Task",
    "slug": "dua-when-starting-any-good-task",
    "category": "Daily Supplication",
    "description": "Reciting Bismillah when commencing any good action or task to seek Allah's blessing, help, and success.",
    "imagePath": "/resources/duas resources/when starting any good task.jpg",
    "keyBenefits": [
      "Invites divine barakah into actions",
      "Sunnah habit for daily life",
      "Ensures sincerity and success"
    ]
  },
  {
    "id": 2,
    "title": "Dua When Waking Up",
    "slug": "dua-when-waking-up",
    "category": "Morning Sunnah",
    "description": "Expressing heartfelt gratitude to Allah for granting life after sleep and returning our souls safely.",
    "imagePath": "/resources/duas resources/when waking up.jpg",
    "keyBenefits": [
      "Reminds one of resurrection",
      "Starts day with gratitude",
      "Sunnah habit for kids and adults"
    ]
  },
  {
    "id": 3,
    "title": "Dua Before Entering the Bathroom",
    "slug": "dua-before-entering-the-bathroom",
    "category": "Personal Hygiene",
    "description": "Seeking Allah's refuge from male and female evil spirits prior to entering the restroom or bathroom.",
    "imagePath": "/resources/duas resources/before entering the bathroom.jpg",
    "keyBenefits": [
      "Shields private moments",
      "Maintains spiritual purity",
      "Core Sunnah for daily routine"
    ]
  },
  {
    "id": 4,
    "title": "Dua After Leaving the Bathroom",
    "slug": "dua-after-leaving-the-bathroom",
    "category": "Personal Hygiene",
    "description": "Asking Allah for forgiveness (Ghufranaka) and thanking Him for removing discomfort and granting health upon exiting.",
    "imagePath": "/resources/duas resources/after leacing the bathroom.jpg",
    "keyBenefits": [
      "Expresses gratitude for bodily health",
      "Cleanses minor spiritual shortcomings",
      "Essential daily prayer"
    ]
  },
  {
    "id": 5,
    "title": "Dua Before Performing Wudu",
    "slug": "dua-before-performing-wudu",
    "category": "Purification",
    "description": "Beginning ablution in the name of Allah to purify both body and mind for sacred worship.",
    "imagePath": "/resources/duas resources/before performing wudu.jpg",
    "keyBenefits": [
      "Prepares heart for Salah",
      "Increases spiritual reward of wudu",
      "Foundation of Islamic purification"
    ]
  },
  {
    "id": 6,
    "title": "Dua Upon Completing Wudu",
    "slug": "dua-upon-completing-wudu",
    "category": "Purification",
    "description": "Declaring monotheism and asking to be among those who repent and keep themselves pure after ablution.",
    "imagePath": "/resources/duas resources/upon completing wudu.jpg",
    "keyBenefits": [
      "Opens the eight gates of Jannah",
      "Cleanses spiritual sins",
      "High status in Sunnah"
    ]
  },
  {
    "id": 7,
    "title": "Dua When Wearing a Garment",
    "slug": "dua-when-wearing-a-garment",
    "category": "Daily Etiquette",
    "description": "Praising Allah who clothed us with garments without any power or strength on our part.",
    "imagePath": "/resources/duas resources/when wearing a garment.jpg",
    "keyBenefits": [
      "Protects against vanity",
      "Acknowledges Allah's provisions",
      "Daily Sunnah habit"
    ]
  },
  {
    "id": 8,
    "title": "Dua When Wearing a New Garment",
    "slug": "dua-when-wearing-a-new-garment",
    "category": "Daily Etiquette",
    "description": "Asking Allah for the goodness of new clothing and protection from any evil associated with it.",
    "imagePath": "/resources/duas resources/when wearing a new garment.jpg",
    "keyBenefits": [
      "Brings blessing to new possessions",
      "Expresses humble gratitude",
      "Removes arrogance"
    ]
  },
  {
    "id": 9,
    "title": "Dua When Entering the House",
    "slug": "dua-when-entering-the-house",
    "category": "Home & Family",
    "description": "Invoking Allah's name upon entering home to bring peace, protection, and divine barakah to the family.",
    "imagePath": "/resources/duas resources/dua when entering the house.jpg",
    "keyBenefits": [
      "Protects home from evil influence",
      "Promotes peace among family",
      "Attracts divine blessing"
    ]
  },
  {
    "id": 10,
    "title": "Dua When Leaving the House",
    "slug": "dua-when-leaving-the-house",
    "category": "Daily Travel",
    "description": "Placing complete trust in Allah (Bismillahi tawakkaltu 'alallah) for guidance, protection, and safety outside.",
    "imagePath": "/resources/duas resources/dua when leaving the house.jpg",
    "keyBenefits": [
      "Guards against harm on the road",
      "Provides divine guidance",
      "Shields from misguidance"
    ]
  },
  {
    "id": 11,
    "title": "Dua for Knowledge (Rabbi Zidni 'Ilma)",
    "slug": "dua-for-knowledge-rabbi-zidni-ilma",
    "category": "Student Supplication",
    "description": "Prophetic prayer asking Allah to grant beneficial knowledge, wisdom, and understanding in sacred and academic studies.",
    "imagePath": "/resources/duas resources/dua for knowledge.jpg",
    "keyBenefits": [
      "Sharpens focus and memory retention",
      "Purifies intentions for learning",
      "Essential for Quran students"
    ]
  },
  {
    "id": 12,
    "title": "Dua Before Eating",
    "slug": "dua-before-eating",
    "category": "Etiquette of Meals",
    "description": "Beginning food in the name of Allah to bless the nourishment and protect against unmindfulness.",
    "imagePath": "/resources/duas resources/dua before eating.jpg",
    "keyBenefits": [
      "Increases nourishment and barakah",
      "Prevents waste",
      "Teaches children meal etiquette"
    ]
  },
  {
    "id": 13,
    "title": "Dua For Drinking Milk",
    "slug": "dua-for-drinking-milk",
    "category": "Etiquette of Meals",
    "description": "Praising Allah for the wholesome blessing of milk and asking Him to grant abundance in it.",
    "imagePath": "/resources/duas resources/dua for drinking milk.jpg",
    "keyBenefits": [
      "Acknowledges nutritional favors",
      "Asks for increase in pure sustenance",
      "Prophetic practice"
    ]
  },
  {
    "id": 14,
    "title": "Dua Upon Completing the Meal",
    "slug": "dua-upon-completing-the-meal",
    "category": "Etiquette of Meals",
    "description": "Expressing deep gratitude to Allah who fed us, quenched our thirst, and made us Muslims.",
    "imagePath": "/resources/duas resources/upon completing the meal.jpg",
    "keyBenefits": [
      "Earns Allah's pleasure",
      "Cultivates lifelong gratitude",
      "Sunnah after food"
    ]
  },
  {
    "id": 15,
    "title": "Islamic Greeting Dua",
    "slug": "islamic-greeting-dua",
    "category": "Social Manners",
    "description": "Extending peace and blessings (Assalamu Alaikum wa Rahmatullahi wa Barakatuh) to fellow believers.",
    "imagePath": "/resources/duas resources/greeting dua.jpg",
    "keyBenefits": [
      "Spreads love and harmony",
      "Earns 30 good deeds (hasanat)",
      "Strengthens community bonds"
    ]
  },
  {
    "id": 16,
    "title": "Dua For Sneezing",
    "slug": "dua-for-sneezing",
    "category": "Social Etiquette",
    "description": "Praising Allah (Alhamdulillah) immediately upon sneezing as taught by the Prophet (peace be upon him).",
    "imagePath": "/resources/duas resources/dua for sneezing.jpg",
    "keyBenefits": [
      "Relieves bodily pressure safely",
      "Praises Creator for health",
      "First step of sneezing etiquette"
    ]
  },
  {
    "id": 17,
    "title": "Dua Replying to One Who Sneezes",
    "slug": "dua-replying-to-the-one-who-sneezes",
    "category": "Social Etiquette",
    "description": "Praying for Allah's mercy (Yarhamukallah) upon hearing a fellow Muslim praise Allah after sneezing.",
    "imagePath": "/resources/duas resources/replying to the one who sneezes.jpg",
    "keyBenefits": [
      "Fulfills right of a fellow Muslim",
      "Invokes divine mercy",
      "Fosters mutual care"
    ]
  },
  {
    "id": 18,
    "title": "Dua When Replying Back After Sneezing",
    "slug": "dua-when-replying-back-after-sneezing",
    "category": "Social Etiquette",
    "description": "Praying for Allah to guide and rectify the condition (Yahdeekumullah wa yuslihu balakum) of the responder.",
    "imagePath": "/resources/duas resources/the person who sneezed should reply.jpg",
    "keyBenefits": [
      "Completes the cycle of prayer",
      "Asks for guidance and peace",
      "Establishes noble brotherhood"
    ]
  },
  {
    "id": 19,
    "title": "Dua When Looking in the Mirror",
    "slug": "dua-when-looking-in-the-mirror",
    "category": "Character & Ethics",
    "description": "Asking Allah to beautify one's moral character and heart just as He beautified physical creation.",
    "imagePath": "/resources/duas resources/when looking in the mirror.jpg",
    "keyBenefits": [
      "Focuses on inner beauty",
      "Promotes humility and modesty",
      "Improves speech and demeanor"
    ]
  },
  {
    "id": 20,
    "title": "Dua For Travelling or Riding a Vehicle",
    "slug": "dua-for-travelling-or-riding-in-a-vehicle",
    "category": "Travel Protection",
    "description": "Glorifying Allah who subjected transportation for our journey and asking for safety on the road.",
    "imagePath": "/resources/duas resources/dua for travelling or riding in a vehicle.jpg",
    "keyBenefits": [
      "Protects against travel accidents",
      "Brings ease to long journeys",
      "Instills peace of mind"
    ]
  },
  {
    "id": 21,
    "title": "Dua When Entering the Market",
    "slug": "dua-when-entering-the-market",
    "category": "Marketplace Etiquette",
    "description": "Declaring Allah's oneness and sovereignty when entering busy marketplaces to gain immense spiritual reward.",
    "imagePath": "/resources/duas resources/when entering market.jpg",
    "keyBenefits": [
      "Wipes out one million sins",
      "Gains one million good deeds",
      "Keeps heart connected in busy places"
    ]
  },
  {
    "id": 22,
    "title": "Dua For General Protection",
    "slug": "dua-for-general-protection",
    "category": "Daily Protection",
    "description": "Seeking comprehensive safety and refuge under Allah's perfect words from all created harm.",
    "imagePath": "/resources/duas resources/dua for general protection.jpg",
    "keyBenefits": [
      "Guards against sudden calamity",
      "Brings tranquility to heart",
      "Recommended morning and evening"
    ]
  },
  {
    "id": 23,
    "title": "Dua For Anxiety and Relief",
    "slug": "dua-for-anxiety-and-relief",
    "category": "Emotional Well-being",
    "description": "Prophetic supplication asking Allah for deliverance from grief, anxiety, distress, and heavy burdens.",
    "imagePath": "/resources/duas resources/dua for anxiety and relief.jpg",
    "keyBenefits": [
      "Calms panic and worry",
      "Empowers inner strength",
      "Prophetic remedy for depression"
    ]
  },
  {
    "id": 24,
    "title": "Dua For Trouble or Loss",
    "slug": "dua-for-trouble-or-loss",
    "category": "Patience & Perseverance",
    "description": "Reciting Inna lillahi wa inna ilayhi raji'un during hardship to earn divine mercy and compensation.",
    "imagePath": "/resources/duas resources/dua for trouble or loss.jpg",
    "keyBenefits": [
      "Fortifies resilience in calamity",
      "Replaces loss with better reward",
      "Aligns with divine decree"
    ]
  },
  {
    "id": 25,
    "title": "Dua When Seeing Anyone in Hardship or Trial",
    "slug": "dua-when-seeing-anyone-in-hardship-or-trial",
    "category": "Compassion & Gratitude",
    "description": "Thanking Allah for shielding oneself from trials seen in others and praising His abundant favors.",
    "imagePath": "/resources/duas resources/dua when seeing anyone in hardship or trail.jpg",
    "keyBenefits": [
      "Protects from experiencing same trial",
      "Builds empathy and shukr",
      "Recited quietly to avoid distress"
    ]
  },
  {
    "id": 26,
    "title": "Dua For Parents",
    "slug": "dua-for-parents",
    "category": "Family Supplication",
    "description": "Quranic prayer asking Allah to bestow mercy, health, and peace upon mothers and fathers.",
    "imagePath": "/resources/duas resources/dua for parents.jpg",
    "keyBenefits": [
      "Fulfills duty of filial piety",
      "Brings warmth to home",
      "Continuous charity for parents"
    ]
  },
  {
    "id": 27,
    "title": "Dua Before Sleeping",
    "slug": "dua-before-sleeping",
    "category": "Nightly Sunnah",
    "description": "Committing one's soul into Allah's care in His name before sleeping peacefully.",
    "imagePath": "/resources/duas resources/dua before sleeping.jpg",
    "keyBenefits": [
      "Protects during sleep",
      "Reminds one of Allah's control",
      "Ensures restful sleep"
    ]
  },
  {
    "id": 28,
    "title": "Quran Academee Essential Masnoon Duas Guide",
    "slug": "quran-academee-essential-masnoon-duas-guide",
    "category": "Academy Resource Title",
    "description": "Official comprehensive compilation of authentic daily Masnoon Duas curated by Quran Academee to help students, children, and families integrate prophetic supplications into their daily lives.",
    "imagePath": "/resources/duas resources/dua book title.jpg",
    "keyBenefits": [
      "Curated educational title page",
      "Complete guide for Quran Academee students",
      "Essential daily supplications for families"
    ]
  }
];
