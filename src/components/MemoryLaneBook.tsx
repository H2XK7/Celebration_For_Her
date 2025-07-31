"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart, Music, ArrowLeft, Play, Pause } from "lucide-react";
import { useGameStore } from "@/store/gameStore";

interface MemoryLaneBookProps {
  onBack: () => void;
}

interface MemoryPage {
  id: number;
  title: string;
  date: string;
  photo: string;
  video?: string;
  description: string;
  typography: string;
  overlay: string;
  color: string;
  hasVideo?: boolean;
}

export default function MemoryLaneBook({ onBack }: MemoryLaneBookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { triggerHapticFeedback } = useGameStore();

  const memoryPages: MemoryPage[] = [
    {
      id: 1,
      title: "The First Message",
      date: "February 5, 2025",
      photo: "/photos/Picture 1.jpg",
      video: "/video/Video_Her-1.mp4",
      description:
        "The moment I first saw your message, my heart skipped a beat. Even through the screen, I could feel your beautiful soul radiating. Your words touched me in ways I never thought possible. I knew right then that you were someone extraordinary, someone who would change my life forever.",
      typography: "LOVE AT FIRST SIGHT",
      overlay: "REC",
      color: "from-pink-400 to-rose-500",
      hasVideo: true,
    },
    {
      id: 2,
      title: "Our First Conversation",
      date: "February 15, 2025",
      photo: "/photos/Picture 2.jpg",
      video: "/video/Video_Her-2.mp4",
      description:
        "When I first heard your voice and saw your smile through the screen, my world stopped. You were even more beautiful than I imagined. Your laughter filled my room with warmth, and I realized I was falling deeply in love with someone I had never physically touched, yet felt so connected to.",
      typography: "DREAM COME TRUE",
      overlay: "AF",
      color: "from-purple-400 to-pink-500",
      hasVideo: true,
    },
    {
      id: 3,
      title: "Late Night Conversations",
      date: "March 10, 2025",
      photo: "/photos/Picture 3.jpg",
      video: "/video/Video_Her-3.mp4",
      description:
        "Those endless nights talking until sunrise, sharing our deepest fears and wildest dreams. You opened up to me in ways that made me feel so special, so trusted. Your vulnerability and strength combined made me fall in love with you even more. I wish I could hold you during those moments.",
      typography: "PURE MAGIC",
      overlay: "AWB",
      color: "from-blue-400 to-cyan-500",
      hasVideo: true,
    },
    {
      id: 4,
      title: "When You're Tired",
      date: "April 10, 2025",
      photo: "/photos/Picture 4.jpg",
      video: "/video/Video_Her-4.mp4",
      description:
        "Those moments when you share how exhausted you are from studying, but you still make time to talk to me. Your energy might be low, but your love for me never wavers. I wish I could be there to hold you, to let you rest your head on my shoulder, and to tell you everything will be okay.",
      typography: "PASSION FOR LIFE",
      overlay: "4X ZOOM",
      color: "from-orange-400 to-red-500",
      hasVideo: true,
    },
    {
      id: 5,
      title: "Your Strength & Dedication",
      date: "May 1, 2025",
      photo: "/photos/Picture 5.jpg",
      video: "/video/Video_Her.mp4",
      description:
        "Watching you balance your studies, exams, and our relationship with such grace. You're so strong, so determined, and so beautiful. Even when you're tired from studying until midnight, you still find time to share your day with me. I can't wait to be there to support you in person, to hold your hand during exam stress, and to celebrate your successes together.",
      typography: "BREATHTAKING",
      overlay: "MENU",
      color: "from-green-400 to-emerald-500",
      hasVideo: true,
    },
  ];

  const handleNextPage = () => {
    if (currentPage < memoryPages.length - 1) {
      triggerHapticFeedback();
      setCurrentPage(currentPage + 1);
      setIsVideoPlaying(false); // Reset video state
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      triggerHapticFeedback();
      setCurrentPage(currentPage - 1);
      setIsVideoPlaying(false); // Reset video state
    }
  };

  const handleMusicToggle = () => {
    triggerHapticFeedback();
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleVideoToggle = () => {
    triggerHapticFeedback();
    setIsVideoPlaying(!isVideoPlaying);
  };

  const currentMemory = memoryPages[currentPage];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Vintage Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-50">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-200 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-200 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Camera UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Bar */}
        <div className="absolute top-4 left-4 flex items-center gap-4 text-white text-sm font-mono">
          <div className="bg-red-500 px-2 py-1 rounded">
            {currentMemory.overlay}
          </div>
          <div className="bg-black/50 px-2 py-1 rounded">00:00:01:29</div>
        </div>

        {/* Top Right */}
        <div className="absolute top-4 right-4 text-white text-sm font-mono">
          <div className="bg-black/50 px-2 py-1 rounded mb-1">86%</div>
          <div className="bg-black/50 px-2 py-1 rounded">AWB</div>
        </div>

        {/* Bottom Right */}
        <div className="absolute bottom-4 right-4 text-white text-sm font-mono">
          <div className="bg-black/50 px-2 py-1 rounded mb-1">4X ZOOM</div>
          <div className="bg-black/50 px-2 py-1 rounded">MENU ☰</div>
        </div>

        {/* Camera Frame */}
        <div className="absolute inset-4 border-2 border-white/30 rounded-lg"></div>
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="absolute top-6 left-6 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all"
      >
        <ArrowLeft size={20} className="text-gray-700" />
      </motion.button>

      {/* Music Controls */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={handleMusicToggle}
        className="absolute top-6 right-6 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all"
      >
        {isMusicPlaying ? <Pause size={20} /> : <Play size={20} />}
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="max-w-4xl w-full"
          >
            {/* Memory Page */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-100">
              {/* Header */}
              <div
                className={`bg-gradient-to-r ${currentMemory.color} p-6 text-white text-center`}
              >
                <motion.h1
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-3xl md:text-4xl font-dancing font-bold mb-2"
                >
                  {currentMemory.title}
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg opacity-90"
                >
                  {currentMemory.date}
                </motion.p>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Photo Section */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="relative"
                  >
                    {/* Polaroid Style Photo/Video */}
                    <div className="bg-white p-4 shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300">
                      <div className="relative">
                        {currentMemory.hasVideo && isVideoPlaying ? (
                          <video
                            src={currentMemory.video}
                            className="w-full h-64 object-cover rounded"
                            autoPlay
                            loop
                            controls
                            onError={(e) => {
                              console.error("Video error:", e);
                            }}
                          />
                        ) : (
                          <img
                            src={currentMemory.photo}
                            alt={currentMemory.title}
                            className="w-full h-64 object-cover rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "https://via.placeholder.com/400x300?text=Memory+Photo";
                            }}
                          />
                        )}

                        {/* Video Play Button Overlay */}
                        {currentMemory.hasVideo && !isVideoPlaying && (
                          <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.7 }}
                            onClick={handleVideoToggle}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all rounded"
                          >
                            <div className="bg-white/90 p-4 rounded-full shadow-lg">
                              <Play size={32} className="text-gray-800 ml-1" />
                            </div>
                          </motion.button>
                        )}

                        {/* Decorative Elements */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          ❤️
                        </div>
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                          📷
                        </div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-4 -right-4 text-2xl"
                    >
                      ✨
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="absolute -bottom-4 -left-4 text-xl"
                    >
                      🦋
                    </motion.div>
                  </motion.div>

                  {/* Text Section */}
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-6"
                  >
                    {/* Notebook Style */}
                    <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400 shadow-sm">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-gray-700 leading-relaxed text-lg font-medium"
                      >
                        "{currentMemory.description}"
                      </motion.p>

                      {/* Video Indicator */}
                      {currentMemory.hasVideo && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                          className="mt-4 flex items-center gap-2"
                        >
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Play size={16} className="text-blue-600" />
                          </div>
                          <span className="text-sm text-blue-600 font-medium">
                            Video memory available
                          </span>
                          {isVideoPlaying && (
                            <motion.button
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              onClick={handleVideoToggle}
                              className="ml-auto bg-red-500 text-white px-3 py-1 rounded-full text-xs hover:bg-red-600 transition-colors"
                            >
                              Stop Video
                            </motion.button>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Decorative Quote */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-center"
                    >
                      <div className="inline-block bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-full font-dancing text-xl">
                        Forever & Always 💕
                      </div>
                    </motion.div>

                    {/* Page Navigation */}
                    <div className="flex justify-between items-center pt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}
                        className={`px-4 py-2 rounded-full font-medium transition-all ${
                          currentPage === 0
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-pink-500 text-white hover:bg-pink-600"
                        }`}
                      >
                        ← Previous
                      </motion.button>

                      <div className="text-sm text-gray-500">
                        {currentPage + 1} of {memoryPages.length}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextPage}
                        disabled={currentPage === memoryPages.length - 1}
                        className={`px-4 py-2 rounded-full font-medium transition-all ${
                          currentPage === memoryPages.length - 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-pink-500 text-white hover:bg-pink-600"
                        }`}
                      >
                        Next →
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Memories */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {["📸", "💕", "✨", "🦋", "🌹", "💝", "🎀", "💌"][i]}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
