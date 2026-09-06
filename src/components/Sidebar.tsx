import React from 'react';
import {
  MessageSquareQuote,
  BookOpen,
  FileText,
  Scale,
  Feather,
  Bookmark,
  Info,
  Shield,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Landmark,
  Sparkles,
  FileDown,
} from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onOpenInstall: () => void;
}

export const Sidebar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  onOpenInstall,
}) => {
  const navItems = [
    {
      id: 'chat',
      label: 'AI Legal Co-Counsel',
      icon: MessageSquareQuote,
      badge: 'AI Powered',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      id: 'constitution',
      label: '1991 Constitution',
      icon: BookOpen,
      badge: '13 Chapters',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'statutes',
      label: 'Statutes & Acts Hub',
      icon: FileText,
      badge: 'Major Acts',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    },
    {
      id: 'cases',
      label: 'Landmark Case Law',
      icon: Scale,
      badge: 'Precedents',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    {
      id: 'drafter',
      label: 'Legal Drafter & Forms',
      icon: Feather,
      badge: 'Court Forms',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
    {
      id: 'notebook',
      label: "Lawyer's Notebook",
      icon: Bookmark,
      badge: 'Saved',
      badgeColor: 'bg-slate-700 text-slate-300 border-slate-600',
    },
    {
      id: 'about',
      label: 'About SALONE LAW',
      icon: Info,
      badge: 'Info',
      badgeColor: 'bg-slate-800 text-salone-gold border-slate-700',
    },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      <aside
        className={`fixed md:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)] w-72 bg-salone-navy border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 overflow-y-auto flex-1 space-y-6">
          {/* Mobile Profile & Branding */}
          <div className="p-3 bg-gradient-to-r from-slate-900 to-salone-navyLight rounded-2xl border border-slate-700/60 shadow-inner">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="SALONE LAW" className="w-12 h-12 rounded-xl border border-salone-gold shadow-md object-cover" />
              <div>
                <h2 className="text-sm font-black text-white tracking-wide">SALONE LAW</h2>
                <p className="text-[11px] text-salone-green font-semibold">Republic of Sierra Leone</p>
                <p className="text-[10px] text-salone-gold font-serif italic mt-0.5">Created by James Konomanyi</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 block">
              Legal Modules
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-salone-blueDark to-salone-blue text-white shadow-lg shadow-blue-900/30 border border-blue-400/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-salone-gold' : 'text-slate-400 group-hover:text-salone-gold'
                      } transition-colors`}
                    />
                    <span>{item.label}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Quick Legal Highlights */}
          <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-salone-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Key Sierra Leone Statutes</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <button
                onClick={() => handleNavClick('statutes')}
                className="p-1.5 bg-slate-800/60 hover:bg-slate-800 rounded-lg text-slate-300 text-left truncate"
              >
                Criminal Proc. Act
              </button>
              <button
                onClick={() => handleNavClick('statutes')}
                className="p-1.5 bg-slate-800/60 hover:bg-slate-800 rounded-lg text-slate-300 text-left truncate"
              >
                Anti-Corruption Act
              </button>
              <button
                onClick={() => handleNavClick('statutes')}
                className="p-1.5 bg-slate-800/60 hover:bg-slate-800 rounded-lg text-slate-300 text-left truncate"
              >
                Customary Land '22
              </button>
              <button
                onClick={() => handleNavClick('statutes')}
                className="p-1.5 bg-slate-800/60 hover:bg-slate-800 rounded-lg text-slate-300 text-left truncate"
              >
                Cyber Crime '21
              </button>
            </div>
          </div>
        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <button
            onClick={onOpenInstall}
            className="w-full mb-3 bg-gradient-to-r from-salone-green to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition active:scale-95"
          >
            <FileDown className="w-4 h-4" />
            <span>Download .APK (Android 12 to 17+)</span>
          </button>
          <div className="text-center">
            <p className="text-[11px] font-serif italic text-salone-gold font-bold">
              Created by James Konomanyi
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">SALONE LAW v1.0 • Freetown, SL</p>
          </div>
        </div>
      </aside>
    </>
  );
};
