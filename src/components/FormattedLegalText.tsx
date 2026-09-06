import React from 'react';

interface Props {
  text: string;
}

export const FormattedLegalText: React.FC<Props> = ({ text }) => {
  if (!text) return null;

  const cleanRawText = text.trim();
  const lines = cleanRawText.split('\n');
  const renderedElements: React.ReactNode[] = [];

  let currentParagraphLines: string[] = [];

  const flushParagraph = (key: string) => {
    if (currentParagraphLines.length === 0) return;
    const rawParagraph = currentParagraphLines.join(' ').trim();
    currentParagraphLines = [];

    if (!rawParagraph) return;

    renderedElements.push(
      <p
        key={key}
        style={{ color: '#000000' }}
        className="text-xs sm:text-sm leading-relaxed font-sans font-normal text-black mb-3 last:mb-0"
      >
        {renderInlineFormatting(rawParagraph)}
      </p>
    );
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph(`p-before-${index}`);
      return;
    }

    // Section title markers like "• DIRECT LEGAL ANSWER & STATUTORY BASIS" -> Gold Heading
    if (/^[•*-]\s*(DIRECT LEGAL ANSWER|STATUTORY BASIS|KEY RIGHTS|LANDMARK CASE)/i.test(trimmed)) {
      flushParagraph(`p-sec-pre-${index}`);
      const cleanHeader = trimmed.replace(/^[•*-]\s*/, '').replace(/[*_:]/g, '').trim();
      renderedElements.push(
        <h4
          key={`sec-${index}`}
          style={{ color: '#D4AF37' }}
          className="text-xs font-black uppercase tracking-wider mt-3 mb-1.5 pb-1 border-b border-amber-300/40 flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
          <span>{cleanHeader}</span>
        </h4>
      );
      return;
    }

    // Markdown Headers (### or ## or #) -> Gold Heading
    if (trimmed.startsWith('###') || trimmed.startsWith('##') || trimmed.startsWith('#')) {
      flushParagraph(`p-hdr-${index}`);
      const headerText = trimmed.replace(/^#+\s*/, '').replace(/[*_]/g, '').trim();
      renderedElements.push(
        <h4
          key={`h-${index}`}
          style={{ color: '#D4AF37' }}
          className="text-xs sm:text-sm font-black uppercase tracking-wider mt-3.5 mb-1.5 pb-1 border-b border-amber-300/40 flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
          <span>{headerText}</span>
        </h4>
      );
      return;
    }

    // Blockquote -> Gold left border, black italic text, soft light background
    if (trimmed.startsWith('>')) {
      flushParagraph(`p-quote-${index}`);
      const quoteText = trimmed.replace(/^>\s*/, '');
      renderedElements.push(
        <blockquote
          key={`q-${index}`}
          style={{ color: '#000000', borderColor: '#D4AF37' }}
          className="border-l-4 pl-3.5 py-1.5 my-2.5 text-xs italic font-serif bg-amber-50/60 rounded-r-xl"
        >
          {renderInlineFormatting(quoteText)}
        </blockquote>
      );
      return;
    }

    // Bullet points (* or - or •) -> Gold bullet dot + solid black text
    if (/^[-*•]\s+/.test(trimmed)) {
      flushParagraph(`p-bullet-${index}`);
      const bulletContent = trimmed.replace(/^[-*•]\s+/, '');
      renderedElements.push(
        <div
          key={`li-${index}`}
          className="flex items-start gap-2.5 my-2 ml-1 text-xs sm:text-sm leading-relaxed"
        >
          <span style={{ color: '#D4AF37' }} className="font-black text-sm mt-[-1px] shrink-0">
            •
          </span>
          <div style={{ color: '#000000' }} className="flex-1 font-normal text-black">
            {renderInlineFormatting(bulletContent)}
          </div>
        </div>
      );
      return;
    }

    // Numbered list items (1. 2. etc) -> Gold badge + solid black text
    const numMatch = trimmed.match(/^(\d+)[.)]\s+(.*)/);
    if (numMatch) {
      flushParagraph(`p-num-${index}`);
      renderedElements.push(
        <div
          key={`num-${index}`}
          className="flex items-start gap-2.5 my-2 ml-1 text-xs sm:text-sm leading-relaxed"
        >
          <span
            style={{ color: '#000000', backgroundColor: '#FDF6E2', borderColor: '#D4AF37' }}
            className="text-xs font-black px-2 py-0.5 rounded-md border shrink-0"
          >
            {numMatch[1]}
          </span>
          <div style={{ color: '#000000' }} className="flex-1 mt-0.5 font-normal text-black">
            {renderInlineFormatting(numMatch[2])}
          </div>
        </div>
      );
      return;
    }

    // Regular line inside a paragraph
    currentParagraphLines.push(trimmed);
  });

  flushParagraph(`p-final`);

  return (
    <div style={{ color: '#000000' }} className="space-y-1 text-black select-text">
      {renderedElements}
    </div>
  );
};

// Render bold **text** into 100% pitch-black strong tags
function renderInlineFormatting(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const boldRegex = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const normalText = text.substring(lastIndex, match.index).replace(/\*/g, '');
      if (normalText) {
        parts.push(
          <span key={`t-${match.index}`} style={{ color: '#000000' }} className="text-black font-normal">
            {normalText}
          </span>
        );
      }
    }

    const boldContent = (match[1] || match[2] || '').replace(/\*/g, '');
    parts.push(
      <strong
        key={`b-${match.index}`}
        style={{ color: '#000000', fontWeight: 900 }}
        className="text-black font-black tracking-tight"
      >
        {boldContent}
      </strong>
    );

    lastIndex = boldRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    const remainder = text.substring(lastIndex).replace(/\*/g, '');
    if (remainder) {
      parts.push(
        <span key={`t-end`} style={{ color: '#000000' }} className="text-black font-normal">
          {remainder}
        </span>
      );
    }
  }

  return parts.length > 0 ? parts : [<span key="single" style={{ color: '#000000' }}>{text.replace(/\*/g, '')}</span>];
}
