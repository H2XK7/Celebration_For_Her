'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Camera, Music, Play, Pause, ArrowLeft, Volume2, VolumeX, Sparkles, Gift, Flower } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

interface InteractiveCardProps {
  type: 'birthday' | 'girlfriend';
  title: string;
  subtitle: string;
  emoji: string;
  photos: string[];
  messages: string[];
  onCardClick: () => void;
}

export default function InteractiveCard({
  type,
  title,
  subtitle,
  emoji,
  photos,
  messages,
  onCardClick,
}: InteractiveCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const { musicEnabled, toggleMusic, volume, setVolume, triggerHapticFeedback, playConfetti } = useGameStore();

  const handleCardClick = () => {
    triggerHapticFeedback();
    if (!isFlipped) {
      setIsFlipped(true);
      playConfetti();
      setTimeout(() => {
        setShowDetail(true);
      }, 1200);
    } else {
      onCardClick();
    }
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    triggerHapticFeedback();
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
    triggerHapticFeedback();
  };

  const cardVariants = {
    front: { 
      rotateY: 0,
      scale: 1,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
    },
    back: { 
      rotateY: 180,
      scale: 1.02,
      boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
    },
  };

  const detailVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  const floatingElements = type === 'birthday' ? ['🎂', '🎉', '🎊', '🎈', '🎁'] : ['💕', '❤️', '🌹', '✨', '💖'];

  return (
    <div className="relative perspective-1000">
      <AnimatePresence mode="wait">
        {!showDetail ? (
          <motion.div
            key="card"
            className={`relative w-full h-80 cursor-pointer transform-style-preserve-3d ${
              type === 'birthday' ? 'birthday-card' : 'girlfriend-card'
            }`}
            onClick={handleCardClick}
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              boxShadow: "0 30px 60px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            animate={isFlipped ? "back" : "front"}
            variants={cardVariants}
            transition={{ 
              duration: 1.2, 
              ease: "easeInOut",
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          >
            {/* Front of Card - Traditional Birthday Card Design */}
            <motion.div
              className="absolute inset-0 backface-hidden rounded-3xl p-8 flex flex-col items-center justify-center overflow-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {/* Card Border */}
              <div className="absolute inset-0 rounded-3xl border-4 border-coral-red"></div>
              
              {/* Background Pattern - Confetti */}
              <div className="absolute inset-0 opacity-20">
                {/* Confetti pieces */}
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      backgroundColor: ['#FF69B4', '#FFB6C1', '#FFD700', '#87CEEB', '#98FB98'][Math.floor(Math.random() * 5)],
                      animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>

              {/* Main Content */}
              <div className="relative z-10 text-center">
                {/* Banner with "HAPPY" */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-pink-500 text-white px-4 py-2 rounded-full mb-2 inline-block"
                  style={{ transform: 'skew(-5deg)' }}
                >
                  <span className="font-bold text-lg">HAPPY</span>
                </motion.div>

                {/* Large "Birthday" text */}
                <motion.h3
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="text-4xl md:text-5xl font-dancing font-bold text-dark-blue mb-2"
                >
                  Birthday
                </motion.h3>

                {/* Banner with "TO YOU" */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-light-blue text-white px-4 py-2 rounded-full mb-4 inline-block"
                  style={{ transform: 'skew(5deg)' }}
                >
                  <span className="font-bold text-lg">TO YOU</span>
                </motion.div>

                {/* Balloons */}
                <div className="absolute top-4 left-4 text-3xl animate-bounce-gentle">🎈</div>
                <div className="absolute top-6 right-6 text-3xl animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>🎈</div>

                {/* Pennants */}
                <div className="absolute top-0 left-0 right-0 flex justify-between px-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-6 ${i % 2 === 0 ? 'bg-pink-400' : 'bg-light-blue'} rounded-t-full`}
                    />
                  ))}
                </div>

                {/* Streamers */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-8 left-8 w-1 h-16 bg-pink-400 transform rotate-12"></div>
                  <div className="absolute top-12 right-8 w-1 h-12 bg-light-blue transform -rotate-12"></div>
                </div>
              </div>

              {/* Floating elements animation */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {floatingElements.map((element, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-pink-400 text-2xl"
                    initial={{ 
                      x: Math.random() * 300 - 150,
                      y: 400,
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{ 
                      y: -100,
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.8,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                  >
                    {element}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Back of Card - Inside Message */}
            <motion.div
              className="absolute inset-0 backface-hidden rounded-3xl p-8 flex flex-col items-center justify-center overflow-hidden"
              style={{ 
                backfaceVisibility: 'hidden', 
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)'
              }}
            >
              {/* Back Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-6 left-6 w-10 h-10 bg-white rounded-full"></div>
                <div className="absolute top-12 right-8 w-8 h-8 bg-white rounded-full"></div>
                <div className="absolute bottom-8 left-10 w-6 h-6 bg-white rounded-full"></div>
                <div className="absolute bottom-12 right-6 w-7 h-7 bg-white rounded-full"></div>
              </div>

              <div className="relative z-10 text-center">
                {/* "Happy Birthday!" text */}
                <motion.h3
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-dark-blue mb-2 italic"
                >
                  Happy Birthday!
                </motion.h3>

                {/* Name */}
                <motion.h4
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                  className="text-3xl font-bold text-dark-blue mb-4 italic"
                >
                  My Love
                </motion.h4>

                {/* Cake Slice */}
                <motion.div
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  className="text-6xl mb-4"
                >
                  🍰
                </motion.div>

                {/* Personal Message */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="text-sm text-dark-blue italic mb-2 leading-relaxed"
                >
                  I hope your special day will bring you lots of happiness, love, and fun. You deserve them a lot. Enjoy!
                </motion.p>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-sm text-dark-blue italic"
                >
                  Hope your day goes great!
                </motion.p>
              </div>

              {/* Back Decorative Elements */}
              <div className="absolute top-3 left-3 text-xl animate-sparkle-rotate">🎊</div>
              <div className="absolute top-6 right-6 text-lg animate-bounce-gentle">🎈</div>
              <div className="absolute bottom-6 left-6 text-xl animate-float-slow">🎁</div>
              <div className="absolute bottom-8 right-8 text-lg animate-sparkle">💝</div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            variants={detailVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`w-full ${type === 'birthday' ? 'birthday-detail-card' : 'girlfriend-detail-card'}`}
          >
            {/* Header with Enhanced Design */}
            <div className="text-center mb-8 relative">
              {/* Background Decorative Elements */}
              <div className="absolute inset-0 flex justify-center items-center opacity-5">
                <div className="text-9xl">{emoji}</div>
              </div>

              <motion.h2
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-5xl font-dancing font-bold gradient-text mb-4 relative z-10"
              >
                {title}
              </motion.h2>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-text/90 mb-6 relative z-10"
              >
                {messages[0]}
              </motion.p>

              {/* Decorative Border */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
            </div>

            {/* Enhanced Photo Gallery */}
            <div className="relative mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="relative overflow-hidden rounded-3xl shadow-2xl"
              >
                <motion.img
                  key={currentPhotoIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={photos[currentPhotoIndex]}
                  alt={`${type} photo`}
                  className="w-full h-80 object-cover"
                />
                
                {/* Photo Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 photo-nav-button hover:scale-110 transition-transform"
                >
                  ←
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 photo-nav-button hover:scale-110 transition-transform"
                >
                  →
                </button>

                {/* Photo Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        index === currentPhotoIndex 
                          ? 'bg-primary scale-125 shadow-lg' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Enhanced Messages */}
            <div className="text-center space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
              >
                {messages.slice(1).map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                    className={`p-6 rounded-2xl ${
                      type === 'birthday' ? 'message-bubble-birthday' : 'message-bubble-girlfriend'
                    }`}
                  >
                    <p className="text-lg text-text/90 leading-relaxed italic">
                      "{message}"
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Enhanced Music Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="absolute top-6 right-6 flex items-center gap-3 bg-white/30 backdrop-blur-sm rounded-full p-3 shadow-lg"
            >
              <button onClick={toggleMusic} className="cat-button p-2 hover:scale-110 transition-transform">
                {musicEnabled ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 h-2 bg-white/40 rounded-lg appearance-none cursor-pointer"
              />
              <Music size={20} className="text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 