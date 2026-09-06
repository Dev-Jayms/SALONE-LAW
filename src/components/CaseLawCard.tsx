import React, { useState } from 'react';
import { Scale, ChevronDown, ChevronUp, Copy, Check, Bookmark, ExternalLink } from 'lucide-react';

interface Props {
  caseData: {
    caseTitle: string;
    citation: string;
    year?: number;
    summary: string;
    ratio: string;
  };
}

export const CaseLawCard: React.FC<Props> = ({ caseData }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${caseData.caseTitle} (${caseData.citation}):\nRatio Decidendi: ${caseData.ratio}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/95 to-slate-900/80 border border-blue-500/30 rounded-xl p-4 my-2.5 shadow-xl hover:border-blue-400/60 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-lg bg-blue-900/40 border border-blue-500/30 text-blue-400 shrink-0 mt-0.5">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-blue-200 leading-snug">{caseData.caseTitle}</h4>
            <p className="text-xs text-blue-400/80 font-mono mt-0.5">
              {caseData.citation} {caseData.year ? `• ${caseData.year}` : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleCopy}
            title="Copy case citation and ratio"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 text-slate-400 hover:text-blue-300 rounded-lg hover:bg-slate-800 transition flex items-center gap-1 text-xs"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <div className="mt-3 pl-2 border-l-2 border-salone-gold/60">
        <span className="text-[11px] font-bold text-salone-gold uppercase tracking-wider block mb-0.5">
          Ratio Decidendi (Legal Principle):
        </span>
        <p className="text-xs text-slate-200 leading-relaxed font-sans">{caseData.ratio}</p>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-300 space-y-2">
          <div>
            <span className="font-semibold text-slate-400 block mb-0.5">Summary / Facts:</span>
            <p className="text-slate-300">{caseData.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};
