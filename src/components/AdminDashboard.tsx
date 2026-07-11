import React, { useState, useEffect } from 'react';
import { ShieldCheck, Play, Pause, Send, Calendar, User, Mail, Phone, Globe, MessageSquare, Loader2, CheckCircle, RefreshCw, LogOut, ArrowLeft, Download, Eye } from 'lucide-react';

export default function AdminDashboard() {
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [recitations, setRecitations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecitation, setSelectedRecitation] = useState<any | null>(null);

  // Form states for scholar feedback
  const [recommendedCourse, setRecommendedCourse] = useState('Quran Recitation with Tajweed');
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Audio preview playback states
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Check if token already exists in localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('qa_admin_token');
    if (savedToken === 'QA-Admin-Secure-9988') {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchRecitations(savedToken);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim() === 'QA-Admin-Secure-9988') {
      setIsAuthenticated(true);
      localStorage.setItem('qa_admin_token', token.trim());
      setErrorMsg('');
      fetchRecitations(token.trim());
    } else {
      setErrorMsg('Invalid administrative token. Please verify the credentials provided.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('qa_admin_token');
    setIsAuthenticated(false);
    setToken('');
    setRecitations([]);
    setSelectedRecitation(null);
    stopCurrentAudio();
  };

  const fetchRecitations = async (authToken: string) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch(`/api/recitations?token=${encodeURIComponent(authToken)}`);
      const result = await response.json();
      if (response.ok && result.success) {
        setRecitations(result.recitations || []);
      } else {
        throw new Error(result.message || 'Failed to fetch recitation log.');
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setErrorMsg(err.message || 'Failed to retrieve submitted recitations.');
    } finally {
      setIsLoading(false);
    }
  };

  const stopCurrentAudio = () => {
    if (playingAudio) {
      playingAudio.pause();
      setPlayingAudio(null);
      setIsPlaying(false);
      setActiveAudioId(null);
    }
  };

  const toggleAudioPlayback = (recitationId: string, base64Audio: string) => {
    if (activeAudioId === recitationId) {
      if (isPlaying && playingAudio) {
        playingAudio.pause();
        setIsPlaying(false);
      } else if (playingAudio) {
        playingAudio.play();
        setIsPlaying(true);
      }
      return;
    }

    stopCurrentAudio();

    try {
      const audio = new Audio(base64Audio);
      audio.onended = () => {
        setIsPlaying(false);
        setActiveAudioId(null);
      };
      audio.play();
      setPlayingAudio(audio);
      setActiveAudioId(recitationId);
      setIsPlaying(true);
    } catch (err) {
      console.error('Audio playback failed:', err);
      alert('Unable to play this audio file format.');
    }
  };

  const handleSelectRecitation = (rec: any) => {
    setSelectedRecitation(rec);
    setRecommendedCourse(rec.recommendation || 'Quran Recitation with Tajweed');
    setFeedbackText(rec.feedbackText || '');
    setFeedbackSuccess(false);
  };

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecitation || !recommendedCourse || !feedbackText) {
      alert('Please fill in all feedback parameters.');
      return;
    }

    setIsSubmittingFeedback(true);
    setFeedbackSuccess(false);

    try {
      const response = await fetch('/api/recitations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'feedback',
          recitationId: selectedRecitation.id,
          recommendedCourse,
          feedbackText,
          token: token.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFeedbackSuccess(true);
        // Refresh item in the list
        const updatedRecitations = recitations.map((item) => {
          if (item.id === selectedRecitation.id) {
            return {
              ...item,
              status: 'reviewed',
              recommendation: recommendedCourse,
              feedbackText,
            };
          }
          return item;
        });
        setRecitations(updatedRecitations);
        // Update selected recitation
        setSelectedRecitation({
          ...selectedRecitation,
          status: 'reviewed',
          recommendation: recommendedCourse,
          feedbackText,
        });
      } else {
        throw new Error(result.message || 'Failed to submit feedback.');
      }
    } catch (err: any) {
      console.error('Feedback submit error:', err);
      alert(err.message || 'Error occurred while saving feedback report.');
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const downloadAudio = (rec: any) => {
    try {
      const link = document.createElement('a');
      link.href = rec.audio;
      link.download = `recitation_${rec.fullName.toLowerCase().replace(/\s+/g, '_')}_${rec.id}.webm`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col pt-24 font-sans select-text pb-12">
      {/* BACKGROUND GRAPHIC ACCENTS */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1C8DC8]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* --- NOT AUTHENTICATED STATE --- */}
      {!isAuthenticated ? (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-800 border border-slate-700/60 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#1C8DC8] to-amber-400"></div>

            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-14 h-14 bg-gradient-to-br from-[#1C8DC8] to-[#146299] rounded-2xl flex items-center justify-center text-white shadow-lg">
                <ShieldCheck size={28} className="stroke-[2]" />
              </div>
              <div>
                <h2 className="font-display font-[900] text-xl text-white">Quran Academee</h2>
                <p className="text-xs text-slate-400 font-mono font-bold uppercase tracking-wider mt-1">Admin Portal Access</p>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-xs font-sans font-medium">
                Enter your secure administrative desktop token to access student recitation submissions and logs.
              </p>

              <form onSubmit={handleLogin} className="w-full space-y-4 pt-3 text-left">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 font-mono">Administrative Desktop Token</label>
                  <input
                    type="password"
                    required
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter QA-Admin-Secure-XXXX"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-xs font-semibold text-white placeholder-slate-500 focus:border-[#1C8DC8] focus:outline-none focus:ring-1 focus:ring-[#1C8DC8] transition-all"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-950/50 text-red-400 text-xs rounded-xl border border-red-900/35 font-medium leading-relaxed">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1C8DC8] to-[#146299] hover:from-[#146299] hover:to-[#1C8DC8] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest cursor-pointer shadow-md transition-all active:scale-98"
                >
                  Verify Access Token
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* --- AUTHENTICATED STATE --- */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col space-y-6">
          
          {/* HEADER BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 bg-slate-800 rounded-xl flex items-center justify-center text-[#1C8DC8] border border-slate-700">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h1 className="font-display font-[900] text-2xl text-white tracking-tight">Recitation Evaluation Panel</h1>
                <p className="text-xs text-[#1C8DC8] font-bold tracking-wider font-mono uppercase mt-0.5">Admin Control Board</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              <button
                onClick={() => fetchRecitations(token)}
                disabled={isLoading}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
                title="Refresh Submissions"
              >
                <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="bg-red-950/65 hover:bg-red-900/70 text-red-300 border border-red-900/40 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <LogOut size={13} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* MAIN COLUMN SPLIT */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: LIST of submissions (7 cols) */}
            <div className="lg:col-span-7 space-y-4 flex flex-col h-full">
              <div className="bg-slate-800 border border-slate-800 rounded-3xl p-5 shadow-lg flex-1">
                <div className="flex items-center justify-between mb-4 border-b border-slate-700/60 pb-3">
                  <h3 className="font-display font-black text-sm text-white uppercase tracking-wider font-mono">
                    Students Recitations ({recitations.length})
                  </h3>
                  <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-md font-bold font-mono">
                    REAL-TIME SYNC
                  </span>
                </div>

                {isLoading ? (
                  <div className="py-20 text-center space-y-3">
                    <Loader2 size={36} className="animate-spin text-[#1C8DC8] mx-auto" />
                    <p className="text-xs text-slate-400 font-medium">Fetching secure submissions from database...</p>
                  </div>
                ) : recitations.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto text-slate-500">
                      <MessageSquare size={26} />
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-sm text-slate-300">No Submissions Yet</h4>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed font-medium mt-1">
                        When students record and submit their recitation, they will appear here instantly for scholar evaluation.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-1.5 scrollbar-thin">
                    {recitations.map((rec) => {
                      const isSelected = selectedRecitation?.id === rec.id;
                      const isPending = rec.status === 'pending';
                      const isPlayingThis = activeAudioId === rec.id && isPlaying;

                      return (
                        <div
                          key={rec.id}
                          onClick={() => handleSelectRecitation(rec)}
                          className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer text-left ${
                            isSelected 
                              ? 'bg-[#1C8DC8]/10 border-[#1C8DC8] shadow-md shadow-[#1C8DC8]/5' 
                              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-display font-extrabold text-sm text-white group-hover:text-[#1C8DC8]">
                                  {rec.fullName}
                                </h4>
                                {isPending ? (
                                  <span className="bg-amber-950/80 text-amber-300 border border-amber-900/40 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">Pending</span>
                                ) : (
                                  <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-900/40 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">Reviewed</span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400 font-medium">
                                {rec.country} • {new Date(rec.timestamp).toLocaleString()}
                              </p>
                            </div>

                            {/* Audio quick action */}
                            <div className="flex items-center gap-2 self-start" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => toggleAudioPlayback(rec.id, rec.audio)}
                                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                                  isPlayingThis 
                                    ? 'bg-red-600 text-white animate-pulse' 
                                    : 'bg-slate-800 text-[#1C8DC8] border border-slate-700 hover:bg-[#1C8DC8] hover:text-white'
                                }`}
                                title={isPlayingThis ? 'Pause Recitation' : 'Listen to Recitation'}
                              >
                                {isPlayingThis ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current ml-0.5" />}
                              </button>
                              <button
                                onClick={() => downloadAudio(rec)}
                                className="w-9 h-9 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-white flex items-center justify-center transition-all"
                                title="Download Audio File"
                              >
                                <Download size={13} />
                              </button>
                            </div>
                          </div>

                          {rec.notes && (
                            <p className="text-xs text-slate-500 font-medium mt-3 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60 italic line-clamp-2">
                              "{rec.notes}"
                            </p>
                          )}

                          {!isPending && (
                            <div className="mt-3.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                              <span className="text-[#1C8DC8] font-bold font-mono">Recommends: <strong className="text-slate-200">{rec.recommendation}</strong></span>
                              <span className="text-emerald-400 font-bold flex items-center gap-1">
                                <CheckCircle size={11} /> Feedback Sent
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: EVALUATION BOARD (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
                <div className="border-b border-slate-700/60 pb-3">
                  <h3 className="font-display font-black text-sm text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <CheckCircle className="text-[#1C8DC8]" size={16} /> Evaluation Workshop
                  </h3>
                </div>

                {!selectedRecitation ? (
                  <div className="py-24 text-center space-y-2 text-slate-500">
                    <Eye size={30} className="mx-auto text-slate-600" />
                    <p className="text-xs font-semibold uppercase tracking-wider font-mono">Select a student</p>
                    <p className="text-[11px] max-w-[200px] mx-auto leading-relaxed">
                      Choose any recitation card from the left panel to begin listening and providing feedback.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 text-left animate-fade-in">
                    
                    {/* STUDENT SUMMARY */}
                    <div className="bg-slate-900/60 p-4.5 rounded-2xl border border-slate-800 space-y-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#1C8DC8]/20 border border-[#1C8DC8]/30 flex items-center justify-center text-[#1C8DC8]">
                          <User size={16} />
                        </div>
                        <div>
                          <h4 className="font-display font-black text-xs text-white leading-none uppercase tracking-wide">{selectedRecitation.fullName}</h4>
                          <span className="text-[10px] text-slate-400 font-semibold font-mono">{selectedRecitation.country}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-medium font-mono text-slate-300">
                        <a href={`mailto:${selectedRecitation.email}`} className="flex items-center gap-2 hover:text-[#1C8DC8] truncate">
                          <Mail size={12} className="text-[#1C8DC8]" />
                          <span>{selectedRecitation.email}</span>
                        </a>
                        <a href={`https://wa.me/${selectedRecitation.phone.replace(/\+/g, '')}`} target="_blank" className="flex items-center gap-2 hover:text-[#1C8DC8] truncate">
                          <Phone size={12} className="text-[#1C8DC8]" />
                          <span>{selectedRecitation.phone}</span>
                        </a>
                      </div>

                      {selectedRecitation.notes && (
                        <div className="text-[11px] text-slate-400 bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
                          <span className="font-bold text-slate-500 block mb-1 uppercase tracking-wider font-mono text-[9px]">Student notes</span>
                          "{selectedRecitation.notes}"
                        </div>
                      )}
                    </div>

                    {/* EVALUATION FORM */}
                    <form onSubmit={submitFeedback} className="space-y-4 pt-1">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 font-mono">Recommended Program *</label>
                        <select
                          value={recommendedCourse}
                          onChange={(e) => setRecommendedCourse(e.target.value)}
                          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs font-semibold text-white focus:border-[#1C8DC8] focus:outline-none transition-all"
                        >
                          <option value="Noorani Qaida Basics">Noorani Qaida Basics (Beginners)</option>
                          <option value="Quran Recitation with Tajweed">Quran Recitation with Tajweed (Intermediate)</option>
                          <option value="Quran Memorization (Hifz)">Quran Memorization (Hifz / Advanced)</option>
                          <option value="Islamic Essentials & Duas">Islamic Essentials & Duas</option>
                          <option value="Hifz Revision Partner">Hifz Revision Partner</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 font-mono">Scholar Assessment & Pronunciation Tips *</label>
                        <textarea
                          rows={6}
                          required
                          value={feedbackText}
                          onChange={(e) => setFeedbackText(e.target.value)}
                          placeholder="Write Makharij, Tajweed analysis and clear recommendations here... E.g., 'Assalamu Alaikum. Pronunciation of Al-Fatihah is very good. Makharij for Al-Ayn need some focus. We recommend Tajweed class to align sifaat...'"
                          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs font-semibold text-white placeholder-slate-500 focus:border-[#1C8DC8] focus:outline-none transition-all resize-none font-sans"
                        />
                      </div>

                      {feedbackSuccess && (
                        <div className="p-3 bg-emerald-950/50 text-emerald-400 text-xs rounded-xl border border-emerald-900/35 font-medium flex items-start gap-2">
                          <CheckCircle size={15} className="shrink-0 mt-0.5" />
                          <span>Evaluation feedback sent and emailed to student successfully!</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmittingFeedback}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-teal-700 hover:to-emerald-600 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest cursor-pointer shadow-md transition-all active:scale-98 disabled:opacity-50 flex items-center justify-center space-x-2"
                      >
                        {isSubmittingFeedback ? (
                          <>
                            <Loader2 size={13} className="animate-spin" />
                            <span>Sending Email Report...</span>
                          </>
                        ) : (
                          <>
                            <Send size={13} />
                            <span>Save & Email Report</span>
                          </>
                        )}
                      </button>
                    </form>

                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
