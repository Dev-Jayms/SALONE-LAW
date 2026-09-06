import React, { useState } from 'react';
import { Scale, Search, Bookmark, Copy, Check, Sparkles, ChevronRight, Gavel, UserCheck } from 'lucide-react';
import { SIERRA_LEONE_CASES } from '../data/caseLawData';
import { LandmarkCase } from '../types/legal';

interface Props {
  onBookmarkItem: (item: any) => void;
  onAskAIAboutCase: (c: LandmarkCase) => void;
}

export const CaseLawPage: React.FC<Props> = ({ onBookmarkItem, onAskAIAboutCase }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<LandmarkCase | null>(SIERRA_LEONE_CASES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCases = SIERRA_LEONE_CASES.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.citation.toLowerCase().includes(q) ||
      c.areaOfLaw.toLowerCase().includes(q) ||
      c.facts.toLowerCase().includes(q) ||
      c.ratioDecidendi.toLowerCase().includes(q)
    );
  });

  const handleCopyCase = (c: LandmarkCase) => {
    navigator.clipboard.writeText(
      `${c.title} (${c.citation})\nCourt: ${c.court} (${c.year})\n\nFacts:\n${c.facts}\n\nRatio Decidendi:\n${c.ratioDecidendi}`
    );
    setCopiedId(c.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-salone-navy via-slate-900 to-salone-navyLight border border-salone-gold/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
                <Scale className="w-5 h-5" />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-white">Landmark Case Law & Precedents</h1>
            </div>
            <p className="text-xs text-slate-300">
              Supreme Court, Court of Appeal & High Court Jurisprudence of Sierra Leone
            </p>
            <p className="text-[11px] font-serif italic text-salone-gold font-bold">
              Created by James Konomanyi
            </p>
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search case title, ratio, judges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-full py-2 pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:border-salone-gold outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cases List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold text-salone-gold uppercase tracking-wider">
                Court Precedents
              </h3>
              <span className="text-[11px] text-slate-400 font-semibold">{filteredCases.length} Cases</span>
            </div>

            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredCases.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedCase?.id === c.id
                      ? 'bg-salone-navyLight border-salone-gold text-white shadow-md'
                      : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {c.court}
                    </span>
                    <span className="text-xs text-salone-gold font-semibold">{c.year}</span>
                  </div>
                  <h4 className="text-xs font-bold mt-1.5 text-slate-100">{c.title}</h4>
                  <p className="text-[11px] text-purple-300 font-mono mt-0.5">{c.citation}</p>
                  <p className="text-[11px] text-salone-gold font-medium mt-0.5">{c.areaOfLaw}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{c.ratioDecidendi}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Case Details */}
        <div className="lg:col-span-7">
          {selectedCase ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {selectedCase.court}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{selectedCase.citation}</span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-white mt-2 leading-snug">
                    {selectedCase.title}
                  </h2>
                  <p className="text-xs text-salone-gold font-semibold mt-1">
                    Area of Law: {selectedCase.areaOfLaw}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopyCase(selectedCase)}
                    className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition"
                    title="Copy case brief"
                  >
                    {copiedId === selectedCase.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() =>
                      onBookmarkItem({
                        id: selectedCase.id,
                        type: 'case',
                        title: selectedCase.title,
                        subtitle: `${selectedCase.court} • ${selectedCase.citation}`,
                        content: selectedCase.ratioDecidendi,
                        savedAt: new Date().toLocaleDateString(),
                      })
                    }
                    className="p-2 text-slate-400 hover:text-salone-gold rounded-xl bg-slate-800 hover:bg-slate-700 transition"
                    title="Save to Notebook"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onAskAIAboutCase(selectedCase)}
                    className="bg-gradient-to-r from-salone-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow flex items-center gap-1.5 transition active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Analyze Case
                  </button>
                </div>
              </div>

              {/* Bench */}
              {selectedCase.judges && (
                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center gap-2 text-xs text-slate-300">
                  <UserCheck className="w-4 h-4 text-purple-400 shrink-0" />
                  <span><strong>Bench / Coram:</strong> {selectedCase.judges.join(', ')}</span>
                </div>
              )}

              {/* Ratio Decidendi */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border-l-4 border-salone-gold border-slate-800 space-y-1.5">
                <h4 className="text-xs font-black text-salone-gold uppercase tracking-wider flex items-center gap-1.5">
                  <Gavel className="w-4 h-4" />
                  Ratio Decidendi (Binding Principle of Law):
                </h4>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-serif">
                  {selectedCase.ratioDecidendi}
                </p>
              </div>

              {/* Facts */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Material Facts:
                </h4>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-wrap">
                  {selectedCase.facts}
                </div>
              </div>

              {/* Legal Issues & Holding */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2">
                  <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                    Core Legal Issues:
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {selectedCase.legalIssues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-salone-gold">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Judicial Holding:
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{selectedCase.holding}</p>
                </div>
              </div>

              {/* Significance */}
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/40 space-y-1">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                  Jurisprudential Significance:
                </h4>
                <p className="text-xs text-purple-100 leading-relaxed">{selectedCase.significance}</p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
              <Scale className="w-12 h-12 mx-auto text-purple-400/50 mb-3" />
              <p>Select any case to inspect facts, ratios, and judicial precedents.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
