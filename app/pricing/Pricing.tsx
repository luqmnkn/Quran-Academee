import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Star, Sparkles, Award, BookOpen, Compass, Globe, ChevronDown } from 'lucide-react';

interface PricingProps {
  onBookTrial: (planName: string, planDetails: string) => void;
}

const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸', symbol: '$', rate: 1.0 },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', symbol: '£', rate: 0.8 },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', symbol: 'CA$', rate: 1.35 },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', symbol: 'A$', rate: 1.5 },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', symbol: 'SR ', rate: 3.75 },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', symbol: 'AED ', rate: 3.67 },
];

interface Plan {
  id: string;
  name: string;
  price: number; // Base price in USD
  originalPrice?: number; // Base original price in USD
  weeklyClasses: number;
  classDuration: string;
  classesPerMonth: number;
  isPopular?: boolean;
  features: string[];
}

interface PricingCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  plans: Plan[];
}

const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: 'nazra',
    title: 'Quran Nazra & Qaida',
    subtitle: 'Qaida, Nazra, Duas & Basic Tajweed',
    icon: 'menu_book',
    description: 'Perfect for beginners and children building a strong pronunciation foundation from absolute scratch.',
    plans: [
      {
        id: 'nazra-plan-1',
        name: 'Plan 1',
        price: 35,
        originalPrice: 48,
        weeklyClasses: 2,
        classDuration: '20-25 Minutes',
        classesPerMonth: 8,
        features: [
          'Free Trial Class included',
          '2 Days/Week (20-25 Mins/Class)',
          '08 Classes per Month',
          'Alqaida Almadania & Basic Reading',
          'Certified Male/Female Quran teacher'
        ]
      },
      {
        id: 'nazra-plan-2',
        name: 'Plan 2',
        price: 50,
        originalPrice: 63,
        weeklyClasses: 3,
        classDuration: '20-25 Minutes',
        classesPerMonth: 12,
        isPopular: true,
        features: [
          'Free Trial Class included',
          '3 Days/Week (20-25 Mins/Class)',
          '12 Classes per Month',
          'Fluency in Quranic reading & basic Tajweed',
          'Certified expert Quran teacher'
        ]
      },
      {
        id: 'nazra-plan-3',
        name: 'Plan 3',
        price: 70,
        originalPrice: 78,
        weeklyClasses: 5,
        classDuration: '20-25 Minutes',
        classesPerMonth: 20,
        features: [
          'Free Trial Class included',
          '5 Days/Week (20-25 Mins/Class)',
          '20 Classes per Month',
          'Rapid recitation & intensive Tajweed rules',
          'Senior certified Quran teacher'
        ]
      }
    ]
  },
  {
    id: 'memorization',
    title: 'Quran Memorization',
    subtitle: 'Comprehensive Hifz with Senior Mentors',
    icon: 'workspace_premium',
    description: 'Structured, highly disciplined private program to memorize and retain the Quran with authentic Tajweed.',
    plans: [
      {
        id: 'hifz-plan-1',
        name: 'Plan 1',
        price: 100,
        originalPrice: 115,
        weeklyClasses: 2,
        classDuration: '40-45 Minutes',
        classesPerMonth: 8,
        features: [
          'Free Trial Class included',
          '2 Days per Week',
          '40-45 Minutes / Class',
          '08 Classes / Month',
          'Customized Hifz memorization planner',
          'Daily testing of new memorization (Sabaq)',
          'Certified Hifz tutor',
          'Flexible scheduling / 12h makeup notice',
          'Detailed monthly Hifz progress audit'
        ]
      },
      {
        id: 'hifz-plan-2',
        name: 'Plan 2',
        price: 110,
        originalPrice: 130,
        weeklyClasses: 3,
        classDuration: '40-45 Minutes',
        classesPerMonth: 12,
        isPopular: true,
        features: [
          'Free Trial Class included',
          '3 Days per Week',
          '40-45 Minutes / Class',
          '12 Classes / Month',
          'Revision of old parts (Manzil & Sabaqi)',
          'Long-term memory retention strategies',
          'Certified senior Hifz teacher',
          'Priority makeup class rescheduling',
          'Bi-weekly oral evaluation meetings',
          'Dedicated Hifz dashboard & statistics'
        ]
      },
      {
        id: 'hifz-plan-3',
        name: 'Plan 3',
        price: 150,
        originalPrice: 175,
        weeklyClasses: 5,
        classDuration: '1 Hour',
        classesPerMonth: 20,
        features: [
          'Free Trial Class included',
          '5 Days per Week',
          '1hr / Class',
          '20 Classes / Month',
          'Elite Senior Quran Reciters',
          'Daily intensive revision & testing',
          'Personalized long-term Hifz timeline planner',
          'Monthly 1-on-1 counselor sync sessions',
          'Complimentary physical Quran study kit',
          'Priority direct academic line support'
        ]
      }
    ]
  },
  {
    id: 'islamic-essentials',
    title: 'Islamic Essentials',
    subtitle: 'Fiqh, Aqeedah, Seerah, & Adhkar',
    icon: 'explore',
    description: 'An essential structured curriculum covering basic creed, prayers, manners, and prophetic biographies.',
    plans: [
      {
        id: 'islamic-plan-1',
        name: 'Plan 1',
        price: 55,
        weeklyClasses: 2,
        classDuration: '20-25 Minutes',
        classesPerMonth: 8,
        features: [
          'Free Trial Class included',
          '2 Days per Week',
          '20-25 Minutes / Class',
          '08 Classes / Month',
          'Essential Islamic beliefs (Aqeedah)',
          'Step-by-step practical training for Wudu & Salah',
          'Daily Duas, Adhkar, & moral etiquettes (Akhlaq)',
          'Certified Islamic Studies instructor',
          'Flexible scheduling / makeup classes'
        ]
      },
      {
        id: 'islamic-plan-2',
        name: 'Plan 2',
        price: 80,
        weeklyClasses: 3,
        classDuration: '20-25 Minutes',
        classesPerMonth: 12,
        isPopular: true,
        features: [
          'Free Trial Class included',
          '3 Days per Week',
          '20-25 Minutes / Class',
          '12 Classes / Month',
          'Fiqh, Seerah of Prophet Muhammad (PBUH)',
          'Moral etiquettes & stories of the Prophets',
          'Age-appropriate curriculum & live worksheets',
          'Weekly quizzes & academic evaluations',
          'Priority makeup class support'
        ]
      }
    ]
  },
  {
    id: 'quranic-arabic',
    title: 'Quranic Arabic',
    subtitle: 'Direct Grammar, Roots & Vocabulary',
    icon: 'language',
    description: 'Deconstruct Arabic root words, high-frequency verbs, and syntax to comprehend the words of Allah directly.',
    plans: [
      {
        id: 'arabic-plan-1',
        name: 'Plan 1',
        price: 60,
        weeklyClasses: 2,
        classDuration: '20-25 Minutes',
        classesPerMonth: 8,
        features: [
          'Free Trial Class included',
          '2 Days per Week',
          '20-25 Minutes / Class',
          '08 Classes / Month',
          'High-frequency Quranic vocabulary',
          'Essential simplified grammar rules (Nahw & Sarf)',
          'Direct word-for-word translation of common Surahs',
          'Certified linguist & Arabic teacher',
          'Flexible scheduling / makeup classes'
        ]
      },
      {
        id: 'arabic-plan-2',
        name: 'Plan 2',
        price: 100,
        weeklyClasses: 3,
        classDuration: '20-25 Minutes',
        classesPerMonth: 12,
        isPopular: true,
        features: [
          'Free Trial Class included',
          '3 Days per Week',
          '20-25 Minutes / Class',
          '12 Classes / Month',
          'Complete direct translation of deep Quran chapters',
          'Advanced sentence structure parsing',
          'Comprehending daily Adhkar & Salah directly',
          'Comprehensive vocabulary guidebooks',
          'Priority makeup class support'
        ]
      }
    ]
  }
];

export default function Pricing({ onBookTrial }: PricingProps) {
  const handleBookTrial = (planName: string, planDetails: string) => {
    if (onBookTrial && onBookTrial.toString() !== '() => {}') {
      onBookTrial(planName, planDetails);
    }
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('trial', 'true');
      params.set('plan', planName);
      if (planDetails) {
        params.set('details', planDetails);
      }
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, '', newUrl);
      window.dispatchEvent(new Event('open-trial-modal'));
    }
  };

  const [selectedCountry, setSelectedCountry] = useState('US');
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('nazra');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
  const [customDays, setCustomDays] = useState(3);
  const [customDuration, setCustomDuration] = useState('30 Minutes');
  const [selectedCourse, setSelectedCourse] = useState('nazra');
  const [selectedDaysList, setSelectedDaysList] = useState<string[]>(['Monday', 'Wednesday', 'Friday']);

  const [isMobile, setIsMobile] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(1); // Default to middle card (index 1)
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && scrollContainerRef.current) {
      setTimeout(() => {
        const container = scrollContainerRef.current;
        if (container) {
          const middleCard = container.children[1] as HTMLElement;
          if (middleCard) {
            const scrollOffset = middleCard.offsetLeft - (container.offsetWidth - middleCard.offsetWidth) / 2;
            container.scrollTo({ left: scrollOffset, behavior: 'instant' });
            setActiveCardIndex(1); // Reset to index 1
          }
        }
      }, 300);
    }
  }, [isMobile, activeTab]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!isMobile) return;
    const container = e.currentTarget;
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    
    let closestIndex = 1;
    let minDistance = Infinity;
    
    const children = container.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLElement;
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    
    if (closestIndex !== activeCardIndex && closestIndex >= 0 && closestIndex < activeCategory.plans.length) {
      setActiveCardIndex(closestIndex);
    }
  };

  const currentCountry = COUNTRIES.find(c => c.code === selectedCountry) || COUNTRIES[0];
  const activeCategory = PRICING_CATEGORIES.find(cat => cat.id === activeTab) || PRICING_CATEGORIES[0];

  const formatPrice = (usdPrice: number) => {
    const converted = usdPrice * currentCountry.rate;
    // For SA and AE (Saudi Riyal and AED), round to clean multiples of 5 to make it look premium and real-world
    if (currentCountry.code === 'SA' || currentCountry.code === 'AE') {
      return Math.round(converted / 5) * 5;
    }
    return Math.round(converted);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const cardVariants = (isPopular: boolean) => ({
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring' as const, stiffness: 100, damping: 16 } 
    }
  });

  return (
    <section id="pricing" className="py-16 sm:py-20 md:py-24 bg-slate-50/40 relative overflow-hidden text-[#0B3951]">
      {/* Premium subtle backgrounds */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#1C8DC8]/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-12 left-12 w-[500px] h-[500px] bg-[#146299]/3 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        {/* Upper Badge & Titles */}
        <div className="max-w-3xl mx-auto mb-14 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-sky-50 border border-sky-100 px-4 py-1.5 rounded-full"
          >
            <Sparkles className="text-[#1C8DC8] w-4 h-4" />
            <span className="text-[11px] font-bold text-[#146299] uppercase tracking-widest font-mono">
              Premium 1-on-1 Classes
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-[900] text-3xl sm:text-[45px] lg:text-[52px] text-[#0B3951] tracking-tight leading-[1.1]"
          >
            Flexible Monthly Plans
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans font-medium text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed pt-1"
          >
            Convert tuition instantly to your country's currency. No hidden fees or contracts.
          </motion.p>
        </div>

        {/* Currency & Country Selector Dropdown */}
        <div className="relative inline-block text-left mb-12 z-40">
          <div className="flex items-center space-x-2.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
              <Globe size={13} className="text-[#1C8DC8]" />
              <span>Select Region:</span>
            </span>
            <div className="relative">
              <button
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                  setCountrySearchQuery('');
                }}
                className="bg-white hover:bg-slate-50 text-[#0B3951] font-display font-black text-xs uppercase tracking-widest px-4.5 py-2.5 rounded-2xl border border-sky-100 hover:border-[#1C8DC8]/30 shadow-sm flex items-center space-x-2 transition-all duration-200 cursor-pointer"
              >
                <span className="text-base">{currentCountry.flag}</span>
                <span>{currentCountry.name} ({currentCountry.symbol.trim()})</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => {
                      setIsDropdownOpen(false);
                      setCountrySearchQuery('');
                    }} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-white border border-sky-100 rounded-2xl shadow-xl py-2 z-50 overflow-hidden"
                    >
                      {/* Search box for country name or country code */}
                      <div className="px-3 pb-2 pt-1 border-b border-sky-50 mb-1">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search country or code..."
                            value={countrySearchQuery}
                            onChange={(e) => setCountrySearchQuery(e.target.value)}
                            className="w-full bg-[#F0F9FF] border border-[#E0F2FE] focus:border-[#1C8DC8] rounded-xl px-3 py-1.5 text-xs text-[#0B3951] outline-none transition-all placeholder:text-slate-400"
                            onClick={(e) => e.stopPropagation()}
                            autoFocus
                          />
                          {countrySearchQuery && (
                            <button 
                              onClick={() => setCountrySearchQuery('')}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1C8DC8] text-xs font-bold"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="max-h-52 overflow-y-auto">
                        {(() => {
                          const filtered = COUNTRIES.filter(c => 
                            c.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) || 
                            c.code.toLowerCase().includes(countrySearchQuery.toLowerCase())
                          );

                          if (filtered.length === 0) {
                            return (
                              <div className="text-center py-4 text-xs text-slate-400 font-medium font-sans">
                                No results found
                              </div>
                            );
                          }

                          return filtered.map((c) => (
                            <button
                              key={c.code}
                              onClick={() => {
                                setSelectedCountry(c.code);
                                setIsDropdownOpen(false);
                                setCountrySearchQuery('');
                              }}
                              className={`w-full text-left px-4 py-2.5 text-xs font-bold flex items-center space-x-3 transition-colors ${
                                selectedCountry === c.code 
                                  ? 'bg-[#F0F9FF] text-[#1C8DC8]' 
                                  : 'text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              <span className="text-lg">{c.flag}</span>
                              <span className="flex-1">{c.name}</span>
                              <span className="text-[10px] font-mono text-slate-400">{c.symbol}</span>
                            </button>
                          ));
                        })()}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Categories Tab Selector for Desktop */}
        <div className="hidden md:flex overflow-x-auto pb-3 mb-10 max-w-4xl mx-auto scrollbar-none gap-2 px-1 justify-start md:justify-center">
          {PRICING_CATEGORIES.map((category) => {
            const iconName = category.icon;
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center space-x-2 px-5 py-3.5 rounded-2xl font-display font-black text-xs uppercase tracking-widest transition-all duration-300 border shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0B3951] to-[#146299] text-white border-[#1C8DC8] shadow-[0_10px_25px_rgba(28,141,200,0.15)] scale-[1.02]'
                    : 'bg-white text-slate-600 border-sky-100 hover:border-[#1C8DC8]/40 hover:text-[#0B3951]'
                }`}
              >
                <span className={`material-symbols-outlined text-[16px] leading-none select-none ${isActive ? 'text-[#1C8DC8]' : 'text-slate-400'}`}>
                  {iconName}
                </span>
                <span>{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Course Dropdown (hidden on md and larger) */}
        <div className="block md:hidden mb-10 max-w-xs mx-auto text-left relative z-30">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1C8DC8] font-mono mb-2">
            Choose Course Program:
          </label>
          <div className="relative">
            <button
              onClick={() => setIsCourseDropdownOpen(!isCourseDropdownOpen)}
              className="w-full bg-white text-[#0B3951] font-display font-black text-xs uppercase tracking-widest px-4.5 py-3.5 rounded-2xl border border-sky-100 hover:border-[#1C8DC8]/30 shadow-sm flex items-center justify-between transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <span className="material-symbols-outlined text-[16px] leading-none select-none text-[#1C8DC8]">
                  {activeCategory.icon}
                </span>
                <span>{activeCategory.title}</span>
              </div>
              <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isCourseDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isCourseDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsCourseDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 mt-2 bg-white border border-sky-100 rounded-2xl shadow-xl py-2 z-50 overflow-hidden"
                  >
                    {PRICING_CATEGORIES.map((category) => {
                      const iconName = category.icon;
                      const isActive = activeTab === category.id;
                      return (
                        <button
                          key={category.id}
                          onClick={() => {
                            setActiveTab(category.id);
                            setIsCourseDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-xs font-bold flex items-center space-x-3 transition-colors ${
                            isActive 
                              ? 'bg-[#F0F9FF] text-[#1C8DC8]' 
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`material-symbols-outlined text-[16px] leading-none select-none ${isActive ? 'text-[#1C8DC8]' : 'text-slate-400'}`}>
                            {iconName}
                          </span>
                          <span className="flex-1">{category.title}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Selected Category Intro */}
        <div className="max-w-2xl mx-auto text-center mb-10 space-y-2">
          <h3 className="font-display font-extrabold text-lg text-[#0B3951]">
            {activeCategory.subtitle}
          </h3>
          <p className="font-sans font-medium text-xs sm:text-sm text-slate-500 leading-relaxed">
            {activeCategory.description}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory gap-5 md:gap-8 max-w-6xl mx-auto items-stretch scrollbar-none px-8 md:px-0 -mx-8 md:mx-0 pt-6 pb-6 md:pb-0"
          >
            {activeCategory.plans.map((plan, idx) => {
              const formattedPrice = formatPrice(plan.price);
              const formattedOriginal = plan.originalPrice ? formatPrice(plan.originalPrice) : null;
              
              const planDetailsString = `${plan.weeklyClasses} Days/Week - ${plan.classDuration} (${plan.classesPerMonth} Classes/Month) - ${currentCountry.symbol.trim()}${formattedPrice}/month`;

              const isActiveCard = !!plan.isPopular;

              return (
                <motion.div
                  key={plan.id}
                  variants={cardVariants(!!plan.isPopular)}
                  className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 border text-left snap-center shrink-0 w-[78vw] xs:w-[82vw] md:w-auto md:shrink md:snap-none ${
                    isActiveCard
                      ? 'bg-gradient-to-b from-[#0B3951] via-[#0E4A69] to-[#146299] text-white border-2 border-[#1C8DC8] shadow-[0_20px_45px_rgba(28,141,200,0.18)] z-20 scale-100 md:scale-[1.03]'
                      : 'bg-[#F0F9FF]/80 hover:bg-[#F0F9FF] text-[#0B3951] border-[#3D8DC3]/20 hover:border-[#1C8DC8]/30 shadow-[0_12px_30px_rgba(28,141,200,0.03)] z-10 scale-100 md:scale-100'
                  }`}
                >
                  {/* Popular Indicator */}
                  {plan.isPopular && (
                    <div className="absolute top-[-14px] left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#1C8DC8] to-[#3D8DC3] text-white text-[9px] uppercase tracking-widest font-display font-black px-4 py-1 rounded-full shadow-md flex items-center space-x-1 whitespace-nowrap">
                      <Star size={10} className="fill-current text-white" />
                      <span>RECOMMENDED</span>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Header Details */}
                    <div>
                      <h4 className="font-display font-[900] text-lg sm:text-xl tracking-tight uppercase">
                        {plan.name}
                      </h4>
                      <p className={`text-[10px] font-mono uppercase tracking-wider font-bold mt-1 transition-colors duration-500 ${isActiveCard ? 'text-sky-300' : 'text-[#1C8DC8]'}`}>
                        {plan.weeklyClasses} Days per week
                      </p>
                    </div>

                    {/* Pricing details */}
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl sm:text-4xl font-display font-[900] tracking-tight">
                        {currentCountry.symbol}{formattedPrice}
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider transition-colors duration-500 ${isActiveCard ? 'text-white/40' : 'text-slate-400'}`}>
                        / Month
                      </span>
                      {formattedOriginal && (
                        <span className={`text-xs sm:text-sm line-through font-mono font-bold ml-2 transition-colors duration-500 ${isActiveCard ? 'text-white/30' : 'text-slate-400/70'}`}>
                          {currentCountry.symbol}{formattedOriginal}
                        </span>
                      )}
                    </div>

                    <div className={`text-[11px] font-medium leading-relaxed rounded-xl p-3 border transition-colors duration-500 ${
                      isActiveCard 
                        ? 'bg-[#146299]/35 border-[#1C8DC8]/20 text-slate-200' 
                        : 'bg-sky-50/50 border-sky-100 text-slate-600'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span>Class Duration:</span>
                        <strong className="font-bold">{plan.classDuration}</strong>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span>Classes Per Month:</span>
                        <strong className="font-bold">{plan.classesPerMonth} Classes</strong>
                      </div>
                    </div>

                    <hr className={`border-t transition-colors duration-500 ${isActiveCard ? 'border-white/10' : 'border-sky-100'}`} />

                    {/* Features list */}
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5">
                          <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 border mt-0.5 transition-colors duration-500 ${
                            isActiveCard
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : 'bg-sky-50 text-[#1C8DC8] border-sky-100'
                          }`}>
                            <Check size={10} className="stroke-[3]" />
                          </div>
                          <span className={`text-[11.5px] font-semibold leading-snug transition-colors duration-500 ${isActiveCard ? 'text-slate-200' : 'text-slate-600'}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking CTA */}
                  <div className="pt-8 mt-auto">
                    <button
                      onClick={() => handleBookTrial(plan.name, planDetailsString)}
                      className={`w-full py-3.5 px-4 font-display font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center space-x-1.5 ${
                        isActiveCard
                          ? 'bg-gradient-to-r from-[#1C8DC8] via-[#3D8DC3] to-[#146299] hover:from-[#146299] hover:to-[#1C8DC8] text-white hover:scale-[1.01] shadow-[0_12px_30px_rgba(28,141,200,0.35)] border-0'
                          : 'bg-[#0B3951] hover:bg-[#1C8DC8] text-white hover:scale-[1.01] shadow-sm hover:shadow-md'
                      }`}
                    >
                      <span>Book Free Trial</span>
                      <Sparkles size={12} className={isActiveCard ? 'text-white animate-pulse' : 'text-current'} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Custom Pricing Calculator Widget */}
        {(() => {
          const COURSE_INFO = {
            nazra: { label: 'Quran Nazra & Qaida', multiplier: 1.0 },
            memorization: { label: 'Quran Memorization (Hifz)', multiplier: 1.4 },
            'islamic-essentials': { label: 'Islamic Essentials', multiplier: 1.2 },
            'quranic-arabic': { label: 'Quranic Arabic', multiplier: 1.3 },
            'revision-partner': { label: 'Revision Partner', multiplier: 1.2 },
          };
          const hasWeekend = selectedDaysList.includes('Saturday') || selectedDaysList.includes('Sunday');
          const weekendFee = hasWeekend ? 20 : 0;
          const courseData = COURSE_INFO[selectedCourse as keyof typeof COURSE_INFO] || COURSE_INFO.nazra;
          const basePrice = (customDays === 1 ? 22 : customDays === 2 ? 35 : customDays === 3 ? 50 : customDays === 4 ? 62 : customDays === 5 ? 70 : customDays === 6 ? 82 : 92);
          const durationMultiplier = customDuration === '20-25 Minutes' ? 1.0 : customDuration === '30 Minutes' ? 1.25 : 1.6;
          const customPriceUsd = Math.round(basePrice * durationMultiplier * courseData.multiplier) + weekendFee;
          const customPriceConverted = formatPrice(customPriceUsd);

          return (
            <motion.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-24 max-w-4xl mx-auto bg-gradient-to-br from-[#0B3951] to-[#0E4A69] text-white rounded-[32px] p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl border border-sky-900/40 text-left"
            >
              {/* Subtle glow accents */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#1C8DC8]/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1C8DC8]/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Col: Description & Selectors */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="inline-flex items-center space-x-1.5 text-[9px] bg-[#1C8DC8]/20 text-[#1C8DC8] px-3.5 py-1 rounded-full font-bold uppercase tracking-widest font-mono border border-[#1C8DC8]/20">
                      <Sparkles size={10} className="text-[#1C8DC8] animate-pulse" />
                      <span>Interactive Planner</span>
                    </span>
                    <h3 className="font-display font-[900] text-2xl sm:text-3xl text-white tracking-tight mt-3">
                      Design Your Custom Plan
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-sans font-medium">
                      Can't find a preset schedule that fits your routine? Use our dynamic estimator to design a program tailored exactly to your weekly availability, courses, and preferred days.
                    </p>
                  </div>

                  {/* Selector 1: Choose Course */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1C8DC8] font-mono">
                      Select Program Course
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(COURSE_INFO).map(([key, info]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedCourse(key)}
                          className={`px-3.5 py-2.5 rounded-xl font-display font-black text-[10px] uppercase tracking-wider cursor-pointer transition-all border ${
                            selectedCourse === key
                              ? 'bg-gradient-to-r from-[#1C8DC8] to-[#3D8DC3] text-white border-0 shadow-lg scale-[1.02]'
                              : 'bg-slate-900/55 text-slate-300 border-slate-800 hover:border-[#1C8DC8]/30 hover:text-white'
                          }`}
                        >
                          {info.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selector 2: Weekly Days count */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1C8DC8] font-mono">
                      Classes per week: {customDays} {customDays === 1 ? 'Day' : 'Days'}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => {
                            setCustomDays(d);
                            setSelectedDaysList(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].slice(0, d));
                          }}
                          className={`w-10 h-10 rounded-xl font-display font-black text-xs cursor-pointer transition-all border ${
                            customDays === d
                              ? 'bg-gradient-to-r from-[#1C8DC8] to-[#3D8DC3] text-white border-0 shadow-lg'
                              : 'bg-slate-900/55 text-slate-300 border-slate-800 hover:border-[#1C8DC8]/30 hover:text-white'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selector 3: Specific Weekdays */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1C8DC8] font-mono">
                      Select Specific Weekdays ({selectedDaysList.length} of {customDays} selected)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                        const isSelected = selectedDaysList.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => {
                              let updated: string[];
                              if (isSelected) {
                                if (selectedDaysList.length > 1) {
                                  updated = selectedDaysList.filter(d => d !== day);
                                  setSelectedDaysList(updated);
                                  setCustomDays(updated.length);
                                }
                              } else {
                                if (selectedDaysList.length < customDays) {
                                  updated = [...selectedDaysList, day];
                                  setSelectedDaysList(updated);
                                } else {
                                  updated = [...selectedDaysList.slice(1), day];
                                  setSelectedDaysList(updated);
                                }
                              }
                            }}
                            className={`px-3 py-2 rounded-xl text-[10px] font-display font-black uppercase tracking-wider cursor-pointer transition-all border ${
                              isSelected
                                ? 'bg-[#1C8DC8] text-white border-[#1C8DC8] shadow-md'
                                : 'bg-slate-900/55 text-slate-300 border-slate-800 hover:border-[#1C8DC8]/30 hover:text-white'
                            }`}
                          >
                            {day.slice(0, 3)}
                          </button>
                        );
                      })}
                    </div>
                    {hasWeekend && (
                      <div className="mt-3.5 inline-flex items-center space-x-2 bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-2 rounded-xl text-[10.5px] font-mono font-bold uppercase tracking-wider">
                        <i className="fa-solid fa-circle-exclamation text-rose-400 animate-pulse"></i>
                        <span>Weekend Selected (Sat/Sun): +$20 Offday Fee Included</span>
                      </div>
                    )}
                  </div>

                  {/* Selector 4: Class Duration */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1C8DC8] font-mono">
                      Session Duration
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['20-25 Minutes', '30 Minutes', '45 Minutes'].map((dur) => (
                        <button
                          key={dur}
                          type="button"
                          onClick={() => setCustomDuration(dur)}
                          className={`px-4 py-2.5 rounded-xl font-display font-black text-[10px] uppercase tracking-wider cursor-pointer transition-all border ${
                            customDuration === dur
                              ? 'bg-gradient-to-r from-[#1C8DC8] to-[#3D8DC3] text-white border-0 shadow-lg'
                              : 'bg-slate-900/55 text-slate-300 border-slate-800 hover:border-[#1C8DC8]/30 hover:text-white'
                          }`}
                        >
                          {dur}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Col: Instant Quote Card */}
                <div className="lg:col-span-5 bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-800/80 flex flex-col justify-between text-center relative min-h-[340px]">
                  <div className="absolute top-[-10px] right-4 bg-[#1C8DC8] text-white font-display font-black text-[8px] uppercase tracking-widest px-3 py-0.5 rounded-full shadow-md">
                    DYNAMIC ESTIMATE
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">Suggested Fee</span>
                    <div className="flex items-baseline justify-center space-x-1.5">
                      <span className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight">
                        {currentCountry.symbol}{customPriceConverted}
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-400 uppercase">/ Month</span>
                    </div>
                    <p className="text-[10.5px] text-slate-400 font-semibold leading-relaxed font-sans">
                      Includes {customDays * 4} classes a month of {customDuration} sessions with certified scholars.
                    </p>
                  </div>

                  <div className="border-t border-slate-800/80 my-5 pt-4 flex flex-col gap-1.5 text-left text-[11px] text-slate-300 font-medium font-mono">
                    <div className="flex justify-between">
                      <span>Course selected:</span>
                      <span className="text-white font-bold text-right max-w-[150px] truncate">{courseData.label}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Schedule:</span>
                      <span className="text-white font-bold text-right max-w-[150px] truncate">{selectedDaysList.join(', ')}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Frequency:</span>
                      <span className="text-white font-bold">{customDays} Days/Week</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Duration:</span>
                      <span className="text-white font-bold">{customDuration}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const details = `Custom: ${courseData.label} - ${customDays} Days/Week (${selectedDaysList.join(', ')}) - ${customDuration} (${customDays * 4} Classes/Month) - ${currentCountry.symbol}${customPriceConverted}/month`;
                      handleBookTrial('Custom Plan', details);
                    }}
                    className="w-full bg-gradient-to-r from-[#1C8DC8] to-[#3D8DC3] hover:from-[#3D8DC3] hover:to-[#1C8DC8] text-white font-display font-black text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all hover:scale-[1.01] shadow-lg shadow-[#1C8DC8]/10 cursor-pointer border-0"
                  >
                    Book Custom Trial
                  </button>
                </div>

              </div>
            </motion.div>
          );
        })()}
      </div>
    </section>
  );
}
