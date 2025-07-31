"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ParticleEffects from "@/components/ParticleEffects";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 relative overflow-hidden">
      {/* Background Effects */}
      <ParticleEffects />

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-6xl font-dancing font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 mb-4"
            >
              Choose Your Special Day!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-gray-700 font-medium"
            >
              Tap on a card to see your special celebration
            </motion.p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Birthday Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/happy-birthday">
                <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl p-8 shadow-2xl border-2 border-pink-300 hover:border-pink-400 transition-all cursor-pointer h-full">
                  <div className="text-6xl mb-6">🎂</div>
                  <h3 className="text-2xl font-dancing font-bold text-white mb-3">
                    Birthday Celebration
                  </h3>
                  <p className="text-pink-100 text-lg mb-4">
                    Another Year More Beautiful
                  </p>
                  <p className="text-pink-200 text-sm">
                    A special celebration just for you, with love and memories
                    that will last forever
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Girlfriend Day Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/girlfriend">
                <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl p-8 shadow-2xl border-2 border-pink-300 hover:border-pink-400 transition-all cursor-pointer h-full">
                  <div className="text-6xl mb-6">💕</div>
                  <h3 className="text-2xl font-dancing font-bold text-white mb-3">
                    Girlfriend Day Special
                  </h3>
                  <p className="text-pink-100 text-lg mb-4">
                    To My Amazing Girlfriend
                  </p>
                  <p className="text-pink-200 text-sm">
                    Celebrating the amazing woman who makes my life complete
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Memory Lane Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/memory-lane">
                <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl p-8 shadow-2xl border-2 border-pink-300 hover:border-pink-400 transition-all cursor-pointer h-full">
                  <div className="text-6xl mb-6">📸</div>
                  <h3 className="text-2xl font-dancing font-bold text-white mb-3">
                    Memory Lane Journey
                  </h3>
                  <p className="text-pink-100 text-lg mb-4">Our Love Story</p>
                  <p className="text-pink-200 text-sm">
                    A journey through our beautiful memories together
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
