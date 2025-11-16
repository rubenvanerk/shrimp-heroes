
import React, { useState } from 'react';
import { ChevronDown } from 'react-feather';

interface ExpandableListItemProps {
  title: string;
  children: React.ReactNode;
}

export const ExpandableListItem: React.FC<ExpandableListItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/50 rounded-2xl shadow-sm overflow-hidden mb-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left font-bold text-gray-700"
      >
        <span>{title}</span>
        <ChevronDown
          size={20}
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 pt-0 text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
};
