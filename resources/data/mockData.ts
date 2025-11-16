
import React from 'react';
import type { LeaderboardUser, Achievement, FaqItem, GuideStep } from '../types';
import { AchievementId } from '../types';
import { ShrimpBadge, StarBadge, ShieldBadge, CrownBadge, HeartBadge, TrophyBadge } from '../components/AchievementBadges';

export const leaderboardData: LeaderboardUser[] = [
  { id: '1', name: 'ShrimplyTheBest', avatar: 'https://i.pravatar.cc/150?u=1', totalShrimpHelped: 125500, rank: 1 },
  { id: '2', name: 'PrawnStar', avatar: 'https://i.pravatar.cc/150?u=2', totalShrimpHelped: 98200, rank: 2 },
  { id: '3', name: 'FlipMaster', avatar: 'https://i.pravatar.cc/150?u=3', totalShrimpHelped: 76450, rank: 3 },
  { id: '4', name: 'AldiAvenger', avatar: 'https://i.pravatar.cc/150?u=4', totalShrimpHelped: 51300, rank: 4 },
  { id: '5', name: 'Crusader', avatar: 'https://i.pravatar.cc/150?u=5', totalShrimpHelped: 25000, rank: 5 },
];

export const achievements: Achievement[] = [
  // FIX: Replaced JSX syntax with React.createElement to be valid in a .ts file.
  { id: AchievementId.FIRST_FLIP, name: 'First Flip!', description: 'Report your first action.', shrimpRequired: 1, icon: (unlocked) => React.createElement(HeartBadge, { unlocked }) },
  { id: AchievementId.SHRIMP_SAVER, name: 'Shrimp Saver', description: 'Help over 500 shrimp.', shrimpRequired: 500, icon: (unlocked) => React.createElement(ShrimpBadge, { unlocked }) },
  { id: AchievementId.SHRIMP_SQUAD, name: 'Shrimp Squad', description: 'Help 2,500 shrimp.', shrimpRequired: 2500, icon: (unlocked) => React.createElement(ShieldBadge, { unlocked }) },
  { id: AchievementId.SHRIMP_CHAMPION, name: 'Shrimp Champion', description: 'Help 10,000 shrimp.', shrimpRequired: 10000, icon: (unlocked) => React.createElement(StarBadge, { unlocked }) },
  { id: AchievementId.SHRIMP_HERO, name: 'Shrimp Hero', description: 'Help 50,000 shrimp.', shrimpRequired: 50000, icon: (unlocked) => React.createElement(TrophyBadge, { unlocked }) },
  { id: AchievementId.SHRIMP_LEGEND, name: 'Shrimp Legend', description: 'Help 250,000 shrimp.', shrimpRequired: 250000, icon: (unlocked) => React.createElement(CrownBadge, { unlocked }) },
];

export const guideSteps: GuideStep[] = [
    { id: 1, title: "Find the shrimp products", details: "They are usually in the refrigerated or frozen section. Look for products in plastic trays or bags.", imageUrl: "https://picsum.photos/seed/shrimpaisle/400/200" },
    { id: 2, title: "Flip them upside down", details: "Quickly and discreetly turn the packages over. The goal is to make them less appealing to buy and require store staff to fix.", imageUrl: "https://picsum.photos/seed/flipping/400/200" },
    { id: 3, title: "Act natural", details: "Behave like a regular shopper. You can put the flipped product back and continue browsing. Don't draw attention to yourself.", imageUrl: "https://picsum.photos/seed/natural/400/200" },
    { id: 4, title: "Count your flips", details: "Keep a mental note of how many packages you've flipped. Every single one helps!", imageUrl: "https://picsum.photos/seed/counting/400/200" },
    { id: 5, title: "Report your action!" },
];

export const faqs: FaqItem[] = [
  { question: "Why flip shrimp products?", answer: "It's a simple, non-destructive way to protest animal cruelty in the shrimp industry. It costs the store time and money, raising awareness.", details: "Flipped products are less likely to be purchased. When store staff have to repeatedly turn them back, it sends a message to management that consumers are concerned about where their shrimp comes from." },
  { question: "Is this legal?", answer: "This action is a form of peaceful protest. You are not damaging property. As long as you are discreet and respectful, you should not face any issues.", details: "You are simply moving a product. If asked by staff what you are doing, you can simply say you were looking at the product information. It's best to avoid confrontation and act like a normal customer." },
  { question: "How many shrimp does one flip help?", answer: "We estimate that flipping one package helps 50 shrimp by disrupting sales and raising awareness.", details: "This is an estimate based on average package size and the impact of disrupted sales. The real power is in the collective action of many people!" },
  { question: "What if I get caught?", answer: "Stay calm and act like a normal shopper. You can say you were just looking at the products. It is very unlikely to cause any trouble.", details: "The worst that is likely to happen is a store employee asks you to stop or to leave. In that case, just comply peacefully. Your safety is the most important thing." },
];
