"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export default function IntroductionPage() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEnvelopeOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isEnvelopeOpen) {
      const timer = setTimeout(() => {
        setShowLetter(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isEnvelopeOpen]);

  useEffect(() => {
    if (showLetter) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showLetter]);

  const steps = [
    "Welcome to our special celebration!",
    "This is a journey of love and memories...",
    "Ready to explore the magic?",
  ];

  useEffect(() => {
    if (showContent) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showContent, steps.length]);

  return (
    <div className="min-h-screen bg-teal-800 flex items-center justify-center p-4">
      {/* Background Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-teal-300 text-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Envelope Container */}
        <motion.div
          className="relative mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Envelope Base */}
          <motion.div
            className="w-80 h-48 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg shadow-2xl relative border-2 border-amber-300"
            animate={{
              rotateX: isEnvelopeOpen ? 180 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Envelope Front */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg border-2 border-amber-300">
              {/* Envelope Flap */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-amber-200 to-amber-300 rounded-t-lg"
                style={{
                  clipPath: "polygon(0 0, 50% 60%, 100% 0, 100% 100%, 0 100%)",
                }}
                animate={{
                  rotateX: isEnvelopeOpen ? -180 : 0,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />

              {/* Envelope Seal */}
              <motion.div
                className="absolute top-12 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full border-2 border-pink-700 flex items-center justify-center"
                animate={{
                  scale: isEnvelopeOpen ? 0 : 1,
                  opacity: isEnvelopeOpen ? 0 : 1,
                }}
                transition={{ duration: 0.4 }}
              >
                <Heart className="w-5 h-5 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Letter */}
          <AnimatePresence>
            {showLetter && (
              <motion.div
                className="absolute inset-0 w-64 h-56 bg-white rounded-lg shadow-lg border border-gray-200 mx-auto"
                initial={{ y: 20, opacity: 0, scale: 0.8 }}
                animate={{ y: -15, opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  transform: "translateX(-50%)",
                  left: "50%",
                }}
              >
                {/* Letter Content */}
                <div className="p-4 text-left">
                  <motion.div
                    className="text-sm text-gray-800 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="font-semibold mb-3">Dear Mia,</div>
                    <div className="space-y-1 text-xs leading-relaxed">
                      <div>Every day with you is a gift I cherish</div>
                      <div>deeply. Your smile lights up my world.</div>
                      <div className="mt-2">
                        Today, I've created something special
                      </div>
                      <div>just for you - a celebration of our love.</div>
                      <div className="mt-2">
                        Open your heart and let the magic begin...
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Welcome Message */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="text-2xl font-bold text-white mb-4"
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {steps[currentStep]}
              </motion.div>

              {/* Progress Dots */}
              <div className="flex justify-center space-x-2 mb-6">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep ? "bg-pink-500" : "bg-gray-300"
                    }`}
                    animate={{
                      scale: index === currentStep ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>

              {/* Enter Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <Link href="/homepage">
                  <motion.button
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg flex items-center space-x-2 mx-auto hover:shadow-xl transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-5 h-5" />
                    <span>Enter the Celebration</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Hearts */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 5 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300 text-lg"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
                rotate: [0, 360],
              }}
              transition={{
                duration: 5 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
