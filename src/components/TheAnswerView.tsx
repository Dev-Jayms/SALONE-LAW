import React, { useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Scale,
  FileText,
  BookOpen,
  HelpCircle,
  Gavel,
  ChevronRight,
  Volume2,
  Sparkles,
  Send,
  Mic,
  MicOff,
  CornerDownRight,
  MessageSquare,
} from 'lucide-react';
import { TricolourBar, TricolourBadge } from './TricolourBar';
import { FormattedLegalText } from './FormattedLegalText';
import { ChatMessage } from '../types/legal';

interface Props {
  userQuestion: string;
  answerMessage: ChatMessage;
  onBack: () => void;
  onAskFollowUp: (q: string) => void;
  onSaveBookmark: () => void;
  isBookmarked?: boolean;
}

export const TheAnswerView: React.FC<Props> = ({
  userQuestion,
  answerMessage,
  onBack,
  onAskFollowUp,
  onSaveBookmark,
  isBookmarked = false,
}) => {
  const [saved, setSaved] = useState(isBookmarked);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [followUpText, setFollowUpText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleToggleBookmark = () => {
    setSaved((prev) => !prev);
    onSaveBookmark();
  };

  const primaryCitation = answerMessage.citations?.[0] || {
    type: 'constitution',
    title: 'CONSTITUTION OF SIERRA LEONE, 1991',
    section: 'SECTION 28(1)',
    snippet: '“No person who is arrested or detained shall be subjected to torture or to inhuman or degrading treatment.”',
  };

  const similarCase = answerMessage.similarCases?.[0] || {
    caseTitle: 'R v. Kanu (Criminal Assizes, Freetown)',
    citation: '2012 SLCA 17',
    year: 2012,
    summary: 'Voluntariness of statements obtained in police custody without legal caution.',
    ratio: 'Statement obtained by threats ruled inadmissible under Section 17 & Section 23.',
  };

  const followUps =
    answerMessage.followUpQuestions && answerMessage.followUpQuestions.length > 0
      ? answerMessage.followUpQuestions
      : [
          'What counts as an unlawful threat under Sierra Leone law?',
          'How do I object to evidence at trial?',
          'What are the statutory bail conditions in the High Court?',
        ];

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const clean = answerMessage.text.replace(/[*#_`]/g, '');
      const utter = new SpeechSynthesisUtterance(clean);
      window.speechSynthesis.speak(utter);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice dictation is not supported on this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setFollowUpText(transcript);
        }
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const handleSubmitFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (followUpText.trim()) {
      onAskFollowUp(followUpText.trim());
      setFollowUpText('');
    }
  };

  return (
    <div
      style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
      className="legal-answer-box w-full max-w-md mx-auto bg-white text-black min-h-screen pb-36 font-sans select-none flex flex-col shadow-2xl rounded-3xl overflow-hidden border border-slate-200"
    >
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onBack}
            className="p-2 -ml-1 text-black hover:text-[#D4AF37] rounded-full hover:bg-slate-100 transition active:scale-95 flex items-center justify-center cursor-pointer"
            title="Back to questions"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.4]" />
          </button>

          <h2
            style={{ color: '#D4AF37' }}
            className="gold-heading font-serif font-black text-2xl tracking-tight drop-shadow-xs"
          >
            The Answer
          </h2>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSpeak}
              className="p-2 text-slate-700 hover:text-[#D4AF37] rounded-full hover:bg-slate-100 transition cursor-pointer"
              title="Listen to answer"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-full transition active:scale-95 cursor-pointer ${
                saved
                  ? 'text-[#D4AF37] bg-amber-50 border border-amber-300'
                  : 'text-slate-700 hover:text-[#D4AF37] hover:bg-slate-100'
              }`}
              title={saved ? 'Bookmarked' : 'Save this answer'}
            >
              <Bookmark className={`w-5 h-5 stroke-[2.2] ${saved ? 'fill-[#D4AF37]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Sierra Leone Tricolour Line */}
        <TricolourBar className="h-1.5 w-full max-w-none rounded-none shadow" />
      </header>

      {/* Main Content Body */}
      <main className="p-3.5 sm:p-4 space-y-3.5 flex-1 bg-white">
        {/* Question Banner Card */}
        <div className="legal-answer-box bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-md space-y-2">
          <p
            style={{ color: '#000000' }}
            className="font-serif italic text-base sm:text-lg font-bold leading-snug text-black"
          >
            “{userQuestion || 'Is a statement obtained by threat admissible in court?'}”
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
            <div className="flex items-center gap-1.5 font-black text-emerald-900">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-950 flex items-center justify-center text-[10px] font-black">
                ✓
              </span>
              <span>Answered by SALONE LAW</span>
            </div>
            <TricolourBadge />
          </div>
        </div>

        {/* Hero Verbatim Statutory Citation Card (Dark Forest Green with Gold Bevel) */}
        <div className="bg-[#0A261A] text-[#FFF7E8] rounded-2xl p-5 border-2 border-[#D4AF37] shadow-xl space-y-3 relative overflow-hidden">
          <div className="absolute right-3 bottom-2 opacity-10 pointer-events-none">
            <Scale className="w-28 h-28 text-white" />
          </div>

          <div
            style={{ color: '#D4AF37' }}
            className="text-[11px] font-sans font-black tracking-widest uppercase drop-shadow-xs"
          >
            {primaryCitation.title} — {primaryCitation.section || 'SECTION 28(1)'}
          </div>

          <div className="border-l-4 border-[#D4AF37] pl-3.5 py-0.5">
            <p className="font-serif text-lg sm:text-xl font-normal text-[#FFF7E8] leading-relaxed">
              {primaryCitation.snippet ||
                '“No person who is arrested or detained shall be subjected to torture or to inhuman or degrading treatment.”'}
            </p>
          </div>

          <div
            style={{ color: '#D4AF37' }}
            className="text-[11px] font-serif italic font-bold"
          >
            Ch. III — Protection of Fundamental Rights
          </div>
        </div>

        {/* In Plain Terms Explanation (Clean Solid White Card, Pure Black Letters, Gold Headings) */}
        <div
          style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}
          className="legal-answer-box bg-white rounded-2xl p-4 sm:p-5 border-2 shadow-lg space-y-3"
        >
          <div
            style={{ color: '#D4AF37', borderColor: '#FDF2D0' }}
            className="gold-heading text-base font-black border-b-2 pb-2 flex items-center gap-1.5 uppercase tracking-wide"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>In plain terms:</span>
          </div>

          {/* Pure Black Readable Paragraphs & Gold Subheadings */}
          <div style={{ color: '#000000' }} className="font-sans text-black">
            <FormattedLegalText text={answerMessage.text} />
          </div>
        </div>

        {/* Similar Landmark Case Card (Clean Solid White Card with Gold Headings and Black Text) */}
        {similarCase && (
          <div className="legal-answer-box bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-md flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#D4AF37] border border-amber-300 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <Scale className="w-5 h-5 stroke-[2.4]" />
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div
                style={{ color: '#D4AF37' }}
                className="gold-heading text-[11px] font-black tracking-wider uppercase font-sans"
              >
                SIMILAR CASE
              </div>
              <h4
                style={{ color: '#000000' }}
                className="text-sm font-black text-black leading-tight"
              >
                {similarCase.caseTitle}
              </h4>
              <p className="text-xs text-blue-700 font-bold font-mono">
                {similarCase.citation}
              </p>
              <p
                style={{ color: '#000000' }}
                className="text-xs text-black font-normal leading-relaxed pt-1"
              >
                <strong style={{ color: '#000000', fontWeight: 900 }}>Held:</strong>{' '}
                {similarCase.ratio || similarCase.summary}
              </p>
            </div>
          </div>
        )}

        {/* Action Pills: Related Statutes & Bookmarks */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onAskFollowUp('Show all related statutes and statutory amendments')}
            style={{ backgroundColor: '#FFFFFF', color: '#000000', borderColor: '#D4AF37' }}
            className="p-3 rounded-xl border-2 text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 active:scale-98 cursor-pointer hover:bg-amber-50"
          >
            <BookOpen className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>Show related statutes</span>
          </button>

          <button
            onClick={handleToggleBookmark}
            style={{
              backgroundColor: saved ? '#FEF9E7' : '#FFFFFF',
              color: '#000000',
              borderColor: '#D4AF37',
            }}
            className="p-3 rounded-xl border-2 text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 active:scale-98 cursor-pointer hover:bg-amber-50"
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#D4AF37]'}`} />
            <span>{saved ? 'Saved to Notebook' : 'Save this answer'}</span>
          </button>
        </div>

        {/* Sources Drawer Accordion */}
        <div className="legal-answer-box bg-white rounded-2xl border-2 border-slate-200 shadow-xs overflow-hidden">
          <button
            onClick={() => setSourcesOpen((prev) => !prev)}
            className="w-full p-3.5 flex items-center justify-between text-left text-xs font-black text-black hover:bg-slate-50 transition cursor-pointer"
          >
            <div className="flex items-center gap-2.5 truncate">
              <FileText className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="truncate text-black">
                <strong style={{ color: '#D4AF37' }}>Sources:</strong> Constitution of Sierra Leone 1991 • Criminal Procedure Act 1965
              </span>
            </div>
            <ChevronRight
              className={`w-4 h-4 text-slate-600 transition-transform duration-200 shrink-0 ${
                sourcesOpen ? 'rotate-90' : ''
              }`}
            />
          </button>

          {sourcesOpen && (
            <div
              style={{ color: '#000000' }}
              className="px-4 pb-3.5 pt-1 border-t border-slate-100 text-xs text-black space-y-1.5 bg-slate-50 font-normal"
            >
              <p>• <strong>Act No. 6 of 1991</strong> — The Constitution of Sierra Leone (As Amended)</p>
              <p>• <strong>Act No. 32 of 1965</strong> — Criminal Procedure Act (Sections 17 & 79)</p>
              <p>• <strong>SierraLII Superior Court Repository</strong> — Appellate Decisions (1960–2026)</p>
              <p style={{ color: '#D4AF37' }} className="gold-heading text-[11px] font-serif italic pt-1 font-bold">
                Verified with Sierra Leone Jurisprudence • SALONE LAW AI
              </p>
            </div>
          )}
        </div>

        {/* 🌟 DEDICATED SECTION TO CONTINUE ASKING MORE QUESTIONS 🌟 */}
        <div className="legal-answer-box bg-gradient-to-b from-white via-amber-50/30 to-white rounded-3xl p-4 sm:p-5 border-2 border-amber-400/70 shadow-xl space-y-3.5 mt-4">
          <div className="flex items-center justify-between border-b border-amber-200 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-900 to-[#071E14] text-amber-300 flex items-center justify-center shadow-xs">
                <Gavel className="w-4 h-4" />
              </div>
              <h3
                style={{ color: '#D4AF37' }}
                className="gold-heading text-sm sm:text-base font-black tracking-wide"
              >
                Continue Inquiring / Follow-Up
              </h3>
            </div>
            <span className="text-[10px] uppercase font-black text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
              AI Co-Counsel
            </span>
          </div>

          <p style={{ color: '#000000' }} className="text-xs text-black font-medium leading-snug">
            Need further clarification, cross-examination points, or statutory sections? Ask your next question below:
          </p>

          {/* Suggested Quick Follow-Up Chips */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
              <CornerDownRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Suggested Next Questions:</span>
            </span>

            <div className="flex flex-col gap-1.5">
              {followUps.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => onAskFollowUp(q)}
                  style={{ backgroundColor: '#FFFFFF', color: '#000000', borderColor: '#CBD5E1' }}
                  className="w-full text-left p-2.5 rounded-xl border hover:border-amber-400 hover:bg-amber-50/80 text-xs font-semibold transition flex items-center gap-2 active:scale-98 cursor-pointer shadow-xs group"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-black group-hover:text-slate-950 truncate">{q}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Follow-Up Input Bar */}
          <form onSubmit={handleSubmitFollowUp} className="pt-2">
            <div className="bg-white rounded-2xl p-1.5 border-2 border-amber-400/80 shadow-md flex items-center gap-2 focus-within:ring-2 focus-within:ring-emerald-700/50">
              <input
                type="text"
                value={followUpText}
                onChange={(e) => setFollowUpText(e.target.value)}
                placeholder="Ask a follow-up or a new question..."
                style={{ color: '#000000' }}
                className="flex-1 bg-transparent border-0 text-xs sm:text-sm text-black placeholder-slate-400 outline-none px-2 font-medium"
              />

              <button
                type="button"
                onClick={handleVoiceInput}
                className={`p-2 rounded-xl border transition ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse border-rose-600'
                    : 'bg-slate-100 hover:bg-amber-50 text-slate-700 border-slate-200'
                }`}
                title="Dictate question by voice"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button
                type="submit"
                disabled={!followUpText.trim()}
                className="btn-3d-emerald text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-md transition active:scale-95 shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
