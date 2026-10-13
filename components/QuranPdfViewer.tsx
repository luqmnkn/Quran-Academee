'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

// Configure pdfjs worker URL from local public folder to guarantee CORS-free, instant worker loading
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

interface QuranPdfViewerProps {
  file?: string;
  src?: string;
  title?: string;
  className?: string;
}

export default function QuranPdfViewer({ file, src, title, className = '' }: QuranPdfViewerProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const filePath = file || src || '';
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return Math.min(window.innerWidth - 24, 850);
    }
    return 600;
  });
  const [isError, setIsError] = useState<boolean>(false);
  const [reloadKey, setReloadKey] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Client hydration guard
  useEffect(() => {
    setMounted(true);
  }, []);

  // Measure container width for responsive fit-to-width rendering
  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      if (width > 0) {
        setContainerWidth(width);
      }
    } else if (typeof window !== 'undefined') {
      setContainerWidth(Math.min(window.innerWidth - 24, 850));
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    updateWidth();
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener('resize', updateWidth);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, [mounted, updateWidth]);

  // Reset page state when selected PDF path changes
  useEffect(() => {
    setNumPages(null);
    setCurrentPage(1);
    setIsError(false);
  }, [filePath]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsError(false);
  }

  function onDocumentLoadError(error: Error) {
    console.error('Failed to load Quran PDF:', error);
    setIsError(true);
  }

  const handleRetry = () => {
    setIsError(false);
    setReloadKey((prev) => prev + 1);
  };

  if (!mounted) {
    return (
      <div className={`w-full h-full relative flex flex-col items-center justify-center bg-slate-100 p-4 text-[#1081b7] ${className}`}>
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="text-xs font-semibold mt-2">Loading Quran...</span>
      </div>
    );
  }

  // Calculate target page width (fit container width, max 850px for clean desktop reading)
  const paddingOffset = containerWidth < 640 ? 12 : 24;
  const targetPageWidth = containerWidth > 0 ? Math.min(containerWidth - paddingOffset, 850) : 600;

  return (
    <div
      ref={containerRef}
      className={`w-full relative flex flex-col items-center bg-slate-100 p-2 sm:p-4 ${className}`}
    >
      {filePath ? (
        <Document
          key={`${filePath}-${reloadKey}`}
          file={filePath}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex flex-col items-center justify-center my-auto p-8 text-[#1081b7] gap-3 min-h-[300px]">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-xs sm:text-sm font-semibold">Loading Quran...</span>
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center my-auto p-6 text-slate-700 bg-white rounded-none shadow-sm border border-slate-200 text-center max-w-sm gap-3">
              <AlertCircle className="w-8 h-8 text-amber-500" />
              <p className="text-xs sm:text-sm font-semibold">
                Unable to load this Quran page. Please try again.
              </p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-[#1081b7] hover:bg-[#116c9c] text-white text-xs font-bold rounded-none flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Retry
              </button>
            </div>
          }
          className="flex flex-col items-center w-full max-w-full"
        >
          <div className="bg-white shadow-md rounded-none overflow-hidden border border-slate-200 max-w-full shrink-0">
            <Page
              pageNumber={currentPage}
              width={targetPageWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading={
                <div
                  className="flex items-center justify-center bg-slate-50 text-slate-400 text-xs"
                  style={{ width: targetPageWidth, height: targetPageWidth * 1.4 }}
                >
                  Loading page {currentPage}...
                </div>
              }
            />
          </div>

          {numPages && numPages > 1 && (
            <div className="flex items-center justify-between w-full max-w-xs mt-3 px-3 py-1.5 bg-white border border-slate-200 shadow-sm text-xs font-semibold select-none">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="px-2 py-1 text-slate-700 hover:text-[#1081b7] disabled:opacity-30 disabled:hover:text-slate-700 transition-colors"
              >
                &larr; Prev
              </button>
              <span className="text-slate-500 text-[11px] font-mono">
                Page {currentPage} of {numPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(numPages, p + 1))}
                disabled={currentPage >= numPages}
                className="px-2 py-1 text-slate-700 hover:text-[#1081b7] disabled:opacity-30 disabled:hover:text-slate-700 transition-colors"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </Document>
      ) : (
        <div className="flex flex-col items-center justify-center my-auto text-slate-400 text-xs p-8">
          No PDF selected.
        </div>
      )}
    </div>
  );
}
