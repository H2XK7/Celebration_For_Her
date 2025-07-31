export interface Photo {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  unlocked: boolean;
  caption?: string;
  filter?: string;
}

export interface Cat {
  id: number;
  name: string;
  position: { x: number; y: number };
  isVisible: boolean;
}

export interface Flower {
  id: number;
  type: string;
  position: { x: number; y: number };
  isBlooming: boolean;
}

export interface LoveMessage {
  id: number;
  text: string;
  author: string;
  timestamp: Date;
  isHidden: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface GardenFlower {
  id: number;
  type: string;
  color: string;
  position: { x: number; y: number };
  growthStage: number;
}

export interface AudioTrack {
  id: string;
  title: string;
  src: string;
  artist?: string;
  duration?: number;
}

export interface AnimationState {
  isPlaying: boolean;
  currentFrame: number;
  totalFrames: number;
}

export interface CardState {
  isFlipped: boolean;
  isAnimating: boolean;
  currentView: 'front' | 'back' | 'detail';
}

export interface PhotoGallery {
  id: string;
  title: string;
  photos: Photo[];
  currentIndex: number;
  isFullscreen: boolean;
}

export interface InteractiveElement {
  id: string;
  type: 'button' | 'photo' | 'message' | 'game';
  position: { x: number; y: number };
  isVisible: boolean;
  isInteractable: boolean;
  animationState: AnimationState;
}

export interface GameState {
  currentPhoto: number;
  unlockedPhotos: number[];
  completedGames: string[];
  currentGame: string | null;
  musicEnabled: boolean;
  volume: number;
  currentAudioTrack?: AudioTrack;
  isPlaying: boolean;
  cardStates: Record<string, CardState>;
  photoGalleries: PhotoGallery[];
  interactiveElements: InteractiveElement[];
  hapticFeedback: boolean;
  confettiEnabled: boolean;
  voiceMessages: AudioTrack[];
  backgroundMusic: AudioTrack[];
  loveMessages: LoveMessage[];
  relationshipMilestones: {
    id: number;
    title: string;
    date: string;
    description: string;
    photo?: string;
  }[];
  birthdayWishes: string[];
  girlfriendDayReasons: string[];
  customColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}
