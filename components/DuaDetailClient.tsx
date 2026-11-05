'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Download } from 'lucide-react';
import { DuaItem } from '@/lib/quranData';

interface DuaDetailClientProps {
  currentDua: DuaItem;
  allDuas: DuaItem[];
}

export default function DuaDetailClient({ currentDua, allDuas }: DuaDetailClientProps) {
  const router = useRouter();

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
            {allDuas.map((d) => (
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
        className="w-full py-4 bg-gradient-to-r from-[#1081b7] to-[#116c9c] hover:from-[#116c9c] hover:to-[#1081b7] text-white font-extrabold text-sm rounded-none transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
      >
        <Download className="w-4 h-4" />
        <span>Download High-Resolution Dua Card</span>
      </button>
    </div>
  );
}
