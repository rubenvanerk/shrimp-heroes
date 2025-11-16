
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-blue-100">
      <div className="container mx-auto max-w-lg px-4 pb-24 pt-8">
        {children}
      </div>
    </div>
  );
};
