import React, { useState } from 'react';
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
  icon: any;
  description: string;
  plans: Plan[];
}

const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: 'nazra',
    title: 'Quran Nazra & Qaida',
    subtitle: 'Qaida, Nazra, Duas & Basic Tajweed',
    icon: BookOpen,
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
          'Noorani Qaida & Basic Reading',
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
    icon: Award,
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
    icon: Compass,
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
    icon: BookOpen,
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
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [activeTab, setActiveTab] = useState('nazra');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    hidden: { opacity: 0, y: 30, scale: isPopular ? 0.98 : 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: isPopular ? 1.02 : 1, 
      transition: { type: 'spring', stiffness: 100, damping: 16 } 
    }
  });

  return (
    <section id="pricing" className="py-[110px] md:py-[150px] bg-slate-50/40 relative overflow-hidden text-[#0B3951]">
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
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-white hover:bg-slate-50 text-[#0B3951] font-display font-black text-xs uppercase tracking-widest px-4.5 py-2.5 rounded-2xl border border-sky-100 hover:border-[#1C8DC8]/30 shadow-sm flex items-center space-x-2 transition-all duration-200 cursor-pointer"
              >
                <span className="text-base">{currentCountry.flag}</span>
                <span>{currentCountry.name} ({currentCountry.symbol.trim()})</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-white border border-sky-100 rounded-2xl shadow-xl py-2 z-50 overflow-hidden"
                    >
                      {COUNTRIES.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => {
                            setSelectedCountry(c.code);
                            setIsDropdownOpen(false);
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
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex overflow-x-auto pb-3 mb-10 max-w-4xl mx-auto scrollbar-none gap-2 px-1 justify-start md:justify-center">
          {PRICING_CATEGORIES.map((category) => {
            const Icon = category.icon;
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
                <Icon size={14} className={isActive ? 'text-[#1C8DC8]' : 'text-slate-400'} />
                <span>{category.title}</span>
              </button>
            );
          })}
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
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch"
          >
            {activeCategory.plans.map((plan) => {
              const formattedPrice = formatPrice(plan.price);
              const formattedOriginal = plan.originalPrice ? formatPrice(plan.originalPrice) : null;
              
              const planDetailsString = `${plan.weeklyClasses} Days/Week - ${plan.classDuration} (${plan.classesPerMonth} Classes/Month) - ${currentCountry.symbol.trim()}${formattedPrice}/month`;

              return (
                <motion.div
                  key={plan.id}
                  variants={cardVariants(!!plan.isPopular)}
                  className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 border text-left ${
                    plan.isPopular
                      ? 'bg-gradient-to-b from-[#0B3951] via-[#0E4A69] to-[#146299] text-white border-2 border-[#1C8DC8] shadow-[0_20px_45px_rgba(28,141,200,0.18)] z-20 md:scale-[1.03]'
                      : 'bg-white text-[#0B3951] border-sky-100 hover:border-[#1C8DC8]/30 shadow-[0_12px_30px_rgba(28,141,200,0.03)] z-10'
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
                      <p className={`text-[10px] font-mono uppercase tracking-wider font-bold mt-1 ${plan.isPopular ? 'text-sky-300' : 'text-[#1C8DC8]'}`}>
                        {plan.weeklyClasses} Days per week
                      </p>
                    </div>

                    {/* Pricing details */}
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl sm:text-4xl font-display font-[900] tracking-tight">
                        {currentCountry.symbol}{formattedPrice}
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${plan.isPopular ? 'text-white/40' : 'text-slate-400'}`}>
                        / Month
                      </span>
                      {formattedOriginal && (
                        <span className={`text-xs sm:text-sm line-through font-mono font-bold ml-2 ${plan.isPopular ? 'text-white/30' : 'text-slate-400/70'}`}>
                          {currentCountry.symbol}{formattedOriginal}
                        </span>
                      )}
                    </div>

                    <div className={`text-[11px] font-medium leading-relaxed rounded-xl p-3 border ${
                      plan.isPopular 
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

                    <hr className={`border-t ${plan.isPopular ? 'border-white/10' : 'border-sky-100'}`} />

                    {/* Features list */}
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5">
                          <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 border mt-0.5 ${
                            plan.isPopular
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : 'bg-sky-50 text-[#1C8DC8] border-sky-100'
                          }`}>
                            <Check size={10} className="stroke-[3]" />
                          </div>
                          <span className={`text-[11.5px] font-semibold leading-snug ${plan.isPopular ? 'text-slate-200' : 'text-slate-600'}`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Booking CTA */}
                  <div className="pt-8 mt-auto">
                    <button
                      onClick={() => onBookTrial(plan.name, planDetailsString)}
                      className={`w-full py-3.5 px-4 font-display font-black text-xs uppercase tracking-widest rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center space-x-1.5 ${
                        plan.isPopular
                          ? 'bg-gradient-to-r from-[#1C8DC8] via-[#3D8DC3] to-[#146299] hover:from-[#146299] hover:to-[#1C8DC8] text-white hover:scale-[1.01] shadow-[0_12px_30px_rgba(28,141,200,0.35)] border-0'
                          : 'bg-[#0B3951] hover:bg-[#1C8DC8] text-white hover:scale-[1.01] shadow-sm hover:shadow-md'
                      }`}
                    >
                      <span>Book Free Trial</span>
                      <Sparkles size={12} className={plan.isPopular ? 'text-white animate-pulse' : 'text-current'} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
