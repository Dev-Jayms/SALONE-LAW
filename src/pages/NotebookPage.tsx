import React, { useState } from 'react';
import { Bookmark, Trash2, Plus, FileText, Scale, BookOpen, Download, Copy, Check } from 'lucide-react';
import { LegalBookmark } from '../types/legal';

interface Props {
  bookmarks: LegalBookmark[];
  onRemoveBookmark: (id: string) => void;
  onAddNote: (title: string, content: string) => void;
}

export const NotebookPage: React.FC<Props> = ({ bookmarks, onRemoveBookmark, onAddNote }) => {
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;
    onAddNote(newNoteTitle.trim(), newNoteContent.trim());
    setNewNoteTitle('');
    setNewNoteContent('');
    setShowAddModal(false);
  };

  const handleCopyBookmark = (item: LegalBookmark) => {
    navigator.clipboard.writeText(`${item.title} (${item.subtitle}):\n\n${item.content}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-salone-navy via-slate-900 to-salone-navyLight border border-salone-gold/40 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-salone-gold/20 text-salone-gold border border-salone-gold/40">
              <Bookmark className="w-5 h-5" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white">Lawyer's Notebook & Saved Research</h1>
          </div>
          <p className="text-xs text-slate-300">
            Bookmarked Constitutional Sections, Statutes, Cases & Personal Case Notes
          </p>
          <p className="text-[11px] font-serif italic text-salone-gold font-bold">
            Created by James Konomanyi
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-salone-green to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow flex items-center gap-1.5 transition active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Case Note
        </button>
      </div>

      {/* Bookmarks Grid */}
      {bookmarks.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400 space-y-3">
          <Bookmark className="w-12 h-12 mx-auto text-salone-gold/40" />
          <h3 className="text-base font-bold text-white">No Saved Bookmarks Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Click the bookmark icon on any Constitutional Section, Statute, Case Law, or AI response to save it here for offline reference.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((b) => (
            <div
              key={b.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col justify-between hover:border-salone-gold/40 transition group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      b.type === 'constitution'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : b.type === 'statute'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : b.type === 'case'
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}
                  >
                    {b.type}
                  </span>
                  <span className="text-[10px] text-slate-400">{b.savedAt}</span>
                </div>

                <h4 className="text-xs font-bold text-white line-clamp-2">{b.title}</h4>
                {b.subtitle && <p className="text-[11px] text-salone-gold mt-0.5 truncate">{b.subtitle}</p>}
                <p className="text-xs text-slate-300 mt-2 line-clamp-4 leading-relaxed font-sans">{b.content}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleCopyBookmark(b)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
                >
                  {copiedId === b.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === b.id ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => onRemoveBookmark(b.id)}
                  className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Note Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Add Personal Legal Note</h3>
            <form onSubmit={handleCreateNote} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Title / Case Reference</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Client Bail Hearing at Pademba Road Court"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:border-salone-gold outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">Notes & Research Thoughts</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter your legal analysis, case facts, or strategy..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 focus:border-salone-gold outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-salone-green text-white hover:bg-emerald-600 transition"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
