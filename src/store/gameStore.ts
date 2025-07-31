import { create } from "zustand";
import {
  GameState,
  Photo,
  Cat,
  Flower,
  LoveMessage,
  QuizQuestion,
  GardenFlower,
  AudioTrack,
  CardState,
  PhotoGallery,
  InteractiveElement,
} from "@/types";

interface GameStore extends GameState {
  // Actions
  unlockPhoto: (photoId: number) => void;
  completeGame: (gameId: string) => void;
  setCurrentGame: (gameId: string | null) => void;
  toggleMusic: () => void;
  setVolume: (volume: number) => void;
  addGardenFlower: (flower: GardenFlower) => void;
  resetGame: () => void;
  
  // New Actions
  setCurrentAudioTrack: (track: AudioTrack | undefined) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  toggleHapticFeedback: () => void;
  toggleConfetti: () => void;
  flipCard: (cardId: string) => void;
  setCardState: (cardId: string, state: Partial<CardState>) => void;
  setPhotoGallery: (galleryId: string, updates: Partial<PhotoGallery>) => void;
  addLoveMessage: (message: LoveMessage) => void;
  addRelationshipMilestone: (milestone: GameState['relationshipMilestones'][0]) => void;
  addBirthdayWish: (wish: string) => void;
  addGirlfriendDayReason: (reason: string) => void;
  setCustomColors: (colors: Partial<GameState['customColors']>) => void;
  triggerHapticFeedback: () => void;
  playConfetti: () => void;
  addInteractiveElement: (element: InteractiveElement) => void;
  updateInteractiveElement: (id: string, updates: Partial<InteractiveElement>) => void;
}

const initialBirthdayPhotos: Photo[] = [
  {
    id: 101,
    src: "/api/placeholder/400/300?text=Birthday+Cake",
    alt: "Birthday cake celebration",
    title: "Birthday Cake",
    description: "Your special birthday cake",
    unlocked: true,
    caption: "Another year of loving you more",
  },
  {
    id: 102,
    src: "/api/placeholder/400/300?text=Birthday+Party",
    alt: "Birthday party memories",
    title: "Birthday Party",
    description: "Celebrating your special day",
    unlocked: true,
    caption: "Every year with you is a gift",
  },
  {
    id: 103,
    src: "/api/placeholder/400/300?text=Birthday+Wishes",
    alt: "Birthday wishes and love",
    title: "Birthday Wishes",
    description: "All my love on your special day",
    unlocked: true,
    caption: "You make every day feel like my birthday",
  },
];

const initialGirlfriendPhotos: Photo[] = [
  {
    id: 201,
    src: "/api/placeholder/400/300?text=Romantic+Date",
    alt: "Romantic date memories",
    title: "Romantic Date",
    description: "Our special moments together",
    unlocked: true,
    caption: "You're not just my girlfriend, you're my best friend",
  },
  {
    id: 202,
    src: "/api/placeholder/400/300?text=Couple+Photo",
    alt: "Beautiful couple photo",
    title: "Couple Photo",
    description: "Us together, forever",
    unlocked: true,
    caption: "Thank you for being you",
  },
  {
    id: 203,
    src: "/api/placeholder/400/300?text=Love+Message",
    alt: "Love message for you",
    title: "Love Message",
    description: "All the reasons I love you",
    unlocked: true,
    caption: "You make my life complete",
  },
];

const initialLoveMessages: LoveMessage[] = [
  {
    id: 1,
    text: "Every moment with you is a gift I cherish. Your smile lights up my world, and your love makes every day feel like my birthday.",
    author: "Your Love",
    timestamp: new Date(),
    isHidden: false,
  },
  {
    id: 2,
    text: "You're not just my girlfriend, you're my best friend, my soulmate, and the love of my life. Thank you for being you!",
    author: "Your Love",
    timestamp: new Date(),
    isHidden: false,
  },
];

const initialBirthdayWishes = [
  "Every year with you is a gift",
  "Your smile lights up my world",
  "Growing older with you is my dream",
  "You make every day feel like my birthday",
];

const initialGirlfriendDayReasons = [
  "You're not just my girlfriend, you're my best friend",
  "Thank you for being you",
  "You make my life complete",
  "I love you more each day",
];

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  currentPhoto: 1,
  unlockedPhotos: [1],
  completedGames: [],
  currentGame: null,
  musicEnabled: true,
  volume: 0.7,
  currentAudioTrack: undefined,
  isPlaying: false,
  cardStates: {
    birthday: { isFlipped: false, isAnimating: false, currentView: 'front' },
    girlfriend: { isFlipped: false, isAnimating: false, currentView: 'front' },
  },
  photoGalleries: [
    {
      id: 'birthday',
      title: 'Birthday Memories',
      photos: initialBirthdayPhotos,
      currentIndex: 0,
      isFullscreen: false,
    },
    {
      id: 'girlfriend',
      title: 'Our Love Story',
      photos: initialGirlfriendPhotos,
      currentIndex: 0,
      isFullscreen: false,
    },
  ],
  interactiveElements: [],
  hapticFeedback: true,
  confettiEnabled: true,
  voiceMessages: [],
  backgroundMusic: [],
  loveMessages: initialLoveMessages,
  relationshipMilestones: [],
  birthdayWishes: initialBirthdayWishes,
  girlfriendDayReasons: initialGirlfriendDayReasons,
  customColors: {
    primary: "#FF69B4",
    secondary: "#FFB6C1",
    accent: "#FFD700",
    background: "#FFF8F0",
  },

  // Actions
  unlockPhoto: (photoId: number) => {
    const { unlockedPhotos } = get();
    if (!unlockedPhotos.includes(photoId)) {
      set({ unlockedPhotos: [...unlockedPhotos, photoId] });
    }
  },

  completeGame: (gameId: string) => {
    const { completedGames } = get();
    if (!completedGames.includes(gameId)) {
      set({ completedGames: [...completedGames, gameId] });
    }
  },

  setCurrentGame: (gameId: string | null) => {
    set({ currentGame: gameId });
  },

  toggleMusic: () => {
    const { musicEnabled } = get();
    set({ musicEnabled: !musicEnabled });
  },

  setVolume: (volume: number) => {
    set({ volume: Math.max(0, Math.min(1, volume)) });
  },

  addGardenFlower: (flower: GardenFlower) => {
    set((state) => ({
      completedGames: [...state.completedGames, `garden_flower_${flower.id}`],
    }));
  },

  resetGame: () => {
    set({
      currentPhoto: 1,
      unlockedPhotos: [1],
      completedGames: [],
      currentGame: null,
      musicEnabled: true,
      volume: 0.7,
      currentAudioTrack: undefined,
      isPlaying: false,
      cardStates: {
        birthday: { isFlipped: false, isAnimating: false, currentView: 'front' },
        girlfriend: { isFlipped: false, isAnimating: false, currentView: 'front' },
      },
      photoGalleries: [
        {
          id: 'birthday',
          title: 'Birthday Memories',
          photos: initialBirthdayPhotos,
          currentIndex: 0,
          isFullscreen: false,
        },
        {
          id: 'girlfriend',
          title: 'Our Love Story',
          photos: initialGirlfriendPhotos,
          currentIndex: 0,
          isFullscreen: false,
        },
      ],
      interactiveElements: [],
      hapticFeedback: true,
      confettiEnabled: true,
      voiceMessages: [],
      backgroundMusic: [],
      loveMessages: initialLoveMessages,
      relationshipMilestones: [],
      birthdayWishes: initialBirthdayWishes,
      girlfriendDayReasons: initialGirlfriendDayReasons,
      customColors: {
        primary: "#FF69B4",
        secondary: "#FFB6C1",
        accent: "#FFD700",
        background: "#FFF8F0",
      },
    });
  },

  // New Actions
  setCurrentAudioTrack: (track: AudioTrack | undefined) => {
    set({ currentAudioTrack: track });
  },

  setIsPlaying: (isPlaying: boolean) => {
    set({ isPlaying });
  },

  toggleHapticFeedback: () => {
    const { hapticFeedback } = get();
    set({ hapticFeedback: !hapticFeedback });
  },

  toggleConfetti: () => {
    const { confettiEnabled } = get();
    set({ confettiEnabled: !confettiEnabled });
  },

  flipCard: (cardId: string) => {
    const { cardStates } = get();
    const currentState = cardStates[cardId];
    if (currentState) {
      set({
        cardStates: {
          ...cardStates,
          [cardId]: {
            ...currentState,
            isFlipped: !currentState.isFlipped,
            isAnimating: true,
          },
        },
      });
      
      setTimeout(() => {
        const { cardStates } = get();
        set({
          cardStates: {
            ...cardStates,
            [cardId]: {
              ...cardStates[cardId],
              isAnimating: false,
            },
          },
        });
      }, 800);
    }
  },

  setCardState: (cardId: string, state: Partial<CardState>) => {
    const { cardStates } = get();
    const currentState = cardStates[cardId];
    if (currentState) {
      set({
        cardStates: {
          ...cardStates,
          [cardId]: { ...currentState, ...state },
        },
      });
    }
  },

  setPhotoGallery: (galleryId: string, updates: Partial<PhotoGallery>) => {
    const { photoGalleries } = get();
    const galleryIndex = photoGalleries.findIndex(g => g.id === galleryId);
    if (galleryIndex !== -1) {
      const updatedGalleries = [...photoGalleries];
      updatedGalleries[galleryIndex] = { ...updatedGalleries[galleryIndex], ...updates };
      set({ photoGalleries: updatedGalleries });
    }
  },

  addLoveMessage: (message: LoveMessage) => {
    const { loveMessages } = get();
    set({ loveMessages: [...loveMessages, message] });
  },

  addRelationshipMilestone: (milestone: GameState['relationshipMilestones'][0]) => {
    const { relationshipMilestones } = get();
    set({ relationshipMilestones: [...relationshipMilestones, milestone] });
  },

  addBirthdayWish: (wish: string) => {
    const { birthdayWishes } = get();
    set({ birthdayWishes: [...birthdayWishes, wish] });
  },

  addGirlfriendDayReason: (reason: string) => {
    const { girlfriendDayReasons } = get();
    set({ girlfriendDayReasons: [...girlfriendDayReasons, reason] });
  },

  setCustomColors: (colors: Partial<GameState['customColors']>) => {
    const { customColors } = get();
    set({ customColors: { ...customColors, ...colors } });
  },

  triggerHapticFeedback: () => {
    const { hapticFeedback } = get();
    if (hapticFeedback && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
  },

  playConfetti: () => {
    const { confettiEnabled } = get();
    if (confettiEnabled) {
      console.log('Confetti effect triggered!');
    }
  },

  addInteractiveElement: (element: InteractiveElement) => {
    const { interactiveElements } = get();
    set({ interactiveElements: [...interactiveElements, element] });
  },

  updateInteractiveElement: (id: string, updates: Partial<InteractiveElement>) => {
    const { interactiveElements } = get();
    const elementIndex = interactiveElements.findIndex(e => e.id === id);
    if (elementIndex !== -1) {
      const updatedElements = [...interactiveElements];
      updatedElements[elementIndex] = { ...updatedElements[elementIndex], ...updates };
      set({ interactiveElements: updatedElements });
    }
  },
}));
