import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { VIDEO_TESTIMONIALS as DEFAULT_TESTIMONIALS } from '../../../data';
import { VideoTestimonial } from '../../../types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function formatStudentName(filename: string): string {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  
  // Clean special characters like hyphens/underscores
  let clean = nameWithoutExt.replace(/[-_]+/g, ' ').trim();
  
  // Check if matches known student in default list
  const known = DEFAULT_TESTIMONIALS.find(
    (t) =>
      t.studentName.toLowerCase() === clean.toLowerCase() ||
      t.studentName.toLowerCase().replace(/&/g, 'and') === clean.toLowerCase().replace(/&/g, 'and')
  );
  if (known) return known.studentName;

  // Title Case conversion: "ahmed khan" -> "Ahmed Khan"
  return clean
    .split(' ')
    .filter(Boolean)
    .map((word) => {
      if (word.toLowerCase() === 'and') return '&';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export async function GET() {
  try {
    const reviewsDir = path.join(process.cwd(), 'public', 'video-reviews');
    
    if (!fs.existsSync(reviewsDir)) {
      return NextResponse.json(DEFAULT_TESTIMONIALS);
    }

    const files = fs.readdirSync(reviewsDir);
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v'];

    const videoFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return videoExtensions.includes(ext);
    });

    if (videoFiles.length === 0) {
      return NextResponse.json(DEFAULT_TESTIMONIALS);
    }

    // Build the dynamic list of video reviews
    const reviews: VideoTestimonial[] = videoFiles.map((file, idx) => {
      const studentName = formatStudentName(file);
      const videoUrl = `/video-reviews/${file}`;

      // Check if existing item in default list has custom snippet / courseName
      const existing = DEFAULT_TESTIMONIALS.find(
        (t) => path.basename(t.videoUrl).toLowerCase() === file.toLowerCase()
      );

      if (existing) {
        return {
          ...existing,
          id: existing.id || `v-${idx + 1}`,
          studentName: existing.studentName || studentName,
          videoUrl,
        };
      }

      return {
        id: `v-${idx + 1}-${encodeURIComponent(file)}`,
        studentName,
        age: 'Student',
        courseName: 'Tajweed & Recitation',
        duration: 'Student at Quran Academee',
        snippet: `${studentName} reciting Holy Quran with proper Tajweed and fluency.`,
        thumbnailGradient: 'from-[#1081b7]/30 via-[#38aae3]/20 to-[#116c9c]/40',
        videoUrl,
      };
    });

    return NextResponse.json(reviews, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err) {
    console.error('Error reading video reviews directory:', err);
    return NextResponse.json(DEFAULT_TESTIMONIALS);
  }
}
