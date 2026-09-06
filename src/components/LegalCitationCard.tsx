import React, { useState } from 'react';
import { BookOpen, Copy, Check, Bookmark, ExternalLink } from 'lucide-react';

interface Props {
  citation: {
    type: 'constitution' | 'statute' | 'case';
    title: string;
    section?: string;
    snippet: string;
  };
  onBookmark?: () => void;
}

export const LegalCitationCard: React.FC<Props> = ({ citation, onBookmark }) => {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${citation.title} ${citation.section ? `(${citation.section})` : ''}: ${citation.snippet}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    if (onBookmark) onBookmark();
  };

  const badgeColor =
    citation.type === 'constitution'
      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
      : citation.type === 'statute'
      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
      : 'bg-blue-500/20 text-blue-300 border-blue-500/40';

  return (
    <div className="bg-slate-900/80 border border-slate-700/70 rounded-xl p-3.5 my-2 shadow-lg backdrop-blur hover:border-salone-gold/50 transition-all">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${badgeColor} uppercase tracking-wider flex items-center gap-1`}>
            <BookOpen className="w-3 h-3" />
            {citation.type}
          </span>
          <h4 className="text-sm font-bold text-slate-100">{citation.title}</h4>
          {citation.section && (
            <span className="text-xs bg-slate-800 text-salone-gold font-medium px-2 py-0.5 rounded border border-slate-700">
              {citation.section}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            title="Copy citation"
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleBookmark}
            title="Save bookmark"
            className="p-1 text-slate-400 hover:text-salone-gold rounded hover:bg-slate-800 transition"
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-salone-gold text-salone-gold' : ''}`} />
          </button>
        </div>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed font-sans">{citation.snippet}</p>
    </div>
  );
};
