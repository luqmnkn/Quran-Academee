import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Compass,
  BookOpen,
  Download,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Home,
  MessageCircleQuestion,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found (404) | Quran Academee',
  description:
    'The requested page could not be found. Explore certified online Quran courses, interactive digital Mushaf reader, and free downloadable resources.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const quickLinks = [
    {
      title: 'Our Quran Courses',
      description: 'Explore live 1-on-1 courses in Qaida, Tajweed, Hifz & Arabic',
      href: '/courses',
      icon: GraduationCap,
    },
    {
      title: 'Read Quran Online',
      description: 'Interactive digital Mushaf with translations & audio recitations',
      href: '/resources/read',
      icon: BookOpen,
    },
    {
      title: 'Free PDF Downloads',
      description: 'Clean printable PDFs for all 114 Surahs, 30 Juz & 28 Masnoon Duas',
      href: '/resources/downloads',
      icon: Download,
    },
    {
      title: 'Tuition & Pricing Plans',
      description: 'Affordable monthly tuition plans starting from $35/month',
      href: '/pricing',
      icon: Sparkles,
    },
  ];

  return (
    <main className="min-h-[78vh] flex items-center justify-center pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50/60 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#1C8DC8]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#0B3951]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-3xl w-full text-center space-y-8 bg-white/95 backdrop-blur-sm border border-sky-100 rounded-3xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10">
        
        {/* Error Badge */}
        <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#1C8DC8] bg-sky-50 px-4 py-1.5 rounded-full border border-sky-100">
          <Compass className="w-4 h-4 text-[#1C8DC8] animate-spin-slow" />
          <span>Error 404 • Page Not Found</span>
        </div>

        {/* Heading & Subtext */}
        <div className="space-y-3">
          <h1 className="font-display font-[900] text-3xl sm:text-4xl md:text-5xl text-[#0B3951] tracking-tight leading-tight">
            We Can&apos;t Find That Page
          </h1>
          <p className="font-sans text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            The page you requested may have been moved, renamed, or is temporarily unavailable. 
            Use the helpful links below to find what you are looking for.
          </p>
        </div>

        {/* Helpful Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group p-4 rounded-2xl border border-sky-100/80 bg-slate-50/50 hover:bg-white hover:border-[#1C8DC8]/40 hover:shadow-md transition-all duration-200 flex items-start space-x-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-100/70 text-[#1C8DC8] flex items-center justify-center shrink-0 group-hover:bg-[#1C8DC8] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display font-bold text-sm text-[#0B3951] group-hover:text-[#1C8DC8] transition-colors">
                      {item.title}
                    </h2>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1C8DC8] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Primary Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#0B3951] hover:bg-[#146299] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/free-trial"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            <span>Book 3-Day Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Secondary Contact Link */}
        <p className="text-xs text-slate-500 pt-2">
          Need immediate assistance? Chat with our student coordination team on{' '}
          <a
            href="https://wa.me/923702680670"
            target="_blank"
            rel="noreferrer"
            className="text-[#1C8DC8] font-semibold hover:underline"
          >
            WhatsApp (+92 370 2680670)
          </a>
          .
        </p>

      </div>
    </main>
  );
}
