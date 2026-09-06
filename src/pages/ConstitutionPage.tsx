import React, { useState } from 'react';
import { BookOpen, Search, Bookmark, Copy, Check, ChevronRight, Scale, Shield, Sparkles, FileText } from 'lucide-react';
import { CONSTITUTION_OF_SIERRA_LEONE } from '../data/constitutionData';
import { ConstitutionSection } from '../types/legal';

interface Props {
  onBookmarkItem: (item: any) => void;
  onAskAIAboutSection: (sec: ConstitutionSection) => void;
}

export const ConstitutionPage: React.FC<Props> = ({ onBookmarkItem, onAskAIAboutSection }) => {
  const [selectedChapter, setSelectedChapter] = useState(3); // Default to Chapter III Fundamental Human Rights
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<ConstitutionSection | null>(
    CONSTITUTION_OF_SIERRA_LEONE[2].sections[0]
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const currentChapter = CONSTITUTION_OF_SIERRA_LEONE.find((c) => c.number === selectedChapter);

  const filteredSections = currentChapter?.sections.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.sectionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopySection = (sec: ConstitutionSection) => {
    navigator.clipboard.writeText(`Constitution of Sierra Leone (1991) - Section ${sec.sectionNumber} (${sec.title}):\n\n${sec.content}`);
    setCopiedId(sec.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-salone-navy via-slate-900 to-salone-navyLight border border-salone-gold/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-salone-gold/20 text-salone-gold border border-salone-gold/40">
                <BookOpen className="w-5 h-5" />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-white">
                The Constitution of Sierra Leone, 1991
              </h1>
            </div>
            <p className="text-xs text-slate-300">
              Act No. 6 of 1991 (As Amended) • The Supreme Law of the Sovereign Republic of Sierra Leone
            </p>
            <p className="text-[11px] font-serif italic text-salone-gold font-bold">
              Created by James Konomanyi
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search sections or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-full py-2 pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:border-salone-gold outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>

        {/* Chapter Selection Pills */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CONSTITUTION_OF_SIERRA_LEONE.map((chap) => (
            <button
              key={chap.number}
              onClick={() => {
                setSelectedChapter(chap.number);
                setSelectedSection(chap.sections[0] || null);
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                selectedChapter === chap.number
                  ? 'bg-salone-gold text-slate-950 border-salone-gold shadow-lg font-black'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>Chapter {chap.roman}</span>
              <span className="text-[10px] opacity-80 truncate max-w-[120px]">{chap.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Sections List & Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sections List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold text-salone-gold uppercase tracking-wider">
                Chapter {currentChapter?.roman}: {currentChapter?.title}
              </h3>
              <span className="text-[11px] text-slate-400 font-semibold">
                {filteredSections?.length || 0} Sections
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">{currentChapter?.description}</p>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredSections?.map((sec) => (
                <div
                  key={sec.id}
                  onClick={() => setSelectedSection(sec)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedSection?.id === sec.id
                      ? 'bg-salone-navyLight border-salone-gold text-white shadow-md'
                      : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-salone-gold">
                      Section {sec.sectionNumber}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <h4 className="text-xs font-bold mt-1 text-slate-100">{sec.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{sec.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Section Detail Reader */}
        <div className="lg:col-span-7">
          {selectedSection ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              {/* Title & Actions */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-salone-gold/20 text-salone-gold border border-salone-gold/30 uppercase tracking-wide">
                    Section {selectedSection.sectionNumber}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-2 leading-snug">
                    {selectedSection.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedSection.chapterTitle} (Chapter {selectedChapter})
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopySection(selectedSection)}
                    className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition"
                    title="Copy full text"
                  >
                    {copiedId === selectedSection.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() =>
                      onBookmarkItem({
                        id: selectedSection.id,
                        type: 'constitution',
                        title: `Section ${selectedSection.sectionNumber}: ${selectedSection.title}`,
                        subtitle: selectedSection.chapterTitle,
                        content: selectedSection.content,
                        savedAt: new Date().toLocaleDateString(),
                      })
                    }
                    className="p-2 text-slate-400 hover:text-salone-gold rounded-xl bg-slate-800 hover:bg-slate-700 transition"
                    title="Save to Notebook"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onAskAIAboutSection(selectedSection)}
                    className="bg-gradient-to-r from-salone-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow flex items-center gap-1.5 transition active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Ask AI Co-Counsel
                  </button>
                </div>
              </div>

              {/* Constitutional Exact Text */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-salone-gold uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Statutory Constitutional Text:
                </h4>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm leading-relaxed font-serif whitespace-pre-wrap">
                  {selectedSection.content}
                </div>
              </div>

              {/* Legal Explanation Summary */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-salone-green" />
                  Plain-English Legal Breakdown:
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {selectedSection.summary}
                </p>
              </div>

              {/* Key Takeaways */}
              {selectedSection.keyTakeaways && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Core Judicial Principles:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedSection.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-salone-gold font-bold">•</span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Case Law */}
              {selectedSection.relatedCases && selectedSection.relatedCases.length > 0 && (
                <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-800/40 space-y-2">
                  <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-salone-gold" />
                    Cited Judicial Precedents:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSection.relatedCases.map((caseName, i) => (
                      <span
                        key={i}
                        className="text-xs bg-slate-900/90 text-blue-200 border border-blue-700/50 px-3 py-1 rounded-xl"
                      >
                        {caseName}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
              <BookOpen className="w-12 h-12 mx-auto text-salone-gold/50 mb-3" />
              <p>Select any section to inspect the full text, legal analysis, and case precedents.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
