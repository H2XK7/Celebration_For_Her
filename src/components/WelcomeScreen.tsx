"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Camera, Music, Gift } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  const floatingElements = ["🎂", "🎈", "🎊", "🎉", "🎁", "✨", "💕", "❤️"];

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            initial={{
              x: Math.random() * windowSize.width,
              y: Math.random() * windowSize.height,
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="text-center max-w-4xl relative z-10">
        {/* Main Emoji */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="text-9xl mb-8"
        >
          🎂
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-5xl md:text-7xl font-dancing font-bold gradient-text mb-6"
        >
          Happy Birthday, My Love! 💕
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-xl md:text-2xl text-text/90 mb-8 leading-relaxed"
        >
          A special celebration just for you, with love and memories that will
          last forever
        </motion.p>

        {/* Feature Icons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center gap-8 mb-12"
        >
          {[
            { icon: Gift, label: "Special Cards" },
            { icon: Camera, label: "Photo Gallery" },
            { icon: Music, label: "Voice Messages" },
            { icon: Heart, label: "Love Notes" },
          ].map(({ icon: Icon, label }, index) => (
            <motion.div
              key={label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                <Icon size={24} className="text-primary" />
              </div>
              <span className="text-sm text-text/70 font-medium">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Start Button */}
        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6 }}
          onClick={onStart}
          className="enhanced-button text-2xl px-12 py-6 flex items-center gap-3 mx-auto shimmer"
        >
          <Gift size={32} />
          Open Your Special Cards! 🎊
        </motion.button>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {floatingElements.map((element, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl md:text-4xl"
              initial={{
                x: Math.random() * windowSize.width,
                y: windowSize.height + 100,
                opacity: 0,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                y: -200,
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 6,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut",
              }}
            >
              {element}
            </motion.div>
          ))}
        </div>

        {/* Decorative Border */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.0, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
        />

        {/* Heartbeat Effect */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}
