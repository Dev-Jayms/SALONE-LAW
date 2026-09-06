import React from 'react';
import { HelpCircle, ArrowRight } from 'lucide-react';

interface Props {
  questions: string[];
  onSelect: (question: string) => void;
}

export const FollowUpPills: React.FC<Props> = ({ questions, onSelect }) => {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="mt-3 pt-3 border-t border-slate-800/80">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-salone-gold mb-2">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>Suggested Follow-up Legal Inquiries:</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {questions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(q)}
            className="text-xs bg-slate-800/90 hover:bg-salone-navyLight hover:border-salone-gold/60 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-full transition-all text-left flex items-center gap-1.5 shadow-sm active:scale-95 group"
          >
            <span>{q}</span>
            <ArrowRight className="w-3 h-3 text-salone-gold opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};
