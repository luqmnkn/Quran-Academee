'use client';

import React from 'react';
import dynamic from 'next/dynamic';

interface QuranPdfViewerProps {
  file?: string;
  src?: string;
  title?: string;
  className?: string;
}

const QuranPdfViewer = dynamic<QuranPdfViewerProps>(
  () => import('./QuranPdfViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center w-full h-full bg-slate-100 text-[#1081b7] gap-3">
        <div className="w-6 h-6 border-2 border-[#1081b7] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold">Loading Quran...</span>
      </div>
    ),
  }
);

export default QuranPdfViewer;
