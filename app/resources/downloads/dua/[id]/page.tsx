'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download } from 'lucide-react';
import { DUAS } from '@/lib/quranData';
import ResourceFooter from '@/components/ResourceFooter';

interface DuaDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function DuaDetailPage({ params }: DuaDetailPageProps) {
  const resolvedParams = use(params);
  const rawId = resolvedParams.id;
  const router = useRouter();

  const currentDua = DUAS.find((d) => d.slug === rawId || String(d.id) === String(rawId)) || DUAS[0];

  const handleSelectDua = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSlug = e.target.value;
    router.push(`/resources/downloads/dua/${selectedSlug}`);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentDua.imagePath;
    link.download = `${currentDua.slug}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f0f9ff] to-[#d7effa] text-slate-800 pt-24 pb-16 overflow-x-clip">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/resources/downloads"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1081b7] hover:text-[#116c9c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Download Index
          </Link>
          <span className="text-xs text-slate-500 font-medium">
            Daily Masnoon Duas &bull; Dua {currentDua.id} of 28
          </span>
        </div>

        {/* Main Dua Showcase Card */}
        <div className="bg-white rounded-none p-6 sm:p-10 shadow-xl border border-[#38aae3]/25 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#38aae3]/20">
            <div>
              <span className="text-xs font-bold text-[#1081b7] uppercase tracking-wider block">
                {currentDua.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mt-1">
                {currentDua.title}
              </h1>
            </div>

            {/* Dropdown Selector */}
            <div className="w-full sm:w-64">
              <select
                value={currentDua.slug}
                onChange={handleSelectDua}
                className="w-full bg-slate-50 text-slate-900 font-semibold text-xs sm:text-sm rounded-none px-3.5 py-2.5 border border-[#38aae3]/30 focus:border-[#1081b7] focus:outline-none shadow-sm cursor-pointer"
              >
                {DUAS.map((d) => (
                  <option key={d.id} value={d.slug}>
                    {d.id}. {d.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 bg-[#f0f9ff] border border-[#38aae3]/20 text-slate-700 text-sm leading-relaxed rounded-none">
            <p className="m-0 font-medium">{currentDua.description}</p>
          </div>

          {/* Image Display */}
          <div className="relative w-full h-[280px] sm:h-[360px] bg-slate-50 rounded-none overflow-hidden flex items-center justify-center border border-slate-200">
            <Image
              src={currentDua.imagePath}
              alt={currentDua.title}
              fill
              className="object-contain p-3"
              priority
            />
          </div>

          {/* Download Action */}
          <button
            onClick={handleDownload}
            className="w-full py-4 bg-gradient-to-r from-[#1081b7] to-[#116c9c] hover:from-[#116c9c] hover:to-[#1081b7] text-white font-extrabold text-sm rounded-none transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Resolution Dua Card</span>
          </button>
        </div>
      </div>

      {/* CTA Footer */}
      <ResourceFooter />
    </div>
  );
}
