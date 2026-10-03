export interface ChatMessage {
  id: string;
  sender: string;
  time: string;
  text: string;
  variant: 'yellow' | 'lime' | 'user';
}

export interface HeroSectionProps {
  onCheckin: () => void;
}

export interface FeaturesSectionProps {
  statHadir: number;
}

export interface SimulatorSectionProps {
  onVerified: () => void;
}

export type SimState = 'idle' | 'simulating' | 'verified';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
