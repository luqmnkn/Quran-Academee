import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InquirySubmission } from '../types';
import { Mail, Phone, Globe, MessageSquare, Check, AlertCircle, Trash2, Send, Clock, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';
import { trackLeadSubmission } from '../utils/gtm';
import { ALL_COUNTRIES } from '../utils/countries';

interface InquiryFormProps {
  prefilledCourse: string;
  onClearPrefill: () => void;
  onSubmitSuccess?: () => void;
  isModalMode?: boolean;
}

export default function InquiryForm({ prefilledCourse, onClearPrefill, onSubmitSuccess, isModalMode = false }: InquiryFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [country, setCountry] = useState('United States');
  const [courseInterest, setCourseInterest] = useState('noorani-qaida');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [botField, setBotField] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup pending requests on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const cleanAndFormatPhone = (code: string, num: string) => {
    let cleanedNum = num.replace(/[\s\-()]/g, '');
    if (cleanedNum.startsWith('+')) {
      return cleanedNum;
    }
    if (code && cleanedNum.startsWith('0')) {
      cleanedNum = cleanedNum.substring(1);
    }
    return code + cleanedNum;
  };

  const isPlanPrefilled = isModalMode && !!(prefilledCourse && prefilledCourse.toLowerCase().includes('plan'));

  // Sync Prefill Course Changes
  useEffect(() => {
    if (prefilledCourse) {
      if (prefilledCourse.toLowerCase().includes('qaida')) setCourseInterest('noorani-qaida');
      else if (prefilledCourse.toLowerCase().includes('reading') || prefilledCourse.toLowerCase().includes('recitation')) setCourseInterest('quran-reading');
      else if (prefilledCourse.toLowerCase().includes('tajweed')) setCourseInterest('tajweed');
      else if (prefilledCourse.toLowerCase().includes('memorization') || prefilledCourse.toLowerCase().includes('hifz')) setCourseInterest('memorization');
      
      if (prefilledCourse.toLowerCase().includes('plan')) {
        if (isModalMode) {
          setMessage(`Selected Pricing Plan: ${prefilledCourse}. I would like to book my free 3-day trial slots for this plan.`);
        }
      }
    }
  }, [prefilledCourse, isModalMode]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email address structure';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (phone.replace(/\D/g, '').length < 6) {
      newErrors.phone = 'Please specify a valid contact phone number';
    }
    if (!message.trim()) {
      newErrors.message = 'Please provide a small message about your class requirement';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Prevent double submission if already sending
    if (status === 'submitting') return;

    setStatus('submitting');
    if (errors.submit) {
      const updatedErrors = { ...errors };
      delete updatedErrors.submit;
      setErrors(updatedErrors);
    }

    // Cancel any previous pending submission
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const formattedPhone = cleanAndFormatPhone(countryCode, phone);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          fullName,
          email,
          phone: formattedPhone,
          country,
          courseInterest,
          message,
          website,
          botField,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        if (resData && resData.errors) {
          // Sync server validation errors with the UI
          setErrors(prev => ({
            ...prev,
            ...resData.errors,
          }));
          throw new Error(resData.message || 'Validation failed. Please correct the fields above.');
        } else {
          throw new Error(resData.message || 'Inquiry transmission failed. Please try again.');
        }
      }

      // Track successful lead submission in Google Tag Manager
      trackLeadSubmission({
        fullName,
        email,
        phone: formattedPhone,
        country,
        courseInterest,
        message,
        plan: prefilledCourse && prefilledCourse.toLowerCase().includes('plan') ? prefilledCourse : '',
      });

      setStatus('success');
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setWebsite('');
      setBotField('');
      onClearPrefill();
      
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      // Keep success state for 12 seconds so users can read the detailed prompt, then return to idle
      setTimeout(() => {
         setStatus('idle');
      }, 12000);

    } catch (err: any) {
      // If the request was aborted intentionally, ignore the error and do not update component state
      if (err.name === 'AbortError') {
        return;
      }
      console.error("Submission failed:", err);
      setStatus('error');
      setErrors(prev => ({
        ...prev,
        submit: err.message || 'A transmission error occurred. Please verify your internet connection or reach us on WhatsApp.'
      }));
    }
  };

  if (isModalMode) {
    return (
      <div className="w-full text-left">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#F0F9FF] text-[#1C8DC8] border-2 border-[#1C8DC8]/30 flex items-center justify-center mx-auto shadow-sm">
                <Check size={28} className="stroke-[3]" />
              </div>
              <h3 className="font-display font-[900] text-xl text-[#0B3951]">
                Trial Booked!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                Alhamdulillah. Your trial slots are securely registered. Coordinator will message you on WhatsApp shortly to confirm.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-5">
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl flex items-center space-x-2 font-semibold animate-in fade-in duration-200">
                  <AlertCircle size={14} className="shrink-0" />
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

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B3951] mb-1.5">
                  Full Name / Parent Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Salim Al-Mansoor"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) delete errors.fullName;
                  }}
                  className={`w-full bg-[#F0F9FF] border ${
                    errors.fullName ? 'border-red-500' : 'border-[#E0F2FE] focus:border-[#1C8DC8]'
                  } rounded-xl px-4 py-3 text-sm text-[#0B3951] outline-none transition-all placeholder-gray-400`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1 flex items-center space-x-1 font-semibold">
                    <AlertCircle size={12} />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-wrap">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B3951] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. salim@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) delete errors.email;
                    }}
                    className={`w-full bg-[#F0F9FF] border ${
                      errors.email ? 'border-red-500' : 'border-[#E0F2FE] focus:border-[#1C8DC8]'
                    } rounded-xl px-4 py-3 text-sm text-[#0B3951] outline-none transition-all placeholder-gray-450`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1 flex items-center space-x-1 font-semibold">
                      <AlertCircle size={12} />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B3951] mb-1.5">
                    WhatsApp Number
                  </label>
                  <div className={`flex rounded-xl bg-[#F0F9FF] border ${
                    errors.phone ? 'border-red-500' : 'border-[#E0F2FE] focus-within:border-[#1C8DC8]'
                  } overflow-hidden transition-all duration-200`}>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-transparent text-xs text-[#0B3951] py-3 pl-3 pr-1 outline-none border-r border-[#E0F2FE] cursor-pointer min-w-[75px]"
                    >
                      {ALL_COUNTRIES.map((c) => (
                        <option key={`${c.code}-mcode`} value={c.dial}>
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
                        if (errors.phone) delete errors.phone;
                      }}
                      className="w-full bg-transparent px-4 py-3 text-sm text-[#0B3951] outline-none placeholder-gray-450"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1 flex items-center space-x-1 font-semibold">
                      <AlertCircle size={12} />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B3951] mb-1.5">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#F0F9FF] border border-[#E0F2FE] focus:border-[#1C8DC8] rounded-xl px-4 py-3 text-xs text-[#0B3951] outline-none transition-all cursor-pointer"
                  >
                    {ALL_COUNTRIES.map((c) => (
                      <option key={`${c.code}-mres`} value={c.name}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B3951] mb-1.5">
                    Quran Course
                  </label>
                  <select
                    value={courseInterest}
                    onChange={(e) => setCourseInterest(e.target.value)}
                    className="w-full bg-[#F0F9FF] border border-[#E0F2FE] focus:border-[#1C8DC8] rounded-xl px-4 py-3 text-xs text-[#0B3951] outline-none transition-all cursor-pointer"
                  >
                    <option value="noorani-qaida">Noorani Qaida Basics</option>
                    <option value="quran-reading">Quran Recitation</option>
                    <option value="tajweed">Tajweed al Quran</option>
                    <option value="memorization">Quran Memorization</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#0B3951] mb-1.5">
                  Age & Level / Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Learner details, specific timing bounds, male/female tutor preference..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) delete errors.message;
                  }}
                  readOnly={isPlanPrefilled}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm outline-none transition-all resize-none placeholder-gray-400 ${
                    isPlanPrefilled
                      ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed font-medium select-none shadow-inner'
                      : 'bg-[#F0F9FF] text-[#0B3951]'
                  } ${
                    errors.message ? 'border-red-500' : 'border-[#E0F2FE] focus:border-[#1C8DC8]'
                  }`}
                ></textarea>
                {isPlanPrefilled && (
                  <span className="text-[10px] text-[#146299] font-bold uppercase tracking-wider block mt-1 flex items-center">
                    🔒 Selected Pricing Plan is locked
                  </span>
                )}
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1 flex items-center space-x-1 font-semibold">
                    <AlertCircle size={12} />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full h-12 bg-gradient-to-r from-[#1C8DC8] to-[#3D8DC3] text-white font-display font-extrabold rounded-xl uppercase tracking-widest text-[11px] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-sky-500/10"
              >
                {status === 'submitting' ? (
                  <>
                    <Clock size={14} className="animate-spin" />
                    <span>Reserving Slot...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Book 3-Day Free Trial</span>
                  </>
                )}
              </button>
            </form>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <section 
      id="contact" 
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-tr from-[#F0F9FF] via-white to-white border-t border-[#E0F2FE] relative overflow-hidden"
    >
      {/* Visual background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-[#1C8DC8]/5 rounded-full blur-[110px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-[#0B3951]/3 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Premium Spacing */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#F0F9FF] border border-[#E0F2FE] px-4 py-2 rounded-full shadow-sm">
            <ShieldCheck className="text-[#1C8DC8] w-4.5 h-4.5" />
            <span className="text-xs font-bold text-[#146299] uppercase tracking-widest font-mono">
              Secure Enrollment Hub
            </span>
          </div>
          <h2 className="font-display font-[900] text-3xl sm:text-[45px] text-[#0B3951] tracking-[-0.035em] leading-[1.05]">
            Schedule Your <span className="font-allora text-transparent bg-clip-text bg-gradient-to-r from-[#1C8DC8] via-[#146299] to-[#0B3951]">Free Trial Lesson</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
             Join risk-free. No credit card required. Our coordinator coordinates direct class setups on WhatsApp within 12 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto text-left">
          
          {/* Left Column: Core benefits + Trust callouts */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="bg-[#0B3951] text-white rounded-[32px] p-8 sm:p-10 space-y-8 relative overflow-hidden border border-[#E0F2FE]/10 shadow-2xl flex-1 text-left">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#1C8DC8]/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <h3 className="font-display font-extrabold text-[#1C8DC8] text-[20px]">
                What Happens Next?
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 text-sm text-left">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1C8DC8] to-[#3D8DC3] text-white flex items-center justify-center font-display font-black text-xs shrink-0 select-none shadow">
                    1
                  </span>
                  <div>
                    <strong className="text-white font-[800] text-sm block">WhatsApp Coordination</strong>
                    <p className="text-slate-300 text-xs mt-1 leading-relaxed">Our coordinator contacts you on WhatsApp immediately to set up appropriate lesson timings and dates.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 text-sm text-left">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1C8DC8] to-[#3D8DC3] text-white flex items-center justify-center font-display font-black text-xs shrink-0 select-none shadow">
                    2
                  </span>
                  <div>
                    <strong className="text-white font-[800] text-sm block">Certified 3-Day Assessment</strong>
                    <p className="text-slate-300 text-xs mt-1 leading-relaxed">Connect directly with a friendly, highly qualified, certified tutor to map spelling and recitation levels.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 text-sm text-left">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1C8DC8] to-[#3D8DC3] text-white flex items-center justify-center font-display font-black text-xs shrink-0 select-none shadow">
                    3
                  </span>
                  <div>
                    <strong className="text-white font-[800] text-sm block">Custom Student Syllabus</strong>
                    <p className="text-slate-300 text-xs mt-1 leading-relaxed">If 100% satisfied, lock in regular classes on your own flexible schedule at highly accessible sibling pricing.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-300">
                <span className="flex items-center space-x-2">
                  <Check size={15} className="text-[#1C8DC8]" strokeWidth={2.5} />
                  <span>Secure 256-bit encryption</span>
                </span>
                <span>Response: Under ~1 hour</span>
              </div>
            </div>

            {/* Direct contact info card */}
            <div className="bg-white rounded-[28px] border border-[#E0F2FE] p-8 space-y-5 shadow-[0_8px_24px_rgba(28,141,200,0.02)] text-left">
              <h4 className="font-display font-[800] text-[#0B3951] text-sm uppercase tracking-wider font-mono">
                Direct Registration Channels
              </h4>
              
              <div className="space-y-3">
                <a 
                  href="https://wa.me/923702680670" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center space-x-4 p-4 bg-[#F0F9FF] rounded-2xl hover:bg-white border border-[#E0F2FE] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <i className="fa-brands fa-whatsapp text-lg"></i>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Fast Coordinator WhatsApp</span>
                    <p className="text-[#0B3951] font-extrabold mt-0.5 text-sm">+92 370 2680670</p>
                  </div>
                </a>

                <a 
                  href="mailto:contact@quranacademee.com" 
                  className="flex items-center space-x-4 p-4 bg-[#F0F9FF] rounded-2xl hover:bg-white border border-[#E0F2FE] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1C8DC8]/10 text-[#1C8DC8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail size={18} strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400 tracking-wider">Direct Helpdesk Email</span>
                    <p className="text-[#0B3951] font-extrabold mt-0.5 text-sm">contact@quranacademee.com</p>
                  </div>
                </a>
              </div>
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
                        if (errors.fullName) delete errors.fullName;
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
                          if (errors.email) delete errors.email;
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
                            if (errors.phone) delete errors.phone;
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
                        if (errors.message) delete errors.message;
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
                      <span className="text-[11px] text-[#146299] font-bold uppercase tracking-wider block mt-2 flex items-center">
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

                  {/* Height 56px-64px CTA conforming to premium specs */}
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
