import React, { useState } from 'react';
import { Search, Download, Settings, Menu, X, Scale, BookOpen, FileText, Gavel, Feather, Bookmark, Info, Sparkles, FileDown } from 'lucide-react';
import { searchLegalCorpus, SearchResult } from '../services/searchService';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenInstall: () => void;
  onOpenSettings: () => void;
  onSelectSearchResult: (result: SearchResult) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  onOpenInstall,
  onOpenSettings,
  onSelectSearchResult,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim().length >= 2) {
      const results = searchLegalCorpus(q);
      setSearchResults(results.slice(0, 8));
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (res: SearchResult) => {
    onSelectSearchResult(res);
    setSearchQuery('');
    setSearchResults([]);
    setSearchFocused(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-salone-navy/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div
              onClick={() => setActiveTab('chat')}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="relative">
                <img
                  src="/logo.jpg"
                  alt="SALONE LAW Logo"
                  className="w-10 h-10 rounded-xl border border-salone-gold shadow-md object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-salone-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-salone-green border-2 border-salone-navy"></span>
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-black tracking-wider text-white">SALONE LAW</span>
                  {/* Sierra Leone National Colors Stripe Pill */}
                  <span className="flex items-center h-2.5 w-6 rounded-full overflow-hidden border border-slate-700">
                    <span className="bg-salone-green h-full w-1/3"></span>
                    <span className="bg-white h-full w-1/3"></span>
                    <span className="bg-salone-blue h-full w-1/3"></span>
                  </span>
                </div>
                <p className="text-[10px] text-salone-gold font-medium -mt-1 hidden sm:block font-serif italic">
                  Created by James Konomanyi
                </p>
              </div>
            </div>
          </div>

          {/* Quick Legal Search Bar */}
          <div className="flex-1 max-w-md mx-2 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Constitution, Statutes, Cases (e.g., Section 17, Bail, Cyber, Land)..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setSearchFocused(true)}
                className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-salone-gold focus:ring-1 focus:ring-salone-gold rounded-full py-1.5 pl-9 pr-4 text-xs text-white placeholder-slate-400 transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="absolute right-3 top-2 text-slate-400 hover:text-white text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                <div className="p-2 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Search Matches</span>
                  <span>{searchResults.length} found</span>
                </div>
                <div className="divide-y divide-slate-800/60">
                  {searchResults.map((res) => (
                    <div
                      key={res.id}
                      onClick={() => handleResultClick(res)}
                      className="p-3 hover:bg-slate-800/80 cursor-pointer transition flex items-start gap-2.5"
                    >
                      <div className="mt-0.5 p-1 rounded bg-slate-800 text-salone-gold">
                        {res.type === 'constitution' ? (
                          <BookOpen className="w-3.5 h-3.5" />
                        ) : res.type === 'statute' ? (
                          <FileText className="w-3.5 h-3.5" />
                        ) : (
                          <Gavel className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-slate-100 truncate">{res.title}</h5>
                        <p className="text-[11px] text-salone-gold/90 font-medium truncate">{res.subtitle}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{res.snippet}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Nav Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenInstall}
              className="bg-gradient-to-r from-salone-green to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transition active:scale-95 shrink-0"
              title="Download Android APK (.apk)"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download .APK (Android 12 to 17+)</span>
              <span className="sm:hidden">Get .APK</span>
            </button>

            <button
              onClick={onOpenSettings}
              className="p-2 text-slate-300 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition"
              title="AI Settings & API Key"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
