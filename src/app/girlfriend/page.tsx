"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import EnhancedCardOpening from "@/components/EnhancedCardOpening";
import InteractiveGames from "@/components/InteractiveGames";
import MusicalCatPiano from "@/components/MusicalCatPiano";

type ViewState = "card-opening" | "games" | "piano";

export default function GirlfriendPage() {
  const [currentView, setCurrentView] = useState<ViewState>("card-opening");
  const [showConfetti, setShowConfetti] = useState(false);
  const [unlockedPhotos, setUnlockedPhotos] = useState<number[]>([]);
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const { triggerHapticFeedback } = useGameStore();

  const handlePhotoTap = () => {
    triggerHapticFeedback();
    setCurrentView("games");
  };

  const handleGameComplete = (gameId: string, photoIndex: number) => {
    triggerHapticFeedback();
    setCompletedGames([...completedGames, gameId]);
    setUnlockedPhotos([...unlockedPhotos, photoIndex]);
  };

  const handleBackToCards = () => {
    triggerHapticFeedback();
    setCurrentView("card-opening");
  };

  const handlePianoClick = () => {
    triggerHapticFeedback();
    setCurrentView("piano");
  };

  const handleBackToGames = () => {
    triggerHapticFeedback();
    setCurrentView("games");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300"></div>

      <AnimatePresence mode="wait">
        {currentView === "card-opening" && (
          <motion.div
            key="card-opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
          >
            <EnhancedCardOpening
              cardType="girlfriend"
              onPhotoTap={handlePhotoTap}
              onBack={() => window.history.back()}
            />
          </motion.div>
        )}

        {currentView === "games" && (
          <motion.div
            key="games"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
          >
            <InteractiveGames
              onGameComplete={handleGameComplete}
              onPianoClick={handlePianoClick}
              onBack={handleBackToCards}
              completedGames={completedGames}
              unlockedPhotos={unlockedPhotos}
            />
          </motion.div>
        )}

        {currentView === "piano" && (
          <motion.div
            key="piano"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
          >
            <MusicalCatPiano onBack={handleBackToGames} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 