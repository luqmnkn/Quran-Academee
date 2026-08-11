'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import FloatingControls from '../components/FloatingControls';
import InquiryForm from '../components/InquiryForm';
import { X, Calendar } from 'lucide-react';

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [selectedCourseSelection, setSelectedCourseSelection] = useState('');
  const [selectedDetailsSelection, setSelectedDetailsSelection] = useState('');

  const isAdminPage = pathname === '/admin';

  // Smooth Hash Scrolling for Next.js App Router
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Open trial modal if requested via URL query params
  useEffect(() => {
    const trial = searchParams.get('trial');
    const plan = searchParams.get('plan');
    const details = searchParams.get('details');
    if (trial === 'true') {
      setIsTrialModalOpen(true);
      if (plan) {
        setSelectedCourseSelection(plan);
      }
      if (details) {
        setSelectedDetailsSelection(details);
      }
    }
  }, [searchParams]);

  return (
    <>
      {/* Sticky Header */}
      {!isAdminPage && (
        <Header onOpenTrialModal={() => setIsTrialModalOpen(true)} />
      )}

      {/* Dynamic Page Content */}
      <main>{children}</main>

      {/* Footer */}
      {!isAdminPage && <Footer />}

      {/* Floating WhatsApp Button */}
      {!isAdminPage && <WhatsAppButton />}

      {/* Free Trial Popup Modal (100vh Slide-Over) */}
      {isTrialModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg h-screen shadow-2xl overflow-y-auto relative flex flex-col justify-start animate-in slide-in-from-right duration-300 border-l border-gray-100 p-6 sm:p-8">
            
            {/* Floating Close Button */}
            <button
              onClick={() => {
                setIsTrialModalOpen(false);
                setSelectedCourseSelection('');
                setSelectedDetailsSelection('');
              }}
              className="absolute top-4 right-4 z-20 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close scheduling modal"
            >
              <X size={22} />
            </button>

            {/* Modal Body */}
            <div className="mt-8 flex-1">
              <InquiryForm
                prefilledCourse={selectedCourseSelection}
                prefilledDetails={selectedDetailsSelection}
                onClearPrefill={() => {
                  setSelectedCourseSelection('');
                  setSelectedDetailsSelection('');
                }}
                isModalMode={true}
                onSubmitSuccess={() => {
                  setTimeout(() => {
                    setIsTrialModalOpen(false);
                    setSelectedCourseSelection('');
                    setSelectedDetailsSelection('');
                  }, 4000);
                }}
              />
            </div>

          </div>
        </div>
      )}

      {/* Floating Bar Controls */}
      {!isAdminPage && (
        <FloatingControls onOpenTrialModal={() => setIsTrialModalOpen(true)} />
      )}
    </>
  );
}
