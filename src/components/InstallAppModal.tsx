import React, { useState } from 'react';
import { X, Download, Smartphone, Globe, CheckCircle2, Shield, Share2, Sparkles, Copy, Check, FileDown, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: any;
}

export const InstallAppModal: React.FC<Props> = ({ isOpen, onClose, deferredPrompt }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  if (!isOpen) return null;

  const handleDownloadAPK = () => {
    setDownloadStarted(true);
    const link = document.createElement('a');
    link.href = '/salone-law.apk';
    link.download = 'salone-law.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloadStarted(false), 3000);
  };

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        onClose();
      }
    } else {
      alert(
        'To install via browser:\n1. Tap the three dots menu (⋮) in Chrome or Samsung browser.\n2. Tap "Install app" or "Add to Home screen".'
      );
    }
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-gradient-to-b from-slate-900 via-salone-navy to-slate-950 border-2 border-salone-gold/50 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Decorative ambient lighting */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-salone-green/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-salone-blue/15 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="flex items-center gap-3.5 mb-4">
          <img src="/logo.jpg" alt="SALONE LAW Logo" className="w-14 h-14 rounded-2xl border-2 border-salone-gold shadow-lg object-cover" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-white tracking-wide">SALONE LAW</h3>
              <span className="text-[10px] uppercase font-bold bg-salone-green/20 text-salone-green px-2.5 py-0.5 rounded-full border border-salone-green/40">
                Android .APK
              </span>
            </div>
            <p className="text-xs text-salone-gold font-medium mt-0.5">The AI Legal Assistant for Sierra Leone</p>
            <p className="text-[10px] font-serif italic text-slate-400">Created by James Konomanyi</p>
          </div>
        </div>

        {/* Compatibility badge */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-2.5 mb-4 flex items-center gap-2 text-xs text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-salone-green shrink-0" />
          <span><strong>Compatibility:</strong> Android 12 to Android 17+ (No crash & No parsing errors)</span>
        </div>

        {/* Download Options */}
        <div className="space-y-3 mb-5">
          {/* Primary APK Download */}
          <div className="bg-gradient-to-r from-salone-navyLight to-slate-900 border-2 border-salone-gold/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-salone-gold/20 text-salone-gold border border-salone-gold/40 shrink-0">
                <FileDown className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Download Android Package (.APK)
                </h4>
                <p className="text-[11px] text-slate-300">
                  Direct installer for Android 12, 13, 14, 15, 16, 17+
                </p>
                <span className="text-[10px] text-salone-gold font-semibold">salone-law.apk • Offline Capable</span>
              </div>
            </div>
            <button
              onClick={handleDownloadAPK}
              className="w-full sm:w-auto bg-gradient-to-r from-salone-green to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs font-black px-5 py-3 rounded-xl shadow-xl flex items-center justify-center gap-2 transition active:scale-95 shrink-0"
            >
              <Download className="w-4 h-4" />
              {downloadStarted ? 'Downloading...' : 'Download .APK'}
            </button>
          </div>

          {/* Web App / PWA Install */}
          <div className="bg-slate-800/60 border border-slate-700/70 rounded-2xl p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100">Add to Home Screen (PWA)</h4>
                <p className="text-[11px] text-slate-400">Instant install without downloading APK files</p>
              </div>
            </div>
            <button
              onClick={handleInstallPWA}
              className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-600 flex items-center gap-1.5 transition active:scale-95 shrink-0"
            >
              Install PWA
            </button>
          </div>
        </div>

        {/* Step-by-Step Installation Guide for Android 12 to 17+ */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 space-y-2 mb-4">
          <div className="font-bold text-salone-gold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>How to Install the .APK on Android (12 to 17+):</span>
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-[11px] text-slate-300">
            <li>Tap the <strong>"Download .APK"</strong> button above.</li>
            <li>Once the download completes, tap the notification or open your <strong>Downloads</strong> folder.</li>
            <li>Tap <strong>salone-law.apk</strong>.</li>
            <li>If prompted with <em>"Install unknown apps"</em>, toggle <strong>Allow from this source</strong>.</li>
            <li>Tap <strong>Install</strong> — SALONE LAW is now ready and will open without crashes!</li>
          </ol>
        </div>

        {/* Share Live Link */}
        <div className="flex items-center justify-between gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400">
          <span className="truncate">Share live app link with colleagues</span>
          <button
            onClick={handleCopyShareLink}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 shrink-0 transition"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedLink ? 'Copied' : 'Copy URL'}
          </button>
        </div>

        {/* Footnote */}
        <div className="pt-3.5 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-salone-gold" />
            100% Free • Republic of Sierra Leone
          </span>
          <span className="text-salone-gold font-serif italic text-xs font-bold">
            Created by James Konomanyi
          </span>
        </div>
      </div>
    </div>
  );
};
