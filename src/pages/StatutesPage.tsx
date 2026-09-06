import React, { useState } from 'react';
import { FileText, Search, Filter, BookOpen, Bookmark, Copy, Check, Sparkles, ChevronRight, Shield } from 'lucide-react';
import { SIERRA_LEONE_STATUTES } from '../data/statutesData';
import { Statute } from '../types/legal';

interface Props {
  onBookmarkItem: (item: any) => void;
  onAskAIAboutStatute: (statute: Statute) => void;
}

const CATEGORIES = ['All', 'Criminal', 'Land & Property', 'Cyber & Tech', 'Family & Human Rights', 'Commercial', 'Constitutional', 'Judicial'];

export const StatutesPage: React.FC<Props> = ({ onBookmarkItem, onAskAIAboutStatute }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatute, setSelectedStatute] = useState<Statute | null>(SIERRA_LEONE_STATUTES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredStatutes = SIERRA_LEONE_STATUTES.filter((st) => {
    const matchesCat = selectedCategory === 'All' || st.category === selectedCategory;
    const matchesSearch =
      st.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleCopyStatute = (st: Statute) => {
    navigator.clipboard.writeText(`${st.title} (${st.actNumber}):\n\nOverview:\n${st.overview}`);
    setCopiedId(st.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-salone-navy via-slate-900 to-salone-navyLight border border-salone-gold/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-salone-green/20 text-salone-green border border-salone-green/40">
                <FileText className="w-5 h-5" />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-white">Statutes & Acts of Parliament</h1>
            </div>
            <p className="text-xs text-slate-300">
              Complete Repository of Acts of the Parliament of the Republic of Sierra Leone
            </p>
            <p className="text-[11px] font-serif italic text-salone-gold font-bold">
              Created by James Konomanyi
            </p>
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search Acts, Sections, or Offenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-full py-2 pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:border-salone-gold outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-salone-green text-white border-salone-green shadow-lg font-bold'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Statutes List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold text-salone-gold uppercase tracking-wider">
                {selectedCategory} Statutes
              </h3>
              <span className="text-[11px] text-slate-400 font-semibold">
                {filteredStatutes.length} Acts Found
              </span>
            </div>

            <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredStatutes.map((st) => (
                <div
                  key={st.id}
                  onClick={() => setSelectedStatute(st)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    selectedStatute?.id === st.id
                      ? 'bg-salone-navyLight border-salone-gold text-white shadow-md'
                      : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      {st.category}
                    </span>
                    <span className="text-xs text-salone-gold font-semibold">{st.year}</span>
                  </div>
                  <h4 className="text-xs font-bold mt-1.5 text-slate-100">{st.shortTitle}</h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{st.actNumber}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{st.overview}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Statute Viewer */}
        <div className="lg:col-span-7">
          {selectedStatute ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              {/* Header Info */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-salone-green/20 text-salone-green border border-salone-green/30 uppercase">
                      {selectedStatute.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{selectedStatute.actNumber}</span>
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-white mt-2 leading-snug">
                    {selectedStatute.title}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopyStatute(selectedStatute)}
                    className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition"
                    title="Copy details"
                  >
                    {copiedId === selectedStatute.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() =>
                      onBookmarkItem({
                        id: selectedStatute.id,
                        type: 'statute',
                        title: selectedStatute.shortTitle,
                        subtitle: selectedStatute.actNumber,
                        content: selectedStatute.overview,
                        savedAt: new Date().toLocaleDateString(),
                      })
                    }
                    className="p-2 text-slate-400 hover:text-salone-gold rounded-xl bg-slate-800 hover:bg-slate-700 transition"
                    title="Save to Notebook"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onAskAIAboutStatute(selectedStatute)}
                    className="bg-gradient-to-r from-salone-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow flex items-center gap-1.5 transition active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Ask AI Co-Counsel
                  </button>
                </div>
              </div>

              {/* Legislative Overview */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-salone-gold uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  Legislative Purpose & Scope:
                </h4>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                  {selectedStatute.overview}
                </div>
              </div>

              {/* Key Provisions */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-salone-green" />
                  Key Statutory Highlights:
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedStatute.keyProvisions.map((prov, idx) => (
                    <li key={idx} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-start gap-2.5">
                      <span className="text-salone-gold font-bold">•</span>
                      <span>{prov}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Sections */}
              {selectedStatute.sections && selectedStatute.sections.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                    Core Sections & Penalties:
                  </h4>
                  <div className="space-y-2.5">
                    {selectedStatute.sections.map((sec, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-salone-gold">{sec.sectionNumber}</span>
                          <span className="text-xs font-bold text-slate-200">{sec.title}</span>
                        </div>
                        <p className="text-xs text-slate-300 font-serif leading-relaxed">{sec.content}</p>
                        <p className="text-[11px] text-slate-400 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                          <strong>Legal Effect:</strong> {sec.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
                {selectedStatute.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full border border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
              <FileText className="w-12 h-12 mx-auto text-salone-green/50 mb-3" />
              <p>Select any statute to view legislative overview, statutory sections, and penalties.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
