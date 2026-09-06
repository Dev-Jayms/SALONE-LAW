import React, { useState } from 'react';
import { X, Key, Shield, Check, Sparkles, ExternalLink } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const SettingsModal: React.FC<Props> = ({ isOpen, onClose, apiKey, onSaveApiKey }) => {
  const [tempKey, setTempKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveApiKey(tempKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-salone-gold/20 text-salone-gold border border-salone-gold/30">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">AI Engine Settings</h3>
            <p className="text-xs text-salone-gold font-serif italic">SALONE LAW • Created by James Konomanyi</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-200 block mb-1">
              Gemini API Key (Optional)
            </label>
            <input
              type="password"
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 px-3 text-xs text-white placeholder-slate-500 focus:border-salone-gold outline-none font-mono"
            />
            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
              SALONE LAW includes a powerful built-in offline Sierra Leone legal intelligence engine. Entering a Gemini API key enables deep cloud legal synthesis.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2 text-xs text-slate-400">
            <Shield className="w-4 h-4 text-salone-green shrink-0 mt-0.5" />
            <span>Your API key is stored securely inside your device browser local storage and never transmitted to third parties.</span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-salone-green to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg transition flex items-center gap-1.5"
            >
              {saved ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
              {saved ? 'Saved!' : 'Save Key'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
