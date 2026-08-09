'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, Clock, Send, ShieldCheck, Calendar, Sparkles } from 'lucide-react';
import { ALL_COUNTRIES } from '@/utils/countries';
import { trackLeadSubmission } from '@/utils/gtm'; // Adjust path if your GTM utility is located elsewhere

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
  onClearPrefill?: () => void;
  isModalMode?: boolean;
  onSubmitSuccess?: () => void;
}

export default function InquiryForm({
  prefilledPlan,
  prefilledCourse,
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
  const [message, setMessage] = useState(
    prefilledPlan ? `Interested in Plan: ${prefilledPlan}` : ''
  );

  // Sync prefilled course when it changes
  useEffect(() => {
    if (prefilledCourse) {
      const courseValues = ['noorani-qaida', 'quran-reading', 'tajweed', 'memorization'];
      const matched = courseValues.find(
        (val) =>
          val.toLowerCase() === prefilledCourse.toLowerCase() ||
          prefilledCourse.toLowerCase().includes(val.toLowerCase())
      );
      if (matched) {
        setCourseInterest(matched);
      }
    }
  }, [prefilledCourse]);

  // Sync prefilled plan into message when it changes
  useEffect(() => {
    if (prefilledPlan) {
      setMessage(`Interested in Plan: ${prefilledPlan}`);
    }
  }, [prefilledPlan]);

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

    // Silent fail/drop for bot submission
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
      
      // Fire GTM DataLayer Event
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

  return (
    <section id="contact" className="w-full py-12 lg:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Context / Value Proposition */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-[#0B3951] text-white rounded-[1.75rem] sm:rounded-[32px] p-6 sm:p-10 shadow-xl">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/10 text-sky-200 border border-white/15 rounded-full px-4 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider">
                <Sparkles size={14} className="text-sky-300" />
                <span>3-Day Free Trial</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
                Start Your Quran Learning Journey Today
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Experience personalized 1-on-1 Quran classes with qualified male and female tutors. Book your free 3-day trial session with zero obligation.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-sky-500/20 rounded-lg text-sky-300 shrink-0 mt-0.5">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Flexible Scheduling</h4>
                    <p className="text-xs text-slate-300">Choose times that perfectly fit your daily schedule.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-sky-500/20 rounded-lg text-sky-300 shrink-0 mt-0.5">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Certified Tutors</h4>
                    <p className="text-xs text-slate-300">Learn from experienced, vetted Sanad-certified scholars.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 mt-6">
              <p className="text-xs text-slate-400">
                Have urgent queries? Contact scheduling directly on WhatsApp for immediate support.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Submission Form */}
          <div className="lg:col-span-7 bg-white rounded-[1.75rem] sm:rounded-[32px] border border-[#E0F2FE] p-4 xs:p-6 sm:p-10 shadow-xl flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-20 text-center space-y-5"
                >
                  <div className="w-20 h-20 rounded-full bg-[#F0F9FF] text-[#1C8DC8] border-2 border-[#1C8DC8]/30 flex items-center justify-center mx-auto shadow-sm">
                    <Check size={36} className="stroke-[3]" />
                  </div>
                  <h3 className="font-display font-[900] text-2xl text-[#0B3951]">
                    Trial Lesson Booked!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Alhamdulillah. Your free slots have been registered in our scheduling coordinator board. Check your WhatsApp notifications — you will receive a direct setup message shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="bg-[#F0F9FF] hover:bg-white border border-[#E0F2FE] text-slate-700 font-extrabold text-xs uppercase tracking-widest py-3 px-6 rounded-xl cursor-pointer"
                  >
                    Request Another Slot
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {errors.submit && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex items-center space-x-2 font-semibold animate-in fade-in duration-200">
                      <AlertCircle size={16} className="shrink-0 animate-pulse" />
                      <span>{errors.submit}</span>
                    </div>
                  )}

                  {/* Honeypot fields for anti-spam bot protection */}
                  <div className="absolute opacity-0 -z-50 h-0 w-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      placeholder="Leave empty"
                    />
                    <input
                      type="text"
                      name="botField"
                      value={botField}
                      onChange={(e) => setBotField(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      placeholder="Do not fill"
                    />
                  </div>
                  
                  {/* Full name input */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#0B3951] mb-2.5">
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
                      } rounded-xl px-4 py-3.5 text-sm text-[#0B3951] outline-none transition-all placeholder-gray-400`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-2 flex items-center space-x-1 font-semibold">
                        <AlertCircle size={13} />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Grid of Double inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#0B3951] mb-2.5">
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
                        } rounded-xl px-4 py-3.5 text-sm text-[#0B3951] outline-none transition-all placeholder-gray-400`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-2 flex items-center space-x-1 font-semibold">
                          <AlertCircle size={13} />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#0B3951] mb-2.5">
                        WhatsApp Contact Number
                      </label>
                      <div className={`flex rounded-xl bg-[#F0F9FF] border ${
                        errors.phone ? 'border-red-500' : 'border-[#E0F2FE] focus-within:border-[#1C8DC8]'
                      } overflow-hidden transition-all duration-200`}>
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="bg-transparent text-xs text-[#0B3951] py-3.5 pl-3 pr-1 outline-none border-r border-[#E0F2FE] cursor-pointer min-w-[75px]"
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
                          className="w-full bg-transparent px-4 py-3.5 text-sm text-[#0B3951] outline-none placeholder-gray-400"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-xs text-red-500 mt-2 flex items-center space-x-1 font-semibold">
                          <AlertCircle size={13} />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Country / Course Interest Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Country Selection */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#0B3951] mb-2.5">
                        Country of Residence
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-[#F0F9FF] border border-[#E0F2FE] focus:border-[#1C8DC8] rounded-xl px-4 py-3.5 text-sm text-[#0B3951] outline-none transition-all cursor-pointer"
                      >
                        {ALL_COUNTRIES.map((c) => (
                          <option key={`${c.code}-mres-main`} value={c.name}>
                            {c.flag} {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Course selection */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#0B3951] mb-2.5">
                        Select Quran Course
                      </label>
                      <select
                        value={courseInterest}
                        onChange={(e) => setCourseInterest(e.target.value)}
                        className="w-full bg-[#F0F9FF] border border-[#E0F2FE] focus:border-[#1C8DC8] rounded-xl px-4 py-3.5 text-sm text-[#0B3951] outline-none transition-all cursor-pointer"
                      >
                        <option value="noorani-qaida">Noorani Qaida Basics</option>
                        <option value="quran-reading">Quran Recitation & Reading</option>
                        <option value="tajweed">Tajweed al Quran Rules</option>
                        <option value="memorization">Quran Memorization (Hifz)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message text area */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-widest text-[#0B3951] mb-2.5">
                      Your Requirements / Student's Age and level
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Specify learner details, age, preferred teacher gender (male/female), or convenient schedule bounds..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) {
                          setErrors((prev) => {
                            const updated = { ...prev };
                            delete updated.message;
                            return updated;
                          });
                        }
                      }}
                      readOnly={isPlanPrefilled}
                      className={`w-full border rounded-xl px-4 py-3.5 text-sm outline-none transition-all resize-none placeholder-gray-400 ${
                        isPlanPrefilled
                          ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed font-medium select-none shadow-inner'
                          : 'bg-[#F0F9FF] text-[#0B3951]'
                      } ${
                        errors.message ? 'border-red-500' : 'border-[#E0F2FE] focus:border-[#1C8DC8]'
                      }`}
                    ></textarea>
                    {isPlanPrefilled && (
                      <span className="text-[11px] text-[#146299] font-bold uppercase tracking-wider mt-2 flex items-center">
                        🔒 Selected Pricing Plan is locked
                      </span>
                    )}
                    {errors.message && (
                      <p className="text-xs text-red-500 mt-2 flex items-center space-x-1 font-semibold">
                        <AlertCircle size={13} />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full h-13 sm:h-15 bg-gradient-to-r from-[#1C8DC8] to-[#3D8DC3] hover:scale-[1.01] text-white font-display font-extrabold rounded-xl sm:rounded-2xl uppercase tracking-wider sm:tracking-widest text-[10px] sm:text-xs px-2.5 sm:px-6 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-lg shadow-sky-500/15"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Clock size={16} className="animate-spin" />
                        <span>Arranging Class Slots...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} className="stroke-[2.5]" />
                        <span>Securely Book 3-Day Free Trial</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-slate-400 leading-normal">
                    🛡️ Zero auto-spam policy. Your personal coordinates are encrypted securely.
                  </p>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}