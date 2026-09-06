import React from 'react';
import { Shield, Scale, Award, Heart, Sparkles, Smartphone, Globe, ExternalLink } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-8">
      {/* Hero Card */}
      <div className="bg-gradient-to-br from-salone-navy via-slate-900 to-salone-navyLight border-2 border-salone-gold/50 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-salone-green/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-salone-blue/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center space-y-4">
          <img
            src="/logo.jpg"
            alt="SALONE LAW"
            className="w-24 h-24 rounded-2xl border-2 border-salone-gold shadow-2xl object-cover"
          />

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-wider">SALONE LAW</h1>
            <p className="text-sm text-salone-gold font-medium mt-1">
              The Premier AI Legal Intelligence Assistant for the Republic of Sierra Leone
            </p>
          </div>

          <div className="inline-block px-4 py-1.5 rounded-full bg-salone-gold/20 border border-salone-gold/40 text-salone-gold font-serif italic text-xs sm:text-sm font-bold">
            Created by James Konomanyi
          </div>
        </div>
      </div>

      {/* Mission & Purpose */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-salone-gold font-bold text-base">
          <Scale className="w-5 h-5" />
          <h2>Mission & Vision</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          <strong>SALONE LAW</strong> was developed by <strong>James Konomanyi</strong> to democratize and elevate access to legal intelligence, constitutional jurisprudence, and statutory law across Sierra Leone.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          Whether inside the Supreme Court in Freetown, provincial High Courts in Bo, Kenema, and Makeni, Magistrate Courts, law faculties at Fourah Bay College (FBC) and Njala, or community legal aid clinics, SALONE LAW empowers legal practitioners, judges, pupils, and citizens with instant, accurate statutory citations, ratio decidendi precedents, and AI legal drafting assistance.
        </p>
      </div>

      {/* Core Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="p-2.5 rounded-xl bg-salone-green/20 text-salone-green border border-salone-green/30 w-fit">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">1991 Constitution Repository</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Complete chapter-by-chapter and section-by-section breakdown of Act No. 6 of 1991, with plain-language explanations and Section 28 Supreme Court enforcement portals.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 w-fit">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">AI Legal Co-Counsel</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Instant citation pulling, case law analysis, proactive follow-up recommendations, voice recognition, and court document drafter.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 w-fit">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Landmark Case Precedents</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Summaries of authoritative Supreme Court and Court of Appeal judgments on constitutional interpretation, criminal procedure, bail, and land rights.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-2">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 w-fit">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">100% Offline Ready on Android</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Installs as a native Android app on your phone with local storage caching for immediate offline legal research in courtrooms without internet connectivity.
          </p>
        </div>
      </div>

      {/* Attribution & Creator */}
      <div className="bg-gradient-to-r from-salone-navyLight to-slate-900 border border-salone-gold/40 rounded-3xl p-6 text-center space-y-3">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Creator Attribution</h3>
        <p className="text-base font-serif italic text-salone-gold font-black">
          "Created by James Konomanyi"
        </p>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Dedicated to the legal fraternity, judiciary, law students, and the people of Sierra Leone in the pursuit of justice, constitutional democracy, and the rule of law.
        </p>
      </div>
    </div>
  );
};
