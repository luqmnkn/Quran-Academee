'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Clock, Send, ShieldCheck, Calendar, Sparkles, ChevronDown } from 'lucide-react';
import { ALL_COUNTRIES } from '@/utils/countries';
import { trackLeadSubmission } from '@/utils/gtm';

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
  submit?: string;
}

interface InquiryFormProps {
  prefilledPlan?: string;
  prefilledCourse?: string;
  prefilledDetails?: string;
  onClearPrefill?: () => void;
  isModalMode?: boolean;
  onSubmitSuccess?: () => void;
}

export default function InquiryForm({
  prefilledPlan,
  prefilledCourse,
  prefilledDetails,
  onClearPrefill,
  isModalMode = false,
  onSubmitSuccess
}: InquiryFormProps) {
  // Form input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [country, setCountry] = useState('United States');
  const [courseInterest, setCourseInterest] = useState('noorani-qaida');
  const [message, setMessage] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');

  // Helper to determine the locked selection prefix
  const getLockedPrefix = () => {
    if (prefilledDetails) return `[Selected Custom Plan: ${prefilledDetails}]\n`;
    if (prefilledPlan) return `[Selected Plan: ${prefilledPlan}]\n`;
    if (prefilledCourse) return `[Selected Course: ${prefilledCourse}]\n`;
    return '';
  };

  // Sync prefilled course when it changes
  useEffect(() => {
    if (prefilledCourse) {
      const courseValues = ['noorani-qaida', 'quran-reading', 'tajweed', 'memorization', 'islamic-essentials', 'hifz-revision'];
      const matched = courseValues.find(
        (val) =>
          val.toLowerCase() === prefilledCourse.toLowerCase() ||
          prefilledCourse.toLowerCase().includes(val.toLowerCase()) ||
          (val === 'noorani-qaida' && prefilledCourse.toLowerCase().includes('qaida')) ||
          (val === 'noorani-qaida' && prefilledCourse.toLowerCase().includes('almadania'))
      );
      if (matched) {
        setCourseInterest(matched);
      }
    }
  }, [prefilledCourse]);

  // Sync prefixes into message when prefilled data changes
  useEffect(() => {
    const prefix = getLockedPrefix();
    if (prefix) {
      setMessage((prev) => {
        const cleanPrev = prev.replace(/^\[Selected.*\]\n/, '');
        return prefix + cleanPrev;
      });
    }
  }, [prefilledCourse, prefilledPlan, prefilledDetails]);

  // Auto-detect country via IP lookup and fall back gracefully
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch('/api/geolocation');
        if (res.ok) {
          const data = await res.json();
          if (data && (data.country_code || data.country_name)) {
            const matched = ALL_COUNTRIES.find(
              c =>
                (data.country_code && c.code.toUpperCase() === data.country_code.toUpperCase()) ||
                (data.country_name && c.name.toLowerCase() === data.country_name.toLowerCase())
            );
            if (matched) {
              setCountry(matched.name);
              setCountryCode(matched.dial);
            }
          }
        }
      } catch (err) {
        console.error('Failed to auto-detect country:', err);
      }
    };
    detectCountry();
  }, []);

  // Honeypot anti-spam fields
  const [website, setWebsite] = useState('');
  const [botField, setBotField] = useState('');

  // Status & Validation states
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errors, setErrors] = useState<FormErrors>({});

  const isPlanPrefilled = Boolean(prefilledPlan);

  // Client-side validation helper
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!phone.trim()) {
      newErrors.phone = 'WhatsApp contact number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (website || botField) {
      setStatus('success');
      return;
    }

    if (!validateForm()) return;

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phone: `${countryCode}${phone}`,
          country,
          courseInterest,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Submission failed');
      }
      
      trackLeadSubmission({
        fullName,
        email,
        phone: `${countryCode}${phone}`,
        country,
        courseInterest,
        message,
        plan: prefilledPlan || '',
      });

      setStatus('success');
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      if (onClearPrefill) {
        onClearPrefill();
      }
    } catch (err: any) {
      setErrors({ submit: err.message || 'Something went wrong. Please try submitting again.' });
      setStatus('idle');
    }
  };

  const handleMessageChange = (val: string) => {
    const prefix = getLockedPrefix();
    if (prefix) {
      if (!val.startsWith(prefix)) {
        if (val.length < prefix.length) {
          setMessage(prefix);
        } else {
          const suffix = val.slice(prefix.length);
          setMessage(prefix + suffix);
        }
      } else {
        setMessage(val);
      }
    } else {
      setMessage(val);
    }
  };

  const renderFormContent = () => (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="py-10 text-center space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-[#F0F9FF] text-[#1C8DC8] border-2 border-[#1C8DC8]/30 flex items-center justify-center mx-auto shadow-sm">
            <Check size={28} className="stroke-[3]" />
          </div>
          <h3 className="font-display font-[900] text-xl text-[#0B3951]">
            Trial Lesson Booked!
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Alhamdulillah. Your free slots have been registered in our scheduling coordinator board. Check your WhatsApp notifications shortly.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="bg-[#F0F9FF] hover:bg-white border border-[#E0F2FE] text-slate-700 font-extrabold text-[10px] uppercase tracking-widest py-2.5 px-5 rounded-xl cursor-pointer"
          >
            Request Another Slot
          </button>
        </motion.div>
      ) : (
        <div className="w-full flex flex-col justify-start text-left md:items-center">
          {isModalMode && (
            <div className="text-center mb-6 w-full">
              <span className="inline-flex items-center space-x-1.5 bg-[#1C8DC8]/10 text-[#1C8DC8] px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider">
                <Sparkles size={10} className="animate-pulse" />
                <span>3-Day Free Trial</span>
              </span>
              <h3 className="font-display font-[900] text-xl sm:text-2xl text-[#0B3951] mt-2">
                Schedule Free Trial Class
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                Experience personalized 1-on-1 learning with zero obligation.
              </p>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4 w-full text-left">
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg flex items-center space-x-2 font-semibold">
                <AlertCircle size={14} className="shrink-0 animate-pulse" />
                <span>{errors.submit}</span>
              </div>
            )}

          {/* Honeypot fields */}
          <div className="absolute opacity-0 -z-50 h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
            <input
              type="text"
              name="botField"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          
          {/* Full Name Input */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B3951] mb-1">
              Full Name / Parent Name
            </label>
            <input
              type="text"
              placeholder="e.g. Salim Al-Mansoor"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errors.fullName) {
                  setErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.fullName;
                    return updated;
                  });
                }
              }}
              className={`w-full bg-[#F0F9FF] border ${
                errors.fullName ? 'border-red-500' : 'border-[#E0F2FE] focus:border-[#1C8DC8]'
              } rounded-lg px-3 py-2 text-xs text-[#0B3951] outline-none transition-all placeholder-gray-400`}
            />
            {errors.fullName && (
              <p className="text-[10px] text-red-500 mt-1 flex items-center space-x-1 font-semibold">
                <AlertCircle size={11} />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* Email & WhatsApp Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B3951] mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. salim@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => {
                      const updated = { ...prev };
                      delete updated.email;
                      return updated;
                    });
                  }
                }}
                className={`w-full bg-[#F0F9FF] border ${
                  errors.email ? 'border-red-500' : 'border-[#E0F2FE] focus:border-[#1C8DC8]'
                } rounded-lg px-3 py-2 text-xs text-[#0B3951] outline-none transition-all placeholder-gray-400`}
              />
              {errors.email && (
                <p className="text-[10px] text-red-500 mt-1 flex items-center space-x-1 font-semibold">
                  <AlertCircle size={11} />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B3951] mb-1">
                WhatsApp Contact Number
              </label>
              <div className={`flex rounded-lg bg-[#F0F9FF] border ${
                errors.phone ? 'border-red-500' : 'border-[#E0F2FE] focus-within:border-[#1C8DC8]'
              } overflow-hidden transition-all duration-200`}>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-transparent text-[11px] text-[#0B3951] py-2 pl-2 pr-1 outline-none border-r border-[#E0F2FE] cursor-pointer min-w-[68px]"
                >
                  {ALL_COUNTRIES.map((c) => (
                    <option key={`${c.code}-mcode-main`} value={c.dial}>
                      {c.flag} {c.dial}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder="315 555-0100"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) {
                      setErrors((prev) => {
                        const updated = { ...prev };
                        delete updated.phone;
                        return updated;
                      });
                    }
                  }}
                  className="w-full bg-transparent px-3 py-2 text-xs text-[#0B3951] outline-none placeholder-gray-400"
                />
              </div>
              {errors.phone && (
                <p className="text-[10px] text-red-500 mt-1 flex items-center space-x-1 font-semibold">
                  <AlertCircle size={11} />
                  <span>{errors.phone}</span>
                </p>
              )}
            </div>
          </div>

          {/* Country & Course Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="relative">
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B3951] mb-1">
                Country of Residence
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsCountryDropdownOpen(!isCountryDropdownOpen);
                  setCountrySearchQuery('');
                }}
                className="w-full bg-[#F0F9FF] border border-[#E0F2FE] focus:border-[#1C8DC8] rounded-lg px-3 py-2 text-xs text-[#0B3951] outline-none transition-all cursor-pointer text-left flex items-center justify-between"
              >
                <span className="flex items-center space-x-2">
                  <span>{ALL_COUNTRIES.find(c => c.name === country)?.flag || '🏳️'}</span>
                  <span>{country}</span>
                </span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCountryDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => {
                    setIsCountryDropdownOpen(false);
                    setCountrySearchQuery('');
                  }} />
                  <div className="absolute left-0 mt-1 w-full bg-white border border-[#E0F2FE] rounded-lg shadow-xl py-2 z-50 overflow-hidden text-left">
                    <div className="px-3 pb-2 pt-1 border-b border-sky-50 mb-1">
                      <input
                        type="text"
                        placeholder="Search country..."
                        value={countrySearchQuery}
                        onChange={(e) => setCountrySearchQuery(e.target.value)}
                        className="w-full bg-[#F0F9FF] border border-[#E0F2FE] focus:border-[#1C8DC8] rounded-lg px-3 py-1.5 text-xs text-[#0B3951] outline-none transition-all placeholder:text-slate-400"
                        onClick={(e) => e.stopPropagation()}
                        autoFocus
                      />
                    </div>

                    <div className="max-h-48 overflow-y-auto">
                      {(() => {
                        const filtered = ALL_COUNTRIES.filter(c => 
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
                            type="button"
                            key={`${c.code}-inquiry-search`}
                            onClick={() => {
                              setCountry(c.name);
                              setCountryCode(c.dial);
                              setIsCountryDropdownOpen(false);
                              setCountrySearchQuery('');
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                              country === c.name 
                                ? 'bg-[#F0F9FF] text-[#1C8DC8]' 
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <span className="flex items-center space-x-2">
                              <span>{c.flag}</span>
                              <span>{c.name}</span>
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{c.dial}</span>
                          </button>
                        ));
                      })()}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B3951] mb-1">
                Select Quran Course
              </label>
              <select
                value={courseInterest}
                onChange={(e) => setCourseInterest(e.target.value)}
                disabled={Boolean(prefilledCourse)}
                className={`w-full border rounded-lg px-3 py-2 text-xs outline-none transition-all cursor-pointer ${
                  prefilledCourse
                    ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
                    : 'bg-[#F0F9FF] text-[#0B3951] border-[#E0F2FE] focus:border-[#1C8DC8]'
                }`}
              >
                <option value="noorani-qaida">Alqaida Almadania Basics</option>
                <option value="quran-reading">Quran Recitation & Reading</option>
                <option value="tajweed">Tajweed al Quran</option>
                <option value="memorization">Quran Memorization (Hifz)</option>
                <option value="islamic-essentials">Islamic Essentials & Duas</option>
                <option value="hifz-revision">Hifz Revision Partner</option>
              </select>
            </div>
          </div>

          {/* Requirements / Notes Area */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B3951] mb-1">
              Your Requirements / Student's Age and level
            </label>
            <textarea
              rows={2}
              placeholder="Specify learner details, age, preferred teacher gender (male/female)..."
              value={message}
              onChange={(e) => {
                handleMessageChange(e.target.value);
                if (errors.message) {
                  setErrors((prev) => {
                    const updated = { ...prev };
                    delete updated.message;
                    return updated;
                  });
                }
              }}
              className={`w-full bg-[#F0F9FF] border ${
                errors.message ? 'border-red-500' : 'border-[#E0F2FE] focus:border-[#1C8DC8]'
              } rounded-lg px-3 py-2 text-xs text-[#0B3951] outline-none transition-all resize-y min-h-[80px] placeholder-gray-400`}
            ></textarea>
            {(prefilledCourse || prefilledPlan || prefilledDetails) && (
              <span className="text-[10px] text-[#146299] font-bold uppercase tracking-wider mt-1 block">
                🔒 Selected selection details are prefilled and locked
              </span>
            )}
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full h-11 sm:h-12 bg-gradient-to-r from-[#1C8DC8] to-[#3D8DC3] hover:scale-[1.01] text-white font-display font-extrabold rounded-xl uppercase tracking-wider text-[10px] sm:text-xs px-4 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-sky-500/15"
          >
            {status === 'submitting' ? (
              <>
                <Clock size={14} className="animate-spin" />
                <span>Arranging Class Slots...</span>
              </>
            ) : (
              <>
                <Send size={14} className="stroke-[2.5]" />
                <span>Securely Book 3-Day Free Trial</span>
              </>
            )}
          </button>

          </form>
        </div>
      )}
    </AnimatePresence>
  );

  if (isModalMode) {
    return renderFormContent();
  }

  return (
    <section id="contact" className="w-full h-screen max-h-screen py-4 lg:py-6 bg-slate-50 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center w-full max-h-full">
          
          {/* Left Column: Context / Value Proposition */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-[#0B3951] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 text-sky-200 border border-white/15 px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider">
                <Sparkles size={12} className="text-sky-300" />
                <span>3-Day Free Trial</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white leading-tight">
                Start Your Quran Learning Journey Today
              </h2>

              {/* HIDDEN ON MOBILE */}
              <p className="hidden lg:block text-xs sm:text-sm text-slate-300 leading-relaxed">
                Experience personalized 1-on-1 Quran classes with qualified male and female tutors. Book your free 3-day trial session with zero obligation.
              </p>

              {/* HIDDEN ON MOBILE */}
              <div className="hidden lg:block space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="p-1.5 bg-sky-500/20 rounded-lg text-sky-300 shrink-0 mt-0.5">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Flexible Scheduling</h4>
                    <p className="text-[11px] text-slate-300">Choose times that perfectly fit your daily schedule.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-1.5 bg-sky-500/20 rounded-lg text-sky-300 shrink-0 mt-0.5">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Certified Tutors</h4>
                    <p className="text-[11px] text-slate-300">Learn from experienced, vetted Sanad-certified scholars.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* HIDDEN ON MOBILE */}
            <div className="hidden lg:block border-t border-white/10 pt-4 mt-2">
              <p className="text-[11px] text-slate-400">
                Have urgent queries? Contact scheduling directly on WhatsApp for immediate support.
              </p>
            </div>
          </div>

          {/* Right Column: Compact 100vh Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl border border-[#E0F2FE] p-4 sm:p-6 shadow-xl flex flex-col justify-center">
            {renderFormContent()}
          </div>

        </div>
      </div>
    </section>
  );
}