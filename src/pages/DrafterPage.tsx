import React, { useState } from 'react';
import { Feather, Download, Copy, Check, Sparkles, RefreshCw, FileText } from 'lucide-react';
import { SIERRA_LEONE_LEGAL_TEMPLATES } from '../data/legalTemplatesData';
import { LegalTemplate } from '../types/legal';

export const DrafterPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<LegalTemplate>(SIERRA_LEONE_LEGAL_TEMPLATES[0]);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    SIERRA_LEONE_LEGAL_TEMPLATES[0].fields.forEach((f) => {
      initial[f.key] = f.defaultValue || '';
    });
    return initial;
  });

  const [copied, setCopied] = useState(false);

  const handleSelectTemplate = (tpl: LegalTemplate) => {
    setSelectedTemplate(tpl);
    const initial: Record<string, string> = {};
    tpl.fields.forEach((f) => {
      initial[f.key] = f.defaultValue || '';
    });
    setFieldValues(initial);
  };

  const handleFieldChange = (key: string, val: string) => {
    setFieldValues((prev) => ({ ...prev, [key]: val }));
  };

  const generateDocumentText = () => {
    let text = selectedTemplate.templateText;
    Object.entries(fieldValues).forEach(([k, v]) => {
      const regex = new RegExp(`{{${k}}}`, 'g');
      text = text.replace(regex, v || `[${k}]`);
    });
    return text;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateDocumentText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generateDocumentText()], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedTemplate.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-salone-navy via-slate-900 to-salone-navyLight border border-salone-gold/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40">
              <Feather className="w-5 h-5" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white">Legal Drafter & Court Forms</h1>
          </div>
          <p className="text-xs text-slate-300">
            Automated Legal Drafting for Sierra Leone Legal Practitioners & Chambers
          </p>
          <p className="text-[11px] font-serif italic text-salone-gold font-bold">
            Created by James Konomanyi
          </p>
        </div>

        {/* Template Selector Pills */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {SIERRA_LEONE_LEGAL_TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => handleSelectTemplate(tpl)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedTemplate.id === tpl.id
                  ? 'bg-rose-600 text-white border-rose-500 shadow-lg font-bold'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {tpl.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Form Inputs on Left, Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {selectedTemplate.category}
              </span>
              <h3 className="text-sm font-bold text-white mt-2">{selectedTemplate.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{selectedTemplate.description}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800">
              <span className="text-xs font-bold text-salone-gold uppercase tracking-wider block">
                Enter Case / Party Variables:
              </span>
              {selectedTemplate.fields.map((field) => (
                <div key={field.key} className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">{field.label}</label>
                  <input
                    type="text"
                    value={fieldValues[field.key] || ''}
                    placeholder={field.placeholder}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-salone-gold rounded-xl py-2 px-3 text-xs text-white placeholder-slate-500 outline-none transition"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Document Preview */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-salone-gold" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Generated Court Document Preview:
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 transition active:scale-95"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy Text'}
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-salone-green to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow flex items-center gap-1.5 transition active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>
            </div>

            {/* Document Sheet */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed font-mono whitespace-pre-wrap max-h-[600px] overflow-y-auto shadow-inner select-text">
              {generateDocumentText()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
