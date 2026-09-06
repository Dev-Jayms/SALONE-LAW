import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { BottomNavBar } from './components/BottomNavBar';
import { InstallAppModal } from './components/InstallAppModal';
import { SettingsModal } from './components/SettingsModal';

import { ChatAssistantPage } from './pages/ChatAssistantPage';
import { ConstitutionPage } from './pages/ConstitutionPage';
import { StatutesPage } from './pages/StatutesPage';
import { LawLibraryView } from './components/LawLibraryView';
import { CaseLawPage } from './pages/CaseLawPage';
import { DrafterPage } from './pages/DrafterPage';
import { NotebookPage } from './pages/NotebookPage';
import { AboutPage } from './pages/AboutPage';

import { LegalBookmark, ConstitutionSection, Statute, LandmarkCase } from './types/legal';
import { SearchResult } from './services/searchService';
import { DEFAULT_GEMINI_API_KEY } from './services/aiService';

export function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [libraryCategory, setLibraryCategory] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('salone_law_gemini_api_key') || DEFAULT_GEMINI_API_KEY;
  });

  const [bookmarks, setBookmarks] = useState<LegalBookmark[]>(() => {
    const saved = localStorage.getItem('salone_law_bookmarks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'default-bk-1',
        type: 'constitution',
        title: 'Section 17: Protection of Right to Personal Liberty',
        subtitle: '1991 Constitution (Chapter III)',
        content: '24-hour / 72-hour limits on police detention and constitutional entitlement to bail.',
        savedAt: new Date().toLocaleDateString(),
      },
      {
        id: 'default-bk-2',
        type: 'statute',
        title: 'Customary Land Rights Act, 2022',
        subtitle: 'Act No. 20 of 2022',
        content: 'Guarantees equal land ownership rights for women in the provinces and Free, Prior and Informed Consent (FPIC).',
        savedAt: new Date().toLocaleDateString(),
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('salone_law_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleSaveApiKey = (newKey: string) => {
    setApiKey(newKey);
    localStorage.setItem('salone_law_gemini_api_key', newKey);
  };

  const handleBookmarkItem = (item: LegalBookmark) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.id === item.id)) return prev;
      return [item, ...prev];
    });
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleAddNote = (title: string, content: string) => {
    const newNote: LegalBookmark = {
      id: `note-${Date.now()}`,
      type: 'note',
      title,
      subtitle: 'Personal Case Note',
      content,
      savedAt: new Date().toLocaleDateString(),
    };
    setBookmarks((prev) => [newNote, ...prev]);
  };

  const handleSelectSearchResult = (result: SearchResult) => {
    if (result.type === 'constitution') {
      setActiveTab('constitution');
    } else if (result.type === 'statute') {
      setActiveTab('library');
    } else if (result.type === 'case') {
      setActiveTab('cases');
    }
  };

  const handleOpenLibraryWithCategory = (cat: string) => {
    setLibraryCategory(cat);
    setActiveTab('library');
  };

  const handleAskAboutLaw = (lawQuery: string) => {
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-[#071E14] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenInstall={() => setInstallModalOpen(true)}
        onOpenSettings={() => setSettingsModalOpen(true)}
        onSelectSearchResult={handleSelectSearchResult}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Body Layout with Sidebar (on desktop) and Main Content */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full pb-16 md:pb-0">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          onOpenInstall={() => setInstallModalOpen(true)}
        />

        <main className="flex-1 p-2 sm:p-4 lg:p-6 min-w-0 overflow-y-auto">
          {activeTab === 'chat' && (
            <ChatAssistantPage
              apiKey={apiKey}
              onBookmarkItem={handleBookmarkItem}
              onOpenLibraryCategory={handleOpenLibraryWithCategory}
            />
          )}

          {activeTab === 'library' && (
            <LawLibraryView
              initialCategory={libraryCategory}
              onAskAboutLaw={handleAskAboutLaw}
              onBookmarkItem={handleBookmarkItem}
            />
          )}

          {activeTab === 'constitution' && (
            <ConstitutionPage
              onBookmarkItem={handleBookmarkItem}
              onAskAIAboutSection={() => setActiveTab('chat')}
            />
          )}

          {activeTab === 'statutes' && (
            <StatutesPage
              onBookmarkItem={handleBookmarkItem}
              onAskAIAboutStatute={() => setActiveTab('chat')}
            />
          )}

          {activeTab === 'cases' && (
            <CaseLawPage
              onBookmarkItem={handleBookmarkItem}
              onAskAIAboutCase={() => setActiveTab('chat')}
            />
          )}

          {activeTab === 'drafter' && <DrafterPage />}

          {(activeTab === 'saved' || activeTab === 'notebook') && (
            <NotebookPage
              bookmarks={bookmarks}
              onRemoveBookmark={handleRemoveBookmark}
              onAddNote={handleAddNote}
            />
          )}

          {activeTab === 'about' && <AboutPage />}
        </main>
      </div>

      {/* Persistent Footer on desktop */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile/Tablet Bottom Navigation Bar (4 matching tabs: Ask, Library, Constitution, Saved) */}
      <div className="block md:hidden">
        <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Modals */}
      <InstallAppModal
        isOpen={installModalOpen}
        onClose={() => setInstallModalOpen(false)}
        deferredPrompt={deferredPrompt}
      />

      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />
    </div>
  );
}

export default App;
