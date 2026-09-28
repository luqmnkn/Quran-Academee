'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Download, ArrowLeft, FileText, CheckCircle2, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';
import { DOWNLOADABLE_RESOURCES } from '@/lib/quranData';
import ResourceFooter from '@/components/ResourceFooter';

export default function BookletDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const resource = DOWNLOADABLE_RESOURCES.find((r) => r.id === id);

  if (!resource) {
    return (
      <div className="min-h-screen bg-[#f0f9ff] flex items-center justify-center pt-24 pb-16 px-4 text-center">
        <div className="bg-white rounded-2xl p-8 max-w-md shadow-xl space-y-4">
          <h2 className="text-2xl font-bold text-[#116c9c]">Document Not Found</h2>
          <p className="text-slate-600 text-sm">The requested booklet resource could not be found.</p>
          <Link
            href="/resources"
            className="inline-block px-5 py-2.5 rounded-xl bg-[#1081b7] text-white font-bold text-xs"
          >
            Back to Resource Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f0f9ff] to-[#d7effa] text-slate-800 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1081b7] hover:text-[#116c9c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Resource Hub
          </Link>
          <span className="text-xs text-slate-500 font-medium">
            Resource Library &bull; {resource.category}
          </span>
        </div>

        {/* Main Document Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#f0f9ff] rounded-3xl p-6 sm:p-10 shadow-xl border border-[#38aae3]/25 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left: Large Cover Page Thumbnail */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm h-80 sm:h-96 bg-white rounded-2xl p-4 shadow-lg border border-[#38aae3]/20 flex items-center justify-center overflow-hidden">
              <Image
                src={resource.thumbnail}
                alt={resource.title}
                width={280}
                height={340}
                className="object-contain max-h-full rounded-lg shadow"
                priority
              />
              {resource.badge && (
                <span className="absolute top-4 right-4 px-3.5 py-1 bg-[#1081b7] text-white text-xs font-bold rounded-full shadow-md">
                  {resource.badge}
                </span>
              )}
            </div>
          </div>

          {/* Right: Essential Information & Outlines */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-[#1081b7] uppercase tracking-wider">
                {resource.category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mt-1">
                {resource.title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {resource.fullDescription || resource.description}
            </p>

            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 pt-1">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#38aae3]/20">
                <FileText className="w-4 h-4 text-[#1081b7]" /> {resource.pages} Pages
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#38aae3]/20">
                Format: {resource.format} ({resource.fileSize})
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#38aae3]/20 text-[#1081b7]">
                <ShieldCheck className="w-4 h-4" /> Authentic Scholar Guide
              </span>
            </div>

            {/* Chapter Outlines & Takeaways */}
            {resource.outlines && resource.outlines.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-[#38aae3]/20 space-y-3 shadow-sm">
                <h3 className="text-xs font-extrabold text-[#116c9c] uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> What You Will Learn & Key Contents
                </h3>
                <ul className="space-y-2">
                  {resource.outlines.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Download CTA Action */}
            <div className="pt-2">
              <a
                href={resource.downloadPath}
                download
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#1081b7] hover:bg-[#116c9c] text-white font-extrabold text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF Resource ({resource.fileSize})</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Footer */}
      <ResourceFooter />
    </div>
  );
}
