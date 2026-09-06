import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  FileText,
  ChevronRight,
  Sparkles,
  Scale,
  X,
  Bookmark,
  MessageSquare,
} from 'lucide-react';
import { TricolourBar } from './TricolourBar';

interface LibraryItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  quoteCount: string;
  fullText?: string;
}

interface Props {
  onAskAboutLaw: (lawTitle: string) => void;
  onBookmarkItem: (item: any) => void;
  initialCategory?: string;
}

export const LawLibraryView: React.FC<Props> = ({
  onAskAboutLaw,
  onBookmarkItem,
  initialCategory = 'All',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);

  const categories = [
    'All',
    'Constitution',
    'Criminal',
    'Contract',
    'Evidence',
    'Equity',
    'Banking',
    'Land',
  ];

  const libraryItems: LibraryItem[] = [
    {
      id: 'lib-1',
      category: 'Criminal',
      title: 'Criminal Law — Case Digests',
      subtitle: '42 landmark cases • citable',
      quoteCount: '1,240 quotes',
      fullText:
        'Comprehensive judicial digests covering the Criminal Procedure Act 1965, bail principles in The State v. Turay, burden of proof in Simeon Cole v. The State, homicide, larceny, and appellate standards in the Sierra Leone Court of Appeal and Supreme Court.',
    },
    {
      id: 'lib-2',
      category: 'Criminal',
      title: 'Criminal Procedure Act 1965',
      subtitle: 'Statute • full text',
      quoteCount: '856 quotes',
      fullText:
        'Act No. 32 of 1965. Complete procedure governing police arrest, search warrants, bail discretion under Section 79, preliminary investigations in the Magistrate Courts, and trials upon indictment in the High Court of Sierra Leone.',
    },
    {
      id: 'lib-3',
      category: 'Criminal',
      title: 'An Introduction to Criminal Law',
      subtitle: 'Study text • 1,240 quotes',
      quoteCount: '1,240 quotes',
      fullText:
        'Core substantive criminal doctrine under the Laws of Sierra Leone, including mens rea, actus reus, defences of provocation, self-defence, alibi, and insanity.',
    },
    {
      id: 'lib-4',
      category: 'Evidence',
      title: 'Law of Evidence',
      subtitle: 'Statute digest • citable',
      quoteCount: '972 quotes',
      fullText:
        'Admissibility of caution statements under Judges Rules, Section 28(1) exclusion of coerced confessions, documentary evidence, chain of custody for digital WhatsApp records under the Cyber Security Act 2021, and burden of proof.',
    },
    {
      id: 'lib-5',
      category: 'Equity',
      title: 'Equity and Trusts Principles',
      subtitle: 'Study text • 784 quotes',
      quoteCount: '784 quotes',
      fullText:
        'Application of English Statutes of General Application under Section 171 of the 1991 Constitution, equitable remedies (injunctions, specific performance), and customary family trusts in Sierra Leone.',
    },
    {
      id: 'lib-6',
      category: 'Banking',
      title: 'Banking and Mercantile Law',
      subtitle: 'Statute digest • citable',
      quoteCount: '693 quotes',
      fullText:
        'The Bank of Sierra Leone Act, Banking Act 2019, Companies Act 2009/2014, commercial paper, letters of credit, and negotiable instruments jurisprudence.',
    },
    {
      id: 'lib-7',
      category: 'Constitution',
      title: '1991 Constitution of Sierra Leone',
      subtitle: 'Supreme Law • Act No. 6 of 1991',
      quoteCount: '2,450 quotes',
      fullText:
        'The Supreme Law of Sierra Leone. Complete Chapters I to XIII, including Chapter III Fundamental Human Rights (Sections 15–30), Section 17 Liberty, Section 28 Supreme Court Enforcement, and Section 171 Hierarchy of Laws.',
    },
    {
      id: 'lib-8',
      category: 'Land',
      title: 'Customary Land Rights Act 2022',
      subtitle: 'Act No. 20 of 2022 • FPIC & Equality',
      quoteCount: '520 quotes',
      fullText:
        'Historic reform guaranteeing equal land inheritance for women in the provinces, outlawing customary discrimination, and making Free, Prior and Informed Consent (FPIC) mandatory for commercial land acquisitions.',
    },
  ];

  const filteredItems = libraryItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.fullText && item.fullText.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-md mx-auto bg-gradient-to-b from-[#EDF2EE] via-[#F4F6F4] to-[#E9EFEA] text-slate-900 min-h-[92vh] pb-28 font-sans select-none flex flex-col justify-between">
      <div className="p-4 space-y-3.5">
        {/* Top 3D Header Bar (Screen 3) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-black text-2xl text-[#071E14] tracking-tight drop-shadow-xs">
              Law Library
            </h2>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-xs">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Full Text</span>
            </div>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-snug">
            The Constitution, statutes and your own papers — searchable
          </p>
          <div className="pt-1">
            <TricolourBar className="h-0.5 w-full max-w-none rounded-none shadow" />
          </div>
        </div>

        {/* 3D Search Bar */}
        <div className="glossy-3d-card rounded-2xl p-2.5 flex items-center gap-2.5 transition focus-within:ring-2 focus-within:ring-emerald-700/50">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-900 border border-emerald-300 flex items-center justify-center shrink-0 shadow-xs">
            <BookOpen className="w-4 h-4 stroke-[2]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search laws, cases, sections..."
            className="flex-1 bg-transparent border-0 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none font-medium"
          />
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
        </div>

        {/* 3D Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer ${
                  isActive
                    ? 'btn-3d-emerald text-white shadow-md'
                    : 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-200 shadow-xs'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3D Library Cards List */}
        <div className="space-y-2.5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="glossy-3d-card p-3.5 rounded-2xl flex items-center justify-between gap-3 transition active:scale-98 cursor-pointer group"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-900 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
                  <FileText className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-black text-slate-950 leading-snug group-hover:text-emerald-900 transition">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 text-emerald-950 text-[11px] font-black bg-gradient-to-r from-emerald-100 to-emerald-200 px-2.5 py-1 rounded-xl border border-emerald-300 shadow-xs">
                <span>{item.quoteCount}</span>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-800" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Reader Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-white to-slate-50 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-slate-300 animate-in zoom-in-95 duration-150 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 stroke-[2]" />
                </div>
                <h3 className="text-sm font-black text-slate-950 truncate">
                  {selectedItem.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition active:scale-95 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black text-emerald-900 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                {selectedItem.category} • {selectedItem.subtitle}
              </span>
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed pt-2">
                {selectedItem.fullText}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-3">
              <button
                onClick={() => {
                  const title = selectedItem.title;
                  setSelectedItem(null);
                  onAskAboutLaw(`Explain the key principles of ${title} under Sierra Leone law.`);
                }}
                className="btn-3d-emerald flex-1 py-3 px-4 rounded-xl text-white text-xs font-black flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>Ask AI About This Law</span>
              </button>

              <button
                onClick={() => {
                  onBookmarkItem({
                    id: `lib-save-${Date.now()}`,
                    type: 'statute',
                    title: selectedItem.title,
                    subtitle: selectedItem.subtitle,
                    content: selectedItem.fullText || '',
                    savedAt: new Date().toLocaleDateString(),
                  });
                  setSelectedItem(null);
                }}
                className="p-3 rounded-xl bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-950 border border-slate-300 shadow-xs active:scale-95 cursor-pointer"
                title="Bookmark"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Attribution & Tricolour Bar (Screen 3) */}
      <div className="px-4 pt-6 pb-2 text-center space-y-1.5">
        <p className="text-[10px] font-sans font-bold tracking-[0.25em] text-slate-500 uppercase drop-shadow-xs">
          CREATED BY JAMES KONOMANYI
        </p>
        <TricolourBar className="h-0.5 w-36 mx-auto shadow" />
      </div>
    </div>
  );
};
