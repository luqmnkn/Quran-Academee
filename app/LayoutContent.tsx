'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
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
  const router = useRouter();
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

  const handleOpenTrialModal = (planOrCourseName?: string) => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('trial', 'true');
      if (planOrCourseName) {
        params.set('plan', planOrCourseName);
      } else {
        params.delete('plan');
      }
      const newUrl = `${pathname}?${params.toString()}`;
      window.history.replaceState(null, '', newUrl);
    }
    setIsTrialModalOpen(true);
    if (planOrCourseName) {
      setSelectedCourseSelection(planOrCourseName);
    }
  };

  const handleCloseTrialModal = () => {
    setIsTrialModalOpen(false);
    setSelectedCourseSelection('');
    setSelectedDetailsSelection('');
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.delete('trial');
      params.delete('plan');
      params.delete('details');
      const cleanUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      window.history.replaceState(null, '', cleanUrl);
    }
  };

  // Sync trial modal state from URL query params cleanly without history stack clutter
  useEffect(() => {
    const syncModalStateFromUrl = () => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const trial = params.get('trial');
      const plan = params.get('plan');
      const details = params.get('details');

      if (trial === 'true') {
        setIsTrialModalOpen(true);
        if (plan) setSelectedCourseSelection(plan);
        if (details) setSelectedDetailsSelection(details);
      } else {
        setIsTrialModalOpen(false);
        setSelectedCourseSelection('');
        setSelectedDetailsSelection('');
      }
    };

    syncModalStateFromUrl();

    window.addEventListener('popstate', syncModalStateFromUrl);
    window.addEventListener('open-trial-modal', syncModalStateFromUrl);

    return () => {
      window.removeEventListener('popstate', syncModalStateFromUrl);
      window.removeEventListener('open-trial-modal', syncModalStateFromUrl);
    };
  }, [pathname, searchParams]);

  // Bind Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isTrialModalOpen) {
        handleCloseTrialModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTrialModalOpen]);

  return (
    <>
      {/* Sticky Header */}
      {!isAdminPage && (
        <Header onOpenTrialModal={() => handleOpenTrialModal()} />
      )}

      {/* Dynamic Page Content */}
      <main>{children}</main>

      {/* Footer */}
      {!isAdminPage && <Footer />}

      {/* Floating WhatsApp Button */}
      {!isAdminPage && <WhatsAppButton />}

      {/* Free Trial Popup Modal (Centered Modal) */}
      {isTrialModalOpen && (
        <div 
          onClick={handleCloseTrialModal}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto relative flex flex-col justify-start animate-in zoom-in-95 duration-200 p-6 sm:p-8 cursor-default"
          >
            
            {/* Floating Close Button */}
            <button
              onClick={handleCloseTrialModal}
              className="absolute top-4 right-4 z-20 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close scheduling modal"
            >
              <X size={22} />
            </button>

            {/* Modal Body */}
            <div className="mt-4 flex-1">
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
                    handleCloseTrialModal();
                  }, 4000);
                }}
              />
            </div>

          </div>
        </div>
      )}

      {/* Floating Bar Controls */}
      {!isAdminPage && (
        <FloatingControls onOpenTrialModal={() => handleOpenTrialModal()} />
      )}
    </>
  );
}
