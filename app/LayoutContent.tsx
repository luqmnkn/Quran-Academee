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
    if (trial === 'true') {
      setIsTrialModalOpen(true);
      if (plan) {
        setSelectedCourseSelection(plan);
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

      {/* Free Trial Popup Modal */}
      {isTrialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden relative border border-gray-100 animate-in zoom-in-95 duration-200">
            
            {/* Modal Banner Header */}
            <div className="bg-[#0B3951] text-white p-5 pr-12 relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#1C8DC8]/10 rounded-full blur-xl" />
              
              <div className="flex items-center space-x-2.5">
                <Calendar className="text-[#1C8DC8] w-5 h-5 shrink-0" />
                <h3 className="font-display font-extrabold text-lg text-white">
                  Schedule Free 3-Day Trial
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Send your class request securely. No charges are billed for evaluation sessions.
              </p>

              <button
                onClick={() => {
                  setIsTrialModalOpen(false);
                  setSelectedCourseSelection('');
                }}
                className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close scheduling modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto">
              <InquiryForm
                prefilledCourse={selectedCourseSelection}
                onClearPrefill={() => setSelectedCourseSelection('')}
                isModalMode={true}
                onSubmitSuccess={() => {
                  setTimeout(() => {
                    setIsTrialModalOpen(false);
                    setSelectedCourseSelection('');
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
