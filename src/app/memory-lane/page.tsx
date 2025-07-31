"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import MemoryLaneBook from "@/components/MemoryLaneBook";

export default function MemoryLanePage() {
  const { triggerHapticFeedback } = useGameStore();

  const handleBack = () => {
    triggerHapticFeedback();
    window.history.back();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MemoryLaneBook onBack={handleBack} />
    </div>
  );
}
