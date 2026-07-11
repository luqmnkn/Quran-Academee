import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, RefreshCw, Send, CheckCircle2, AlertCircle, Headphones, Loader2 } from 'lucide-react';

interface RecitationRecorderProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

export default function RecitationRecorder({ onClose, onSuccess }: RecitationRecorderProps) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [notes, setNotes] = useState('');

  // Recorder State
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Details, 2: Record, 3: Success

  // Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);
  const audioPlaybackRef = useRef<HTMLAudioElement | null>(null);

  // Ask for microphone permissions on component mount (which triggers when clicking the evaluation card to open modal)
  useEffect(() => {
    if (hasPermission === null) {
      requestMicPermission();
    }
  }, []);

  // Handle duration counter
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => {
          if (prev >= 60) { // Max 60 seconds
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream tracks immediately, we'll start them when actually recording
      stream.getTracks().forEach((track) => track.stop());
      setHasPermission(true);
      setErrorMsg(null);
    } catch (err: any) {
      console.error('Mic access denied:', err);
      setHasPermission(false);
      setErrorMsg('Microphone access is required to record your recitation. Please enable microphone permissions in your browser.');
    }
  };

  const startRecording = async () => {
    audioChunksRef.current = [];
    setAudioUrl(null);
    setAudioBase64(null);
    setRecordingDuration(0);
    setErrorMsg(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        // Convert to base64 for API transmission
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setAudioBase64(base64data);
        };

        // Stop all stream tracks to release microphone
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(250); // Get data chunks every 250ms
      setIsRecording(true);
    } catch (err: any) {
      console.error('Failed to start recording:', err);
      setErrorMsg('Failed to access your microphone. Please check your browser settings.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const togglePlayback = () => {
    if (!audioUrl) return;
    
    if (!audioPlaybackRef.current) {
      audioPlaybackRef.current = new Audio(audioUrl);
      audioPlaybackRef.current.onended = () => {
        setIsPlaying(false);
      };
    }

    if (isPlaying) {
      audioPlaybackRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlaybackRef.current.play();
      setIsPlaying(true);
    }
  };

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !country) {
      setErrorMsg('Please fill in all personal details before continuing.');
      return;
    }
    setStep(2); // Go to recording step
  };

  const submitRecitationData = async () => {
    if (!audioBase64) {
      setErrorMsg('Please record your recitation before submitting.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/recitations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'submit',
          fullName,
          email,
          phone,
          country,
          audio: audioBase64,
          notes,
        }),
      });

      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseErr) {
        console.error('Failed to parse response JSON:', responseText);
        throw new Error(`Server returned invalid response (Status: ${response.status}). Please try again with a shorter recording.`);
      }

      if (response.ok && result.success) {
        setStep(3); // Go to success step
        if (onSuccess) onSuccess();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err: any) {
      console.error('Recitation submission error:', err);
      setErrorMsg(err.message || 'An error occurred while uploading your audio. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full text-left">
      {/* STEP 1: Personal Details */}
      {step === 1 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-[#F0F9FF] p-4.5 rounded-2xl border border-[#E0F2FE] mb-3 text-xs text-slate-700 leading-relaxed font-medium">
            <span className="font-bold text-[#146299] block mb-1 uppercase tracking-wider font-mono text-[10px]">How it works</span>
            Unsure of your level? Record a short audio of your recitation (e.g. Surah Al-Fatihah) and our certified scholars will review your pronunciation and suggest the perfect program for you within 24 hours.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-mono">Full Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="E.g. Tariq Ahmad"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-[#0B3951] focus:border-[#1C8DC8] focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-mono">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-[#0B3951] focus:border-[#1C8DC8] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-mono">WhatsApp Phone *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 234 567 8900"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-[#0B3951] focus:border-[#1C8DC8] focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-mono">Country *</label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="E.g. United Kingdom"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-[#0B3951] focus:border-[#1C8DC8] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-mono">Notes/Previous Experience (Optional)</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="E.g. I completed Noorani Qaida 2 years ago, but forgot most of it."
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-[#0B3951] focus:border-[#1C8DC8] focus:outline-none transition-all resize-none"
            />
          </div>

          {errorMsg && (
            <div className="flex items-start space-x-2 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-100 font-medium">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-2 flex justify-between gap-3">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 border border-slate-200 text-slate-600 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className={`bg-gradient-to-r from-[#0B3951] to-[#146299] hover:from-[#1C8DC8] hover:to-[#146299] text-white font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-md transition-all active:scale-98 ${onClose ? 'w-1/2' : 'w-full'}`}
            >
              Continue to Record
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: Mic Recording & Upload */}
      {step === 2 && (
        <div className="space-y-5 py-2">
          {hasPermission === false ? (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertCircle size={22} />
              </div>
              <h4 className="font-display font-extrabold text-sm text-[#0B3951]">Microphone Required</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed font-medium">
                We need access to your microphone to record your recitation. Please click the button below to retry or allow microphone access in your browser settings.
              </p>
              <button
                onClick={requestMicPermission}
                className="bg-[#1C8DC8] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-[#146299] transition-all inline-flex items-center space-x-2"
              >
                <RefreshCw size={12} />
                <span>Retry Permission</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 p-5 rounded-2xl bg-[#F0F9FF] border border-[#E0F2FE]">
              {/* Pulsing visual wave for recording */}
              <div className="relative flex items-center justify-center">
                {isRecording && (
                  <span className="absolute inline-flex h-20 w-20 rounded-full bg-red-400 opacity-20 animate-ping" />
                )}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all border ${
                  isRecording 
                    ? 'bg-red-600 border-red-500 text-white animate-pulse' 
                    : audioUrl 
                      ? 'bg-emerald-600 border-emerald-500 text-white' 
                      : 'bg-white border-slate-200 text-[#1C8DC8]'
                }`}>
                  <Mic size={24} className={isRecording ? 'animate-bounce' : ''} />
                </div>
              </div>

              {/* Status and Timer */}
              <div className="text-center space-y-1">
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#0B3951]">
                  {isRecording ? 'Recording Live Recitation' : audioUrl ? 'Recitation Saved Successfully' : 'Ready to Record'}
                </div>
                <div className="font-mono text-2xl font-bold text-[#146299]">
                  {formatTime(recordingDuration)}
                </div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  {isRecording ? 'Maximum length: 1:00 (Recite Al-Fatihah or short Surah)' : audioUrl ? 'Click play below to preview' : 'Stand in a quiet room'}
                </div>
              </div>

              {/* Audio Controls (Record / Stop / Play) */}
              <div className="flex items-center gap-3 pt-2">
                {!isRecording && !audioUrl && (
                  <button
                    onClick={startRecording}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-widest cursor-pointer shadow-md flex items-center space-x-2"
                  >
                    <Mic size={14} />
                    <span>Start Recording</span>
                  </button>
                )}

                {isRecording && (
                  <button
                    onClick={stopRecording}
                    className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-widest cursor-pointer shadow-md flex items-center space-x-2 animate-pulse"
                  >
                    <Square size={14} className="fill-current" />
                    <span>Stop Recording</span>
                  </button>
                )}

                {audioUrl && (
                  <>
                    <button
                      onClick={togglePlayback}
                      className="bg-[#0B3951] hover:bg-[#146299] text-white font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest cursor-pointer shadow-sm flex items-center space-x-2"
                    >
                      {isPlaying ? <Pause size={12} className="fill-current" /> : <Play size={12} className="fill-current" />}
                      <span>{isPlaying ? 'Pause' : 'Play Preview'}</span>
                    </button>

                    <button
                      onClick={startRecording}
                      className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest cursor-pointer shadow-sm flex items-center space-x-1.5"
                    >
                      <RefreshCw size={12} />
                      <span>Redo</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="flex items-start space-x-2 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-100 font-medium">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Buttons for navigation */}
          <div className="flex justify-between gap-3 border-t border-[#E0F2FE] pt-4 mt-2">
            <button
              onClick={() => {
                if (isRecording) stopRecording();
                setStep(1);
              }}
              disabled={isSubmitting}
              className="w-1/2 border border-slate-200 text-slate-600 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={submitRecitationData}
              disabled={isRecording || !audioBase64 || isSubmitting}
              className="w-1/2 bg-gradient-to-r from-[#1C8DC8] to-[#146299] hover:from-[#146299] hover:to-[#1C8DC8] text-white font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-md transition-all active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Send size={13} />
                  <span>Submit to Scholars</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Submission Success */}
      {step === 3 && (
        <div className="text-center py-6 space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
            <CheckCircle2 size={30} className="stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-[900] text-lg sm:text-xl text-[#0B3951] leading-tight">
              Recitation Uploaded Successfully!
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed font-medium">
              Assalamu Alaikum, <strong>{fullName}</strong>. We have securely saved your recitation. Our panel of certified Quranic scholars will listen and evaluate your pronunciation carefully.
            </p>
            <div className="bg-[#ECFDF5] p-4.5 rounded-2xl border border-emerald-100 max-w-sm mx-auto text-[11px] text-emerald-800 font-semibold leading-relaxed">
              We will send your complete assessment report and suggested custom program to <strong className="underline">{email}</strong> within 24 hours. Keep an eye on your inbox!
            </div>
          </div>

          <div className="pt-4 max-w-xs mx-auto">
            {onClose ? (
              <button
                onClick={onClose}
                className="w-full bg-[#0B3951] text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest cursor-pointer hover:bg-[#146299] transition-colors"
              >
                Close Window
              </button>
            ) : (
              <button
                onClick={() => {
                  setFullName('');
                  setEmail('');
                  setPhone('');
                  setCountry('');
                  setNotes('');
                  setAudioUrl(null);
                  setAudioBase64(null);
                  setStep(1);
                }}
                className="w-full bg-slate-100 text-[#0B3951] font-bold py-3 rounded-xl text-xs uppercase tracking-widest cursor-pointer hover:bg-slate-200 transition-colors"
              >
                Record New Recitation
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
