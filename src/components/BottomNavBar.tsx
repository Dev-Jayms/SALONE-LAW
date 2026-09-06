import React from 'react';
import { MessageSquare, BookOpen, Scale, Bookmark } from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNavBar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'chat', label: 'Ask', icon: MessageSquare },
    { id: 'library', label: 'Library', icon: BookOpen },
    { id: 'constitution', label: 'Constitution', icon: Scale },
    { id: 'saved', label: 'Saved', icon: Bookmark },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_25px_rgba(0,0,0,0.08)] py-2 px-3 select-none">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            activeTab === tab.id ||
            (tab.id === 'chat' &&
              (activeTab === 'chat' || activeTab === 'welcome' || activeTab === 'answer'));

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-all py-1 px-3.5 rounded-2xl cursor-pointer ${
                isActive
                  ? 'text-[#071E14] font-black'
                  : 'text-slate-400 hover:text-slate-600 font-bold'
              }`}
            >
              {/* 3D Elevated Pill on active tab */}
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-br from-emerald-100 to-emerald-200 text-[#071E14] border border-emerald-300 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_2px_6px_rgba(16,185,129,0.25)] scale-105'
                    : 'bg-transparent text-slate-400'
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'stroke-[2.6] text-[#071E14]' : 'stroke-[1.8]'
                  }`}
                />
              </div>
              <span className="text-[11px] leading-none tracking-tight font-sans">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
