import React from 'react';
import { Shield, Scale, Heart, Phone, Mail, Globe, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-8 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Col 1: Brand & Footnote */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <img src="/logo.jpg" alt="SALONE LAW" className="w-8 h-8 rounded-lg border border-salone-gold shadow-sm object-cover" />
            <span className="text-base font-black text-white tracking-wider">SALONE LAW</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The premier AI-powered legal intelligence system and constitutional repository for lawyers, judges, legal scholars, and citizens across Sierra Leone.
          </p>
          <div className="pt-2 border-t border-slate-800">
            <p className="text-xs font-serif italic text-salone-gold font-bold">
              Created by James Konomanyi
            </p>
          </div>
        </div>

        {/* Col 2: Sierra Leone Legal Organs */}
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-salone-gold" />
            Legal Institutions
          </h4>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-white transition cursor-pointer">The Supreme Court of Sierra Leone</li>
            <li className="hover:text-white transition cursor-pointer">Sierra Leone Bar Association (SLBA)</li>
            <li className="hover:text-white transition cursor-pointer">Sierra Leone Legal Aid Board</li>
            <li className="hover:text-white transition cursor-pointer">Anti-Corruption Commission (ACC)</li>
            <li className="hover:text-white transition cursor-pointer">Judicial and Legal Service Commission</li>
          </ul>
        </div>

        {/* Col 3: Key Acts */}
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-salone-green" />
            Core Legislation
          </h4>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-white transition cursor-pointer">1991 Constitution (Act No. 6 of 1991)</li>
            <li className="hover:text-white transition cursor-pointer">Criminal Procedure Act 1965</li>
            <li className="hover:text-white transition cursor-pointer">Customary Land Rights Act 2022</li>
            <li className="hover:text-white transition cursor-pointer">Cyber Security and Crime Act 2021</li>
            <li className="hover:text-white transition cursor-pointer">GEWE Act 2022 (Gender Equality)</li>
          </ul>
        </div>

        {/* Col 4: Legal Aid / Emergency Assistance */}
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-salone-blue" />
            Emergency Legal Contacts
          </h4>
          <p className="text-xs text-slate-400 mb-2">
            For free legal representation or fundamental rights defense in Sierra Leone:
          </p>
          <div className="space-y-1.5 text-xs text-slate-300">
            <p><strong>Legal Aid Board:</strong> +232 76 111 222</p>
            <p><strong>Bar Association:</strong> info@slbarassociation.org</p>
            <p><strong>Location:</strong> Law Courts Building, Siaka Stevens St, Freetown</p>
          </div>
        </div>
      </div>

      {/* Bottom disclaimer bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
        <p className="text-slate-400 text-center sm:text-left">
          © 2026 <strong>SALONE LAW</strong>. All legal texts and constitutional provisions belong to the public domain of the Republic of Sierra Leone.
        </p>
        <div className="flex items-center gap-2">
          <span className="text-salone-gold font-serif italic font-bold">Created by James Konomanyi</span>
        </div>
      </div>
    </footer>
  );
};
