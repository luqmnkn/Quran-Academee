const fs = require('fs');
const path = require('path');

const reviewsDir = path.join(__dirname, '..', 'public', 'video-reviews');
const outputFile = path.join(__dirname, '..', 'public', 'video-reviews.json');

const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v'];

function formatStudentName(filename) {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  let clean = nameWithoutExt.replace(/[-_]+/g, ' ').trim();
  
  if (clean.toLowerCase() === 'khadija') return 'Khadija';
  if (clean.toLowerCase() === 'anabia') return 'Anabia';
  if (clean.toLowerCase() === 'yusra zohaib' || clean.toLowerCase() === 'yusra and zohaib') return 'Yusra & Zohaib';

  return clean
    .split(' ')
    .filter(Boolean)
    .map((word) => {
      if (word.toLowerCase() === 'and') return '&';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

try {
  if (fs.existsSync(reviewsDir)) {
    const files = fs.readdirSync(reviewsDir);
    const videoFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return videoExtensions.includes(ext);
    });

    const reviews = videoFiles.map((file, idx) => {
      const studentName = formatStudentName(file);
      return {
        id: `v-${idx + 1}-${encodeURIComponent(file)}`,
        studentName,
        age: 'Student',
        courseName: 'Tajweed & Recitation',
        duration: 'Student at Quran Academee',
        snippet: `${studentName} reciting Holy Quran with proper Tajweed and fluency.`,
        thumbnailGradient: 'from-[#1081b7]/30 via-[#38aae3]/20 to-[#116c9c]/40',
        videoUrl: `/video-reviews/${file}`,
      };
    });

    fs.writeFileSync(outputFile, JSON.stringify(reviews, null, 2));
    console.log(`[sync-videos] Successfully synchronized ${reviews.length} video review(s) to public/video-reviews.json`);
  }
} catch (err) {
  console.error('[sync-videos] Error syncing videos:', err);
}
