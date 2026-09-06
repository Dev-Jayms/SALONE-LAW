import React from 'react';

interface Props {
  className?: string;
}

export const TricolourBar: React.FC<Props> = ({ className = 'h-1 w-full max-w-xs mx-auto' }) => {
  return (
    <div className={`flex rounded-full overflow-hidden shadow-sm ${className}`}>
      <div className="flex-1 bg-[#00A859]" />
      <div className="flex-1 bg-[#FFFFFF]" />
      <div className="flex-1 bg-[#0072C6]" />
    </div>
  );
};

export const TricolourBadge: React.FC<{ className?: string }> = ({ className = 'w-6 h-1.5' }) => {
  return (
    <div className={`inline-flex rounded-full overflow-hidden shadow-sm ${className}`}>
      <div className="flex-1 bg-[#00A859]" />
      <div className="flex-1 bg-[#FFFFFF]" />
      <div className="flex-1 bg-[#0072C6]" />
    </div>
  );
};
