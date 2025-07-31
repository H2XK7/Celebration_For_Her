"use client";

import { motion } from "framer-motion";
import EnhancedCardOpening from "@/components/EnhancedCardOpening";

export default function GirlfriendPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen"
      >
        <EnhancedCardOpening
          cardType="girlfriend"
          onPhotoTap={() => {}} // No action needed
          onBack={() => window.history.back()}
        />
      </motion.div>
    </div>
  );
}
