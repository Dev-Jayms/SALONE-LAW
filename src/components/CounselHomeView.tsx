import React, { useState } from 'react';
import {
  Scale,
  Gavel,
  BookOpen,
  FileText,
  MapPin,
  Building2,
  ChevronRight,
  MessageSquare,
  Clock,
  Sparkles,
} from 'lucide-react';
import { TricolourBar } from './TricolourBar';

interface RecentRuling {
  id: string;
  question: string;
  citation: string;
  timestamp: string;
}

interface Props {
  onAsk: (query: string) => void;
  onOpenLibraryCategory: (cat: string) => void;
  onOpenFirstCounsel: () => void;
}

export const CounselHomeView: React.FC<Props> = ({
  onAsk,
  onOpenLibraryCategory,
  onOpenFirstCounsel,
}) => {
  const [query, setQuery] = useState('');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning, Counselor';
    if (hour < 17) return 'Good afternoon, Counselor';
    return 'Good evening, Counselor';
  };

  const categories = [
    { id: 'constitution', label: 'Constitution', icon: BookOpen },
    { id: 'criminal', label: 'Criminal', icon: Gavel },
    { id: 'contract', label: 'Contract', icon: FileText },
    { id: 'evidence', label: 'Evidence', icon: Scale },
    { id: 'land', label: 'Land', icon: MapPin },
    { id: 'banking', label: 'Banking', icon: Building2 },
  ];

  const recentRulings: RecentRuling[] = [
    {
      id: 'ruling-1',
      question: 'What constitutes lawful arrest under s.17?',
      citation: 'Constitution of Sierra Leone, s.17(1)',
      timestamp: 'Answered 12 May 2025 • 9:18 AM',
    },
    {
      id: 'ruling-2',
      question: 'Can a customary marriage be dissolved in the High Court?',
      citation: 'Matrimonial Causes Act 1960',
      timestamp: 'Answered 11 May 2025 • 4:05 PM',
    },
    {
      id: 'ruling-3',
      question: 'Is a statement obtained by threat admissible in court?',
      citation: 'Constitution of Sierra Leone, s.28(1)',
      timestamp: 'Answered Today • 10:42 AM',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onAsk(query.trim());
      setQuery('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-b from-[#EDF2EE] via-[#F4F6F4] to-[#E9EFEA] text-slate-900 min-h-[92vh] pb-28 font-sans select-none flex flex-col justify-between">
      <div className="space-y-4">
        {/* Top 3D Header Section (Dark Emerald Jewel Depth) */}
        <div className="bg-gradient-to-b from-[#0E3524] via-[#071E14] to-[#04120C] text-[#F5EEDB] rounded-b-3xl p-5 pt-4 shadow-[0_15px_30px_rgba(0,0,0,0.35)] border-b border-amber-400/30 relative overflow-hidden shimmer-shine">
          {/* Faint Scales Crest watermark with subtle 3D lighting */}
          <div className="absolute right-2 top-1 opacity-15 pointer-events-none">
            <Scale className="w-28 h-28 text-amber-200" />
          </div>

          <div className="flex items-center justify-between z-10 relative">
            <h1
              onClick={onOpenFirstCounsel}
              className="font-display text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFF7E8] to-[#D6C4A5] cursor-pointer hover:opacity-90 transition drop-shadow-md"
              title="View First Counsel Guide"
            >
              SALONE LAW
            </h1>
            <button
              onClick={onOpenFirstCounsel}
              className="text-[11px] text-amber-200 font-bold px-3 py-1 rounded-full bg-emerald-950/80 border border-amber-400/40 shadow-xs hover:bg-emerald-900 transition active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Guide</span>
            </button>
          </div>

          {/* Tricolour Accent Line */}
          <div className="pt-2 pb-2.5 z-10 relative">
            <TricolourBar className="h-1 w-32 shadow" />
          </div>

          {/* Greeting & Subtitle */}
          <div className="space-y-0.5 z-10 relative">
            <h2 className="font-serif text-lg font-bold text-[#FFF7E8] tracking-tight drop-shadow-sm">
              {getGreeting()}
            </h2>
            <p className="text-xs text-amber-100/80 font-light drop-shadow">
              Every law of Sierra Leone, one question away.
            </p>
          </div>
        </div>

        {/* 3D Floating Ask Box */}
        <div className="px-4 -mt-3 relative z-20">
          <form
            onSubmit={handleSubmit}
            className="glossy-3d-card rounded-2xl p-2.5 flex items-center gap-2.5 transition focus-within:ring-2 focus-within:ring-emerald-700/50"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/90 text-emerald-900 border border-emerald-200 flex items-center justify-center shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_2px_4px_rgba(0,0,0,0.06)]">
              <Gavel className="w-5 h-5 stroke-[2]" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask SALONE LAW about any law..."
              className="flex-1 bg-transparent border-0 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none font-medium"
            />

            <button
              type="submit"
              disabled={!query.trim()}
              className="btn-3d-emerald text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-md transition active:scale-95 shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Ask
            </button>
          </form>
        </div>

        {/* 3D Category Pills (Horizontal Scroll) */}
        <div className="px-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => onOpenLibraryCategory(cat.id)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 text-slate-800 text-xs font-bold whitespace-nowrap shadow-[0_3px_8px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,1)] hover:border-emerald-500/50 hover:text-emerald-950 transition-all active:scale-95 active:translate-y-0.5 cursor-pointer group"
                >
                  <Icon className="w-3.5 h-3.5 text-emerald-800 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Recent Rulings Section */}
        <div className="px-4 space-y-2.5">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 tracking-wide">
              <Clock className="w-3.5 h-3.5 text-emerald-800" />
              <span>Recent rulings of the AI</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Your recent questions and answers
            </p>
          </div>

          <div className="space-y-2.5">
            {recentRulings.map((ruling) => (
              <button
                key={ruling.id}
                onClick={() => onAsk(ruling.question)}
                className="glossy-3d-card w-full text-left p-3.5 rounded-2xl flex items-center justify-between gap-3 transition active:scale-98 group cursor-pointer"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug group-hover:text-emerald-900 transition">
                      {ruling.question}
                    </h4>
                    <p className="text-xs text-blue-700 font-bold hover:underline truncate">
                      {ruling.citation}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {ruling.timestamp}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom 3D Attribution & Tricolour Line */}
      <div className="px-4 pt-6 pb-2 text-center space-y-1.5">
        <p className="text-[10px] font-sans font-bold tracking-[0.25em] text-slate-500 uppercase drop-shadow-xs">
          CREATED BY JAMES KONOMANYI
        </p>
        <TricolourBar className="h-0.5 w-36 mx-auto shadow" />
      </div>
    </div>
  );
};
