import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 15;

export async function GET(req: NextRequest) {
  // 1. Check for Vercel's country header (set automatically in production)
  const vercelCountry = req.headers.get('x-vercel-ip-country');
  
  if (vercelCountry) {
    return NextResponse.json({
      country_code: vercelCountry.toUpperCase(),
    });
  }

  // 2. Fallback to server-side IP lookup for local development (no CORS restriction on server-side fetches)
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({
        country_code: data.country_code,
        country_name: data.country,
      });
    }
  } catch (err) {
    console.error('Server-side geolocation lookup failed:', err);
  }

  // Default fallback if everything fails
  return NextResponse.json({
    country_code: 'US',
    country_name: 'United States',
  });
}
