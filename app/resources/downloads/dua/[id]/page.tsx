'use client';

import React, { use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DUAS } from '@/lib/quranData';

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
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto space-y-5">
        {/* 1. Duas Dropdown List */}
        <div>
          <select
            value={currentDua.slug}
            onChange={handleSelectDua}
            className="w-full bg-white text-slate-900 font-medium text-base rounded-xl px-4 py-3 border border-slate-300 focus:border-[#1081b7] focus:outline-none shadow-sm cursor-pointer"
          >
            {DUAS.map((d) => (
              <option key={d.id} value={d.slug}>
                {d.id}. {d.title}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Three Line Description about Dua taking exactly 70px height */}
        <div className="h-[70px] overflow-hidden text-slate-600 text-sm leading-snug line-clamp-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <p className="m-0">{currentDua.description}</p>
        </div>

        {/* 3. Dua Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md space-y-4">
          <div className="relative w-full aspect-[4/1] bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200">
            <Image
              src={currentDua.imagePath}
              alt={currentDua.title}
              fill
              className="object-contain p-1"
              priority
            />
          </div>

          <button
            onClick={handleDownload}
            className="w-full py-3.5 bg-[#1081b7] hover:bg-[#116c9c] text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
          >
            Download Dua Image
          </button>
        </div>
      </div>
    </div>
  );
}
