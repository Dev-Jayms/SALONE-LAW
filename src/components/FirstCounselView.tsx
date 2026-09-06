import React from 'react';
import { BookOpen, FileText, Scale, X, Gavel, Sparkles } from 'lucide-react';
import { TricolourBar } from './TricolourBar';

interface Props {
  onBegin: () => void;
  onClose?: () => void;
}

export const FirstCounselView: React.FC<Props> = ({ onBegin, onClose }) => {
  return (
    <div className="relative min-h-[92vh] sm:min-h-[85vh] w-full max-w-md mx-auto bg-gradient-to-b from-[#0B2A1D] via-[#071E14] to-[#04120C] text-[#F5EEDB] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-amber-400/30 overflow-hidden font-sans select-none shimmer-shine">
      {/* 3D ambient gold & emerald glow spheres */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row with Dismiss Button */}
      <div className="flex items-center justify-between z-10 w-full mb-1">
        <div className="flex items-center gap-1.5 text-[11px] text-[#C2DBC0] font-mono font-semibold tracking-wider drop-shadow-sm">
          <Scale className="w-4 h-4 text-amber-300 drop-shadow" />
          <span>REPUBLIC OF SIERRA LEONE</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-950/80 border border-amber-400/40 text-[#F5EEDB] flex items-center justify-center hover:bg-emerald-900 transition active:scale-95 shadow-md cursor-pointer hover:border-amber-300"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Title & Subtitle with 3D depth */}
      <div className="text-center z-10 my-auto py-2 space-y-2.5">
        <h1 className="font-display text-5xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFF7E8] via-[#F5EEDB] to-[#D6C4A5] leading-[0.95] drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
          SALONE<br />LAW
        </h1>
        
        <p className="text-sm sm:text-base text-amber-100/90 font-serif font-light tracking-wide pt-0.5 drop-shadow">
          AI counsel for Sierra Leone
        </p>

        {/* Top 3D Tricolour Line */}
        <div className="pt-2 pb-3">
          <TricolourBar className="h-1.5 w-44 mx-auto shadow-md" />
        </div>

        {/* 3D Vintage Ornate Quote Frame with metallic gold bevel */}
        <div className="relative my-4 p-5 rounded-2xl border border-amber-300/40 bg-gradient-to-b from-emerald-950/80 to-[#051810]/90 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_10px_25px_rgba(0,0,0,0.5)]">
          {/* Centered Scales Icon with 3D gold pill */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#071E14] px-3 py-0.5 rounded-full border border-amber-300/40 text-amber-300 shadow-md flex items-center gap-1">
            <Scale className="w-4 h-4 text-amber-300 drop-shadow" />
          </div>

          <p className="font-serif italic text-lg sm:text-xl text-[#FFF7E8] leading-snug pt-1 drop-shadow-md">
            “Every section. Every case.<br />One question away.”
          </p>
        </div>

        {/* 3 Core Legal Pillars with 3D Embossed Glass Icons */}
        <div className="space-y-3.5 text-left py-2 px-1">
          <div className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl border border-amber-300/40 flex items-center justify-center text-amber-300 shrink-0 bg-gradient-to-br from-emerald-900/90 to-emerald-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_8px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 stroke-[1.8]" />
            </div>
            <p className="text-xs sm:text-sm text-[#F5EEDB] font-normal leading-snug drop-shadow-sm">
              The 1991 Constitution,<br />chapter by chapter
            </p>
          </div>

          <div className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl border border-amber-300/40 flex items-center justify-center text-amber-300 shrink-0 bg-gradient-to-br from-emerald-900/90 to-emerald-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_8px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5 stroke-[1.8]" />
            </div>
            <p className="text-xs sm:text-sm text-[#F5EEDB] font-normal leading-snug drop-shadow-sm">
              Statutes quoted verbatim,<br />with citations
            </p>
          </div>

          <div className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl border border-amber-300/40 flex items-center justify-center text-amber-300 shrink-0 bg-gradient-to-br from-emerald-900/90 to-emerald-950 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_8px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform">
              <Gavel className="w-5 h-5 stroke-[1.8]" />
            </div>
            <p className="text-xs sm:text-sm text-[#F5EEDB] font-normal leading-snug drop-shadow-sm">
              A similar real case<br />with every answer
            </p>
          </div>
        </div>
      </div>

      {/* Bottom 3D CTA Button & Attribution */}
      <div className="space-y-4 z-10 pt-2">
        <button
          onClick={onBegin}
          className="btn-3d-white w-full py-4 px-6 rounded-2xl text-[#071E14] font-sans font-black text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 cursor-pointer hover:shadow-2xl active:scale-95 group"
        >
          <Sparkles className="w-4 h-4 text-emerald-800 group-hover:rotate-12 transition-transform" />
          <span>Begin, Counselor</span>
        </button>

        <div className="text-center space-y-1.5 pt-1">
          <p className="text-[10px] font-sans font-bold tracking-[0.25em] text-amber-200/80 uppercase drop-shadow-sm">
            CREATED BY JAMES KONOMANYI
          </p>
          <TricolourBar className="h-1 w-36 mx-auto shadow" />
        </div>
      </div>
    </div>
  );
};
