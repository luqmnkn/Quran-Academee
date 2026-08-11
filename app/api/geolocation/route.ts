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

  // 2. Fallback to server-side IP lookup for local development (with User-Agent)
  try {
    const res = await fetch('https://ipapi.co/json/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code) {
        return NextResponse.json({
          country_code: data.country_code.toUpperCase(),
          country_name: data.country,
        });
      }
    }
  } catch (err) {
    console.error('Server-side ipapi.co lookup failed:', err);
  }

  // 3. Secondary fallback to ipwho.is lookup
  try {
    const res = await fetch('https://ipwho.is/');
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.country_code) {
        return NextResponse.json({
          country_code: data.country_code.toUpperCase(),
          country_name: data.country,
        });
      }
    }
  } catch (err) {
    console.error('Server-side ipwho.is lookup failed:', err);
  }

  // Default fallback if everything fails
  return NextResponse.json({
    country_code: 'US',
    country_name: 'United States',
  });
}
