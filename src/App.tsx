import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Services from './components/Services';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import TrustCredibility from './components/TrustCredibility';
import Testimonials from './components/Testimonials';
import InquiryForm from './components/InquiryForm';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import FloatingControls from './components/FloatingControls';
import AdminDashboard from './components/AdminDashboard';
import { X, Calendar } from 'lucide-react';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [selectedCourseSelection, setSelectedCourseSelection] = useState('');

  // Declarative React Router DOM scroll and hash link scroller
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 120);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    }
  }, [location.pathname, location.hash]);

  // Handle Course Selection scrolling directly to contact form
  const handleCourseSelection = (courseName: string) => {
    setSelectedCourseSelection(courseName);
    
    if (location.pathname !== '/') {
      navigate('/#contact');
    } else {
      const targetElement = document.querySelector('#contact');
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Handle Pricing Plan selection
  const handlePricingSelection = (planName: string, planDetails: string) => {
    setSelectedCourseSelection(`${planName}: ${planDetails}`);
    setIsTrialModalOpen(true);
  };

  // Submit trigger from Quick Inquiry Hero
  const handleLeadSubmitInHero = (data: { fullName: string; email: string; phone: string; country: string; courseInterest: string; message: string }) => {
    console.log('Lead sync from hero:', data);
  };

  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="relative min-h-screen font-sans antialiased text-gray-950 bg-gray-50/50">
      
      {/* Header Sticky Component */}
      {!isAdminPage && (
        <Header 
          onOpenTrialModal={() => setIsTrialModalOpen(true)} 
        />
      )}

      {/* Main Content Sections managed securely by react-router-dom */}
      <main>
        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section */}
              <Hero
                onOpenTrialModal={() => setIsTrialModalOpen(true)}
                onSubmitInquiry={handleLeadSubmitInHero}
              />

              {/* Services / Syllabus Showcase */}
              <Services
                onSelectCourse={handleCourseSelection}
                onOpenTrialModal={() => setIsTrialModalOpen(true)}
              />

              {/* About Academy & 3-Step Start Component */}
              <About onOpenTrialModal={() => setIsTrialModalOpen(true)} />

              {/* Why Choose Us features grid */}
              <WhyChooseUs />

              {/* Trust Credibility Stat meters */}
              <TrustCredibility />

              {/* Real student reviews & testimonials filter */}
              <Testimonials />

              {/* Primary Lead Generation Enrollment Form */}
              <InquiryForm
                prefilledCourse={selectedCourseSelection && selectedCourseSelection.toLowerCase().includes('plan') ? '' : selectedCourseSelection}
                onClearPrefill={() => setSelectedCourseSelection('')}
              />

              {/* FAQ Accordion Section */}
              <FAQSection />
            </>
          } />

          <Route path="/pricing" element={
            <Pricing onBookTrial={handlePricingSelection} />
          } />

          <Route path="/admin" element={
            <AdminDashboard />
          } />
        </Routes>
      </main>

      {/* Layout Footer contacts */}
      {!isAdminPage && (
        <Footer />
      )}

      {/* Floating vibration WhatsApp trigger */}
      {!isAdminPage && <WhatsAppButton />}

      {/* Core Trial Request Popup Modal Wrapper */}
      {isTrialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden relative border border-gray-100 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header banner */}
            <div className="bg-[#0B3951] text-white p-5 pr-12 relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#1C8DC8]/10 rounded-full blur-xl"></div>
              
              <div className="flex items-center space-x-2.5">
                <Calendar className="text-[#1C8DC8] w-5 h-5 shrink-0" />
                <h3 className="font-display font-extrabold text-lg text-white">
                  Schedule Free 3-Day Trial
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Send your class request securely. No charges are billed for the evaluation sessions.
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

            {/* Modal Body with embedded Inquiry Form */}
            <div className="p-6 max-h-[75vh] overflow-y-auto">
              <InquiryForm
                prefilledCourse={selectedCourseSelection}
                onClearPrefill={() => setSelectedCourseSelection('')}
                isModalMode={true}
                onSubmitSuccess={() => {
                  // Wait briefly and close modal automatically on success
                  setTimeout(() => {
                    setIsTrialModalOpen(false);
                    setSelectedCourseSelection('');
                  }, 5000);
                }}
              />
            </div>

          </div>
        </div>
      )}

      {/* Floating Controls system */}
      {!isAdminPage && <FloatingControls onOpenTrialModal={() => setIsTrialModalOpen(true)} />}
    </div>
  );
}
