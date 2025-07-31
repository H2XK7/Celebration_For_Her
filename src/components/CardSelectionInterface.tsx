'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Camera, Music, Gift, Flower, Star, Sparkles } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

interface CardSelectionInterfaceProps {
  onCardSelect: (cardType: 'birthday' | 'girlfriend' | 'memory') => void;
}

interface CardData {
  id: string;
  type: 'birthday' | 'girlfriend' | 'memory';
  title: string;
  subtitle: string;
  description: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  icon: React.ReactNode;
  visualElements: string[];
  hoverEffect: string;
  previewText: string;
}

export default function CardSelectionInterface({ onCardSelect }: CardSelectionInterfaceProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { triggerHapticFeedback } = useGameStore();

  const cards: CardData[] = [
    {
      id: 'birthday',
      type: 'birthday',
      title: 'Birthday Celebration',
      subtitle: 'Another Year More Beautiful',
      description: 'A special celebration just for you, with love and memories that will last forever',
      colorScheme: {
        primary: '#FF69B4',
        secondary: '#FFB6C1',
        accent: '#FFD700'
      },
      icon: '🎂',
      visualElements: ['🎈', '🎊', '🎉', '🎁', '✨'],
      hoverEffect: 'lift',
      previewText: 'Another Year More Beautiful'
    },
    {
      id: 'girlfriend',
      type: 'girlfriend',
      title: 'Girlfriend Day Special',
      subtitle: 'To My Amazing Girlfriend',
      description: 'Celebrating the amazing woman who makes my life complete',
      colorScheme: {
        primary: '#FF1493',
        secondary: '#FFB6C1',
        accent: '#FFD700'
      },
      icon: '💕',
      visualElements: ['❤️', '🌹', '💖', '✨', '🌸'],
      hoverEffect: 'pulse',
      previewText: 'To My Amazing Girlfriend'
    },
    {
      id: 'memory',
      type: 'memory',
      title: 'Memory Lane Journey',
      subtitle: 'Our Love Story',
      description: 'A journey through our beautiful memories together',
      colorScheme: {
        primary: '#DDA0DD',
        secondary: '#E6E6FA',
        accent: '#C0C0C0'
      },
      icon: '📸',
      visualElements: ['⭐', '🌟', '💫', '✨', '📷'],
      hoverEffect: 'twinkle',
      previewText: 'Our Love Story'
    }
  ];

  const handleCardHover = (cardId: string) => {
    setHoveredCard(cardId);
    triggerHapticFeedback();
  };

  const handleCardSelect = (card: CardData) => {
    triggerHapticFeedback();
    // Play soft chime sound effect
    const audio = new Audio('/audio/card-select.mp3');
    audio.volume = 0.3;
    audio.play().catch(console.error);
    
    onCardSelect(card.type);
  };

  const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.05, y: -8 },
    tap: { scale: 0.98 }
  };

  const floatingElements = ['🌸', '🌺', '🌼', '🌻', '🌷', '💐'];

  return (
    <div className="min-h-screen p-4 pt-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-rose-100 to-pink-200"></div>
      
      {/* Floating Flower Petals */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((petal, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              rotate: 0
            }}
            animate={{
              y: -200,
              rotate: 360,
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: i * 1.5,
              repeat: Infinity,
              repeatDelay: 5
            }}
          >
            {petal}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-4xl md:text-6xl font-comfortaa font-bold gradient-text mb-4"
          >
            Choose Your Special Day! ☀️
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 font-nunito"
          >
            Tap on a card to see your special celebration
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.2 }}
              className="relative"
            >
              <motion.div
                className={`relative cursor-pointer rounded-3xl p-6 shadow-lg transition-all duration-300 ${
                  hoveredCard === card.id ? 'shadow-2xl' : 'shadow-lg'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${card.colorScheme.primary} 0%, ${card.colorScheme.secondary} 100%)`,
                  minHeight: '180px',
                  minWidth: '120px'
                }}
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => handleCardHover(card.id)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => handleCardSelect(card)}
              >
                {/* Card Border Glow */}
                <div className="absolute inset-0 rounded-3xl border-2 border-white/30"></div>
                
                {/* Visual Elements */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {card.visualElements.map((element, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl md:text-3xl"
                      initial={{
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 200 - 100,
                        opacity: 0
                      }}
                      animate={{
                        opacity: hoveredCard === card.id ? 1 : 0.3,
                        scale: hoveredCard === card.id ? 1.2 : 1
                      }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.1
                      }}
                      style={{
                        left: `${20 + (i * 15)}%`,
                        top: `${30 + (i * 10)}%`
                      }}
                    >
                      {element}
                    </motion.div>
                  ))}
                </div>

                {/* Card Content */}
                <div className="relative z-10 text-center text-white">
                  {/* Icon */}
                  <motion.div
                    className="text-4xl md:text-6xl mb-4"
                    animate={{
                      scale: hoveredCard === card.id ? 1.2 : 1,
                      rotate: hoveredCard === card.id ? 5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.icon}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-xl md:text-2xl font-dancing font-bold mb-2"
                    animate={{
                      y: hoveredCard === card.id ? -5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.title}
                  </motion.h3>

                  {/* Preview Text */}
                  <motion.p
                    className="text-sm md:text-base opacity-90 font-nunito"
                    animate={{
                      opacity: hoveredCard === card.id ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {card.previewText}
                  </motion.p>

                  {/* Hover Effect Indicator */}
                  <motion.div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === card.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </motion.div>
                </div>

                {/* Special Hover Effects */}
                {hoveredCard === card.id && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {card.hoverEffect === 'pulse' && (
                      <motion.div
                        className="absolute inset-0 rounded-3xl border-2 border-white/50"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                    )}
                    {card.hoverEffect === 'twinkle' && (
                      <div className="absolute inset-0">
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white rounded-full"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`
                            }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1, 0]
                            }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.2,
                              repeat: Infinity
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>

              {/* Card Description */}
              <motion.div
                className="mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.2 }}
              >
                <p className="text-sm text-gray-600 font-nunito">
                  {card.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Bottom Border */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
        />
      </div>
    </div>
  );
} 