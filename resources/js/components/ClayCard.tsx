
import React from 'react';

interface ClayCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ClayCard: React.FC<ClayCardProps> = ({ children, className = '', onClick }) => {
  const baseClasses = `
    p-6 rounded-3xl transition-all duration-300
    bg-white/60
    shadow-[8px_8px_16px_rgba(212,203,215,0.6),-8px_-8px_16px_rgba(255,255,255,0.8)]
    hover:shadow-[4px_4px_8px_rgba(212,203,215,0.6),-4px_-4px_8px_rgba(255,255,255,0.8)]
  `;

  const interactiveClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div className={`${baseClasses} ${interactiveClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};
