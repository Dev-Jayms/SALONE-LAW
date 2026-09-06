import React from 'react';
import { BookOpen, FileText, Scale, X, Gavel } from 'lucide-react';
import { TricolourBar } from './TricolourBar';

interface Props {
  onBegin: () => void;
  onClose?: () => void;
}

export const FaceOfAppView: React.FC<Props> = ({ onBegin, onClose }) => {
  return (
    <div className="relative min-h-[90vh] sm:min-h-[85vh] w-full max-w-md mx-auto bg-[#071E14] text-[#F5EEDB] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl border border-emerald-950/60 overflow-hidden font-sans select-none">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row with Close/Dismiss if desired */}
      <div className="flex items-center justify-between z-10 w-full mb-2">
        <div className="flex items-center gap-1 text-[11px] text-[#A3B899] font-mono">
          <Scale className="w-3.5 h-3.5 text-[#F5EEDB]" />
          <span>REPUBLIC OF SIERRA LEONE</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-[#F5EEDB] flex items-center justify-center hover:bg-emerald-900 transition active:scale-95"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Hero Title Section */}
      <div className="text-center z-10 my-auto py-2 space-y-2">
        <h1 className="font-display text-5xl sm:text-6xl font-black tracking-tight text-[#F5EEDB] leading-[0.95] drop-shadow-md">
          SALONE<br />LAW
        </h1>
        <p className="text-sm sm:text-base text-[#D8CEBA] font-serif font-light tracking-wide pt-1">
          AI counsel for Sierra Leone
        </p>

        {/* Top Tricolour Line */}
        <div className="pt-2 pb-3">
          <TricolourBar className="h-1 w-44 mx-auto" />
        </div>

        {/* Vintage Ornate Quote Frame */}
        <div className="relative my-4 p-5 rounded-xl border border-[#D8CEBA]/40 bg-emerald-950/40 backdrop-blur-sm shadow-inner">
          {/* Centered Scales Icon at top notch */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#071E14] px-2 text-[#F5EEDB]">
            <Scale className="w-5 h-5 text-[#F5EEDB]" />
          </div>

          <p className="font-serif italic text-lg sm:text-xl text-[#F5EEDB] leading-snug pt-1">
            “Every section. Every case.<br />One question away.”
          </p>
        </div>

        {/* 3 Core Legal Pillars */}
        <div className="space-y-3.5 text-left py-2 px-1">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-lg border border-[#D8CEBA]/40 flex items-center justify-center text-[#F5EEDB] shrink-0 bg-emerald-950/60">
              <BookOpen className="w-5 h-5 stroke-[1.5]" />
            </div>
            <p className="text-xs sm:text-sm text-[#F5EEDB] font-light leading-snug">
              The 1991 Constitution,<br />chapter by chapter
            </p>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-lg border border-[#D8CEBA]/40 flex items-center justify-center text-[#F5EEDB] shrink-0 bg-emerald-950/60">
              <FileText className="w-5 h-5 stroke-[1.5]" />
            </div>
            <p className="text-xs sm:text-sm text-[#F5EEDB] font-light leading-snug">
              Statutes quoted verbatim,<br />with citations
            </p>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-lg border border-[#D8CEBA]/40 flex items-center justify-center text-[#F5EEDB] shrink-0 bg-emerald-950/60">
              <Gavel className="w-5 h-5 stroke-[1.5]" />
            </div>
            <p className="text-xs sm:text-sm text-[#F5EEDB] font-light leading-snug">
              A similar real case<br />with every answer
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA Button & Attribution */}
      <div className="space-y-4 z-10 pt-2">
        <button
          onClick={onBegin}
          className="w-full py-3.5 px-6 rounded-2xl bg-[#FFFFFF] hover:bg-[#F5EEDB] text-[#071E14] font-sans font-bold text-sm sm:text-base tracking-wide shadow-xl transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Begin, Counselor</span>
        </button>

        <div className="text-center space-y-1.5 pt-1">
          <p className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#D8CEBA] uppercase">
            CREATED BY JAMES KONOMANYI
          </p>
          <TricolourBar className="h-0.5 w-36 mx-auto" />
        </div>
      </div>
    </div>
  );
};
