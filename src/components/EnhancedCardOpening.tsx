"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Camera,
  Music,
  Play,
  Pause,
  ArrowLeft,
  Volume2,
  Sparkles,
  Gift,
} from "lucide-react";
import { useGameStore } from "@/store/gameStore";

interface EnhancedCardOpeningProps {
  cardType: "birthday" | "girlfriend" | "memory";
  onPhotoTap: () => void;
  onBack: () => void;
}

interface CardContent {
  greeting: string;
  name: string;
  message: string;
  photoCaption: string;
  visualElements: string[];
  backgroundMusic: string;
  voiceMessage?: string;
}

export default function EnhancedCardOpening({
  cardType,
  onPhotoTap,
  onBack,
}: EnhancedCardOpeningProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showInterior, setShowInterior] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [backgroundAudio, setBackgroundAudio] =
    useState<HTMLAudioElement | null>(null);
  const { triggerHapticFeedback, playConfetti } = useGameStore();

  const cardContent: Record<string, CardContent> = {
    birthday: {
      greeting: "Happy Birthday Miaaa",
      name: "My Love",
      message:
        "From the moment I first saw you on 2/5/2025, my world changed forever. You're not just gorgeous on the outside - your mind and heart are even more beautiful. You're like Wonder Woman - strong, clever, and with such an incredible mindset. Every day with you feels like a miracle, and I'm so grateful that our paths crossed. You've made my life so much brighter just by being you. I love you more than words could ever express.",
      photoCaption: "The moment I knew you were special",
      visualElements: ["🎂", "🎈", "🎊", "🎉", "🎁", "✨"],
      backgroundMusic: "/audio/Happy Birthday To You.mp3",
      voiceMessage: "/audio/birthday-voice.mp3",
    },
    girlfriend: {
      greeting: "Happy Girlfriend Day",
      name: "Mia Mitvella Anak Bapaknya",
      message:
        "My dearest Mia Mitvella Anak Bapaknya, from the moment I first connected with you on 2/5/2025, my heart has been completely yours. You're not just the most beautiful woman I've ever seen - your soul, your mind, and your heart are even more breathtaking. You're like Wonder Woman - strong, clever, and with such an incredible mindset that makes me fall in love with you more every day. Every moment we share together, even across the distance, feels like a dream come true, and I'm so grateful that our paths crossed. You've filled my heart with so much love and joy, and I promise to cherish and adore you forever. I love you more than words could ever express, my beautiful Mia. You are my everything. 💕",
      photoCaption: "The moment my heart became yours",
      visualElements: ["💕", "❤️", "🌹", "💖", "✨", "🌸"],
      backgroundMusic: "/audio/The 1975 - About You(cut).mp3",
      voiceMessage: "/audio/love-voice.mp3",
    },
    memory: {
      greeting: "Our Love Story",
      name: "My Darling",
      message:
        "Every moment with you is a gift I cherish. Your smile lights up my world, and your love makes every day feel special.",
      photoCaption: "When you make me smile the most",
      visualElements: ["⭐", "🌟", "💫", "✨", "📷", "💝"],
      backgroundMusic: "/audio/memory-song.mp3",
      voiceMessage: "/audio/memory-voice.mp3",
    },
  };

  const content = cardContent[cardType];

  // Two photos for each card type
  const photos = {
    birthday: ["/photos/Picture 1.jpg", "/photos/Picture 2.jpg"],
    girlfriend: ["/photos/Picture 3.jpg", "/photos/Picture 4.jpg"],
    memory: ["/photos/Picture 1.jpg", "/photos/Picture 2.jpg"],
  };

  const currentPhotos = photos[cardType];

  // Debug: Log the current photos
  console.log("Current photos:", currentPhotos);
  console.log("Card type:", cardType);

  // Add state to track image loading
  const [imageLoadStatus, setImageLoadStatus] = useState({
    photo1: false,
    photo2: false,
  });
  const [showPhotoDetail, setShowPhotoDetail] = useState(false);
  const [currentPhotoNumber, setCurrentPhotoNumber] = useState(0);

  const handleImageLoad = (photoNumber: number) => {
    setImageLoadStatus((prev) => ({
      ...prev,
      [`photo${photoNumber}`]: true,
    }));
    console.log(`Photo ${photoNumber} loaded successfully`);
  };

  const handleImageError = (photoNumber: number, originalSrc: string) => {
    console.log(`Photo ${photoNumber} failed to load:`, originalSrc);
    return `/photos/fallback-${photoNumber}.jpg`;
  };

  const handlePhotoTap = () => {
    onPhotoTap();
  };

  const handleBackToPhotos = () => {
    setShowPhotoDetail(false);
    setCurrentPhotoNumber(0);
  };

  // Simple function to show photo detail
  const showPhotoDetailView = (photoNumber: number) => {
    console.log(`Showing photo detail for photo ${photoNumber}`);
    setCurrentPhotoNumber(photoNumber);
    setShowPhotoDetail(true);
  };

  // Simple photo detail content
  const getPhotoDetails = (photoNumber: number) => {
    if (photoNumber === 1) {
      return {
        title: "Picture 1 - Our First Meeting",
        date: "March 15, 2023",
        notes: [
          "The day I first saw your beautiful smile",
          "You were wearing that pretty dress",
          "I couldn't stop staring at you",
          "Your laugh made my heart skip a beat",
          "I knew right then you were special",
          "The beginning of our love story 💕",
        ],
      };
    } else if (photoNumber === 2) {
      return {
        title: "Picture 2 - Our First Adventure",
        date: "April 22, 2023",
        notes: [
          "Our first trip together was magical",
          "You were so excited about everything",
          "I loved seeing the world through your eyes",
          "Every moment with you is an adventure",
          "You make everything so much fun",
          "My favorite travel companion 🌟",
        ],
      };
    }
    return null;
  };

  // Handle card flip when clicked
  const handleCardFlip = () => {
    console.log("Card flip button clicked!");
    if (!isFlipped) {
      setIsFlipped(true);
      triggerHapticFeedback();

      // Play flip sound
      const flipAudio = new Audio("/audio/card-flip.mp3");
      flipAudio.volume = 0.4;
      flipAudio.play().catch(console.error);

      // Show interior after flip
      setTimeout(() => {
        setShowInterior(true);
        playConfetti();

        // Start background music
        const music = new Audio(content.backgroundMusic);
        music.volume = 0.3;
        music.loop = true;
        setBackgroundAudio(music);
        music
          .play()
          .then(() => {
            setIsMusicPlaying(true);
          })
          .catch(console.error);
      }, 800);
    }
  };

  const handleMusicToggle = () => {
    triggerHapticFeedback();
    if (backgroundAudio) {
      if (isMusicPlaying) {
        backgroundAudio.pause();
        setIsMusicPlaying(false);
      } else {
        backgroundAudio.play();
        setIsMusicPlaying(true);
      }
    }
  };

  // Cleanup function to stop music when component unmounts
  const cleanupMusic = () => {
    if (backgroundAudio) {
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
      setIsMusicPlaying(false);
    }
  };

  // Stop music when user goes back
  const handleBackWithMusicStop = () => {
    cleanupMusic();
    onBack();
  };

  // Cleanup music when component unmounts
  useEffect(() => {
    return () => {
      cleanupMusic();
    };
  }, []);

  const cardVariants = {
    front: {
      rotateY: 0,
      scale: 1,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    },
    back: {
      rotateY: 180,
      scale: 1.02,
      boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
    },
  };

  const interiorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  // If photo detail is shown, render the detail view
  if (showPhotoDetail && currentPhotoNumber > 0) {
    const detail = getPhotoDetails(currentPhotoNumber);
    if (!detail) return null;

    return (
      <div className="min-h-screen p-4 pt-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300"></div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={handleBackToPhotos}
          className="absolute top-20 left-4 cat-button p-3 z-50"
        >
          <ArrowLeft size={20} />
        </motion.button>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Simple Photo Detail Layout */}
          <motion.div
            className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border-4 border-pink-200 overflow-hidden"
            style={{ minHeight: "600px" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col lg:flex-row h-full">
              {/* Left Side - Photo */}
              <div className="w-full lg:w-1/2 p-6 flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
                <motion.div
                  className="relative w-full max-w-sm"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <img
                    src={currentPhotos[currentPhotoNumber - 1]}
                    alt={`Photo ${currentPhotoNumber}`}
                    className="w-full h-80 object-contain rounded-lg shadow-lg border-2 border-pink-200"
                  />
                </motion.div>
              </div>

              {/* Right Side - Notebook Notes */}
              <div className="w-full lg:w-1/2 p-6 bg-white flex flex-col justify-center">
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {/* Title */}
                  <div className="text-center">
                    <h2 className="text-2xl lg:text-3xl font-dancing font-bold text-pink-600 mb-2">
                      {detail.title}
                    </h2>
                    <p className="text-sm text-gray-500 font-medium">
                      {detail.date}
                    </p>
                  </div>

                  {/* Notebook Paper Background */}
                  <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 shadow-sm">
                    <div className="space-y-4">
                      {detail.notes.map((note, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <span className="text-pink-400 text-lg mt-0.5">
                            •
                          </span>
                          <p className="text-base text-gray-700 flex-1 font-medium">
                            {note}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Continue Button */}
                  <motion.div
                    className="text-center pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0 }}
                  >
                    <motion.button
                      onClick={handlePhotoTap}
                      className="bg-pink-500 text-white px-8 py-4 rounded-full font-dancing font-bold shadow-lg hover:shadow-xl transition-all hover:bg-pink-600 text-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue Our Journey ✨
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pt-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300"></div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={handleBackWithMusicStop}
        className="absolute top-20 left-4 cat-button p-3 z-50"
      >
        <ArrowLeft size={20} />
      </motion.button>

      {/* Music Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full p-2"
      >
        <button onClick={handleMusicToggle} className="cat-button p-2">
          {isMusicPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <Music size={20} className="text-white" />
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* 3D Card Container - Greeting Card Book Style */}
        <div className="perspective-1000">
          <motion.div
            className="relative w-full max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto transform-style-preserve-3d"
            style={{
              aspectRatio: "4/3", // Changed from 3/4 to 4/3 for wider card
              minHeight: "600px", // Increased from 400px
              maxHeight: "90vh", // Increased from 80vh
            }}
            animate={isFlipped ? "back" : "front"}
            variants={cardVariants}
            transition={{
              duration: 1.2,
              ease: "cubic-bezier(0.4, 0.0, 0.2, 1)",
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            {/* Front of Card - Traditional Greeting Card Design */}
            <motion.div
              className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              {/* Card Border - Thick border like real greeting card */}
              <div className="absolute inset-0 rounded-2xl border-8 border-coral-red bg-white"></div>

              {/* Background Pattern - Confetti */}
              <div className="absolute inset-0 opacity-20">
                {content.visualElements.map((element, i) => (
                  <div
                    key={i}
                    className="absolute text-xl md:text-2xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `float ${
                        3 + Math.random() * 2
                      }s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  >
                    {element}
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                {/* Banner with "HAPPY" */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-pink-500 text-white px-3 py-1 rounded-full mb-2 inline-block"
                  style={{ transform: "skew(-5deg)" }}
                >
                  <span className="font-bold text-sm md:text-base">HAPPY</span>
                </motion.div>

                {/* Large dynamic text based on card type */}
                <motion.h3
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="text-2xl md:text-4xl font-dancing font-bold text-dark-blue mb-2"
                >
                  {cardType === "birthday"
                    ? "Birthday"
                    : cardType === "girlfriend"
                    ? "Girlfriend Day"
                    : "Love Story"}
                </motion.h3>

                {/* Banner with "TO YOU" */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-light-blue text-white px-3 py-1 rounded-full mb-4 inline-block"
                  style={{ transform: "skew(5deg)" }}
                >
                  <span className="font-bold text-sm md:text-base">TO YOU</span>
                </motion.div>

                {/* Open Card Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  onClick={handleCardFlip}
                  className="bg-pink-500 text-white px-6 py-3 rounded-full font-dancing font-bold shadow-lg hover:shadow-xl transition-all hover:bg-pink-600 text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Open Your Card 🎁
                </motion.button>
              </div>
            </motion.div>

            {/* Back of Card - Interior (Greeting Card Book Style) */}
            <motion.div
              className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
              }}
            >
              <AnimatePresence>
                {showInterior && (
                  <motion.div
                    variants={interiorVariants}
                    initial="hidden"
                    animate="visible"
                    className="h-full flex flex-col lg:flex-row"
                  >
                    {/* Content */}
                    <div className="p-1 md:p-2 lg:p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 md:gap-2 lg:gap-4 items-center">
                        {/* Left Side - Greeting Message */}
                        <div className="w-full lg:w-1/2 p-1 md:p-2 flex flex-col justify-center relative">
                          {/* Confetti Cascade */}
                          <div className="absolute inset-0 pointer-events-none">
                            {[...Array(15)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full"
                                style={{
                                  backgroundColor: [
                                    "#FF69B4",
                                    "#FFB6C1",
                                    "#FFD700",
                                    "#87CEEB",
                                    "#98FB98",
                                  ][Math.floor(Math.random() * 5)],
                                  left: `${Math.random() * 100}%`,
                                  top: "-10px",
                                }}
                                initial={{ y: -10, opacity: 0 }}
                                animate={{
                                  y: 300,
                                  opacity: [0, 1, 0],
                                  rotate: 360,
                                }}
                                transition={{
                                  duration: 3,
                                  delay: i * 0.1,
                                  ease: "easeOut",
                                }}
                              />
                            ))}
                          </div>

                          {/* Greeting Content */}
                          <div className="relative z-10 text-center">
                            <motion.h2
                              initial={{ y: -20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-dancing font-bold text-dark-blue mb-1 md:mb-2"
                            >
                              {content.greeting}!
                            </motion.h2>

                            <motion.h3
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                delay: 0.3,
                                type: "spring",
                                stiffness: 200,
                              }}
                              className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-dancing font-bold text-dark-blue mb-2 md:mb-3"
                            >
                              {content.name}
                            </motion.h3>

                            {/* Animated Cats */}
                            <div className="flex justify-center gap-1 mb-2 md:mb-3">
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="text-sm md:text-lg lg:text-xl xl:text-2xl"
                                  animate={{
                                    y: [0, -5, 0],
                                    rotate: [0, 3, -3, 0],
                                  }}
                                  transition={{
                                    duration: 2,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                  }}
                                >
                                  🐱
                                </motion.div>
                              ))}
                            </div>

                            <motion.p
                              initial={{ y: 15, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.5 }}
                              className="text-xs md:text-sm lg:text-base text-dark-blue italic leading-tight px-1 md:px-2"
                            >
                              {content.message}
                            </motion.p>
                          </div>
                        </div>

                        {/* Photo Display Section */}
                        <div className="w-full lg:w-1/2 p-1 md:p-2 lg:p-4 flex flex-col justify-center relative z-50">
                          {/* Two Separate Photo Cards */}
                          <motion.div
                            className="relative mx-auto w-full max-w-xs lg:max-w-sm space-y-1 md:space-y-2"
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              delay: 0.8,
                              type: "spring",
                              stiffness: 200,
                            }}
                          >
                            {/* First Photo Card */}
                            <div className="bg-white p-1 md:p-2 rounded-lg shadow-md transform -rotate-1 border border-gray-300 w-full">
                              <div className="relative">
                                <div className="text-xs md:text-sm text-black font-dancing text-center font-bold bg-pink-200 px-2 md:px-3 py-1 md:py-2 rounded border border-pink-300 relative z-20 shadow-sm">
                                  Photo 1{" "}
                                  {!imageLoadStatus.photo1 && (
                                    <span className="text-xs text-gray-600">
                                      (Loading...)
                                    </span>
                                  )}
                                </div>
                                <div className="relative">
                                  <img
                                    src={currentPhotos[0]}
                                    alt={`${cardType} photo 1`}
                                    className="w-full h-12 md:h-16 lg:h-20 object-contain rounded cursor-pointer hover:opacity-80 transition-opacity relative z-40"
                                    style={{ zIndex: 40 }}
                                    onClick={() => {
                                      alert(
                                        "Picture 1 clicked! Opening detail view..."
                                      );
                                      console.log(
                                        "Picture 1 clicked, showing detail view"
                                      );
                                      showPhotoDetailView(1);
                                    }}
                                    onError={(e) => {
                                      const fallbackSrc = handleImageError(
                                        1,
                                        currentPhotos[0]
                                      );
                                      e.currentTarget.src = fallbackSrc;
                                    }}
                                    onLoad={() => handleImageLoad(1)}
                                  />
                                  {/* Fallback placeholder if image fails */}
                                  {!imageLoadStatus.photo1 && (
                                    <div className="absolute inset-0 bg-gray-100 rounded flex items-center justify-center">
                                      <div className="text-gray-400 text-xs">
                                        Loading photo...
                                      </div>
                                    </div>
                                  )}
                                  {/* Heart on first photo */}
                                  <div className="absolute top-1 right-1 text-red-500 text-xs md:text-base">
                                    💖
                                  </div>
                                </div>
                                {/* Birthday cake below photo */}
                                <div className="text-center mt-1">
                                  <span className="text-xs md:text-base">
                                    🎂
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Second Photo Card */}
                            <div className="bg-white p-1 md:p-2 rounded-lg shadow-md transform rotate-1 border border-gray-300 w-full">
                              <div className="relative">
                                <div className="text-xs md:text-sm text-black font-dancing text-center font-bold bg-pink-200 px-2 md:px-3 py-1 md:py-2 rounded border border-pink-300 relative z-20 shadow-sm">
                                  Photo 2{" "}
                                  {!imageLoadStatus.photo2 && (
                                    <span className="text-xs text-gray-600">
                                      (Loading...)
                                    </span>
                                  )}
                                </div>
                                <div className="relative">
                                  <img
                                    src={currentPhotos[1]}
                                    alt={`${cardType} photo 2`}
                                    className="w-full h-12 md:h-16 lg:h-20 object-contain rounded cursor-pointer hover:opacity-80 transition-opacity relative z-40"
                                    style={{ zIndex: 40 }}
                                    onClick={() => {
                                      alert(
                                        "Picture 2 clicked! Opening detail view..."
                                      );
                                      console.log(
                                        "Picture 2 clicked, showing detail view"
                                      );
                                      showPhotoDetailView(2);
                                    }}
                                    onError={(e) => {
                                      const fallbackSrc = handleImageError(
                                        2,
                                        currentPhotos[1]
                                      );
                                      e.currentTarget.src = fallbackSrc;
                                    }}
                                    onLoad={() => handleImageLoad(2)}
                                  />
                                  {/* Fallback placeholder if image fails */}
                                  {!imageLoadStatus.photo2 && (
                                    <div className="absolute inset-0 bg-gray-100 rounded flex items-center justify-center">
                                      <div className="text-gray-400 text-xs">
                                        Loading photo...
                                      </div>
                                    </div>
                                  )}
                                  {/* Hearts on second photo */}
                                  <div className="absolute top-1 right-1 text-pink-500 text-xs md:text-base">
                                    💕💕
                                  </div>
                                </div>
                                {/* Umbrella below photo */}
                                <div className="text-center mt-1">
                                  <span className="text-xs md:text-base">
                                    ☂️
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Sparkles around both cards */}
                            <div className="absolute inset-0 pointer-events-none">
                              {[...Array(2)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                                  style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    zIndex: 1,
                                  }}
                                  animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0],
                                  }}
                                  transition={{
                                    duration: 2,
                                    delay: i * 0.3,
                                    repeat: Infinity,
                                  }}
                                />
                              ))}
                            </div>
                          </motion.div>

                          {/* Photo Caption */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0 }}
                            className="text-center mt-1"
                          >
                            <p className="text-xs md:text-sm text-gray-800 font-dancing font-bold bg-white px-2 py-1 rounded shadow-sm border border-gray-200">
                              {content.photoCaption}
                            </p>
                          </motion.div>

                          {/* Cat Paw Prints */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1 }}
                            className="text-center mt-1"
                          >
                            <div className="text-gray-400 text-xs">
                              🐾🐾🐾🐾🐾
                            </div>
                          </motion.div>

                          {/* Decorative Elements */}
                          <div className="absolute inset-0 pointer-events-none">
                            {content.visualElements
                              .slice(0, 3)
                              .map((element, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute text-xl lg:text-2xl"
                                  style={{
                                    left: `${20 + i * 20}%`,
                                    top: `${30 + i * 15}%`,
                                  }}
                                  animate={{
                                    y: [0, -5, 0],
                                    rotate: [0, 5, -5, 0],
                                  }}
                                  transition={{
                                    duration: 3,
                                    delay: i * 0.5,
                                    repeat: Infinity,
                                  }}
                                >
                                  {element}
                                </motion.div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
