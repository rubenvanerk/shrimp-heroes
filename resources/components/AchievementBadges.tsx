
import React from 'react';
// FIX: The 'Crown' icon does not exist in react-feather, so it has been removed from imports. 'Gift' is used as a replacement.
import { Heart, Star, Shield, Award, Gift } from 'react-feather';

interface BadgeProps {
  unlocked: boolean;
  children: React.ReactNode;
}

const BadgeWrapper: React.FC<BadgeProps> = ({ unlocked, children }) => {
  const color = unlocked ? 'text-rose-500' : 'text-gray-300';
  const bgColor = unlocked ? 'bg-rose-100' : 'bg-gray-100';
  return (
    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${bgColor} ${color}`}>
      {children}
    </div>
  );
}

export const HeartBadge: React.FC<{unlocked: boolean}> = ({ unlocked }) => (
  <BadgeWrapper unlocked={unlocked}><Heart size={32} /></BadgeWrapper>
);

export const ShrimpBadge: React.FC<{unlocked: boolean}> = ({ unlocked }) => (
    <BadgeWrapper unlocked={unlocked}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    </BadgeWrapper>
);

export const ShieldBadge: React.FC<{unlocked: boolean}> = ({ unlocked }) => (
  <BadgeWrapper unlocked={unlocked}><Shield size={32} /></BadgeWrapper>
);

export const StarBadge: React.FC<{unlocked: boolean}> = ({ unlocked }) => (
  <BadgeWrapper unlocked={unlocked}><Star size={32} /></BadgeWrapper>
);

export const TrophyBadge: React.FC<{unlocked: boolean}> = ({ unlocked }) => (
  <BadgeWrapper unlocked={unlocked}><Award size={32} /></BadgeWrapper>
);

// FIX: Replaced non-existent 'Crown' icon with 'Gift' icon.
export const CrownBadge: React.FC<{unlocked: boolean}> = ({ unlocked }) => (
  <BadgeWrapper unlocked={unlocked}><Gift size={32} /></BadgeWrapper>
);
