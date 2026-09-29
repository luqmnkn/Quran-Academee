const https = require('https');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function test() {
  console.log("Testing Quran.com API v4...");
  try {
    const chapters = await fetchJson('https://api.quran.com/api/v4/chapters');
    console.log("Chapters count:", chapters.chapters ? chapters.chapters.length : 0);
    
    // Test Uthmani Tajweed text for Surah 1 (Al-Fatihah)
    const tajweed = await fetchJson('https://api.quran.com/api/v4/quran/verses/uthmani_tajweed?chapter_number=1');
    console.log("Surah 1 Tajweed verses count:", tajweed.verses ? tajweed.verses.length : 0);
    if (tajweed.verses && tajweed.verses[0]) {
      console.log("Sample Tajweed Verse 1:", tajweed.verses[0].text_uthmani_tajweed);
    }

    // Test Audio Recitation
    const audio = await fetchJson('https://api.quran.com/api/v4/chapter_recitations/7/1');
    console.log("Audio file URL for Mishary Rashid Alafasy (Surah 1):", audio.audio_file ? audio.audio_file.audio_url : null);

  } catch (err) {
    console.error("API test error:", err);
  }
}

test();
