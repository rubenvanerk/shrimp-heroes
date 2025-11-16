
export interface ActionReport {
  id: string;
  productsFlipped: number;
  shrimpHelped: number;
  location: string;
  photo?: string;
  note?: string;
  timestamp: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  totalShrimpHelped: number;
  actions: ActionReport[];
  country: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  totalShrimpHelped: number;
  rank: number;
}

export enum AchievementId {
  FIRST_FLIP = 'FIRST_FLIP',
  SHRIMP_SAVER = 'SHRIMP_SAVER',
  SHRIMP_SQUAD = 'SHRIMP_SQUAD',
  SHRIMP_CHAMPION = 'SHRIMP_CHAMPION',
  SHRIMP_HERO = 'SHRIMP_HERO',
  SHRIMP_LEGEND = 'SHRIMP_LEGEND',
}

export interface Achievement {
  id: AchievementId;
  name: string;
  description: string;
  shrimpRequired: number;
  icon: (unlocked: boolean) => React.ReactNode;
}

export interface FaqItem {
  question: string;
  answer: string;
  details?: string;
  imageUrl?: string;
}

export interface GuideStep {
  id: number;
  title: string;
  details?: string;
  imageUrl?: string;
}
