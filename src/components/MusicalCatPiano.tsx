"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Music,
  Play,
  Pause,
  ArrowLeft,
  Volume2,
  Sparkles,
} from "lucide-react";
import { useGameStore } from "@/store/gameStore";

interface MusicalCatPianoProps {
  onBack: () => void;
}

interface CatNote {
  id: number;
  emoji: string;
  note: string;
  frequency: number;
  color: string;
  name: string;
}

export default function MusicalCatPiano({ onBack }: MusicalCatPianoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMelody, setCurrentMelody] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedMelody, setRecordedMelody] = useState<string[]>([]);
  const { triggerHapticFeedback } = useGameStore();

  const catNotes: CatNote[] = [
    {
      id: 1,
      emoji: "🐱",
      note: "C",
      frequency: 261.63,
      color: "#FF69B4",
      name: "Do Cat",
    },
    {
      id: 2,
      emoji: "🐈",
      note: "D",
      frequency: 293.66,
      color: "#FFB6C1",
      name: "Re Cat",
    },
    {
      id: 3,
      emoji: "🐈‍⬛",
      note: "E",
      frequency: 329.63,
      color: "#FFD700",
      name: "Mi Cat",
    },
    {
      id: 4,
      emoji: "😺",
      note: "F",
      frequency: 349.23,
      color: "#87CEEB",
      name: "Fa Cat",
    },
    {
      id: 5,
      emoji: "😸",
      note: "G",
      frequency: 392.0,
      color: "#98FB98",
      name: "Sol Cat",
    },
    {
      id: 6,
      emoji: "😹",
      note: "A",
      frequency: 440.0,
      color: "#DDA0DD",
      name: "La Cat",
    },
    {
      id: 7,
      emoji: "😻",
      note: "B",
      frequency: 493.88,
      color: "#F0E68C",
      name: "Si Cat",
    },
    {
      id: 8,
      emoji: "🙀",
      note: "C2",
      frequency: 523.25,
      color: "#FFA07A",
      name: "High Do Cat",
    },
  ];

  // Pre-programmed "our song" melody
  const ourSong = ["C", "E", "G", "C2", "G", "E", "C"];

  const playNote = (note: CatNote) => {
    triggerHapticFeedback();

    // Create audio context for the note
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(
      note.frequency,
      audioContext.currentTime
    );
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.5
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);

    // Add to current melody if recording
    if (isRecording) {
      setCurrentMelody([...currentMelody, note.note]);
    }
  };

  const playMelody = (melody: string[]) => {
    if (melody.length === 0) return;

    setIsPlaying(true);
    let index = 0;

    const playNextNote = () => {
      if (index >= melody.length) {
        setIsPlaying(false);
        return;
      }

      const noteName = melody[index];
      const note = catNotes.find((n) => n.note === noteName);

      if (note) {
        playNote(note);
      }

      index++;
      setTimeout(playNextNote, 500);
    };

    playNextNote();
  };

  const startRecording = () => {
    setIsRecording(true);
    setCurrentMelody([]);
    triggerHapticFeedback();
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordedMelody([...currentMelody]);
    setCurrentMelody([]);
    triggerHapticFeedback();
  };

  const playOurSong = () => {
    playMelody(ourSong);
  };

  const clearMelody = () => {
    setCurrentMelody([]);
    setRecordedMelody([]);
    triggerHapticFeedback();
  };

  return (
    <div className="min-h-screen p-4 pt-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300"></div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="absolute top-20 left-4 cat-button p-3 z-50"
      >
        <ArrowLeft size={20} />
      </motion.button>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-dancing font-bold gradient-text mb-4">
            Musical Cat Piano 🎹
          </h1>
          <p className="text-lg text-gray-600">
            Tap the cats to create beautiful melodies together
          </p>
        </motion.div>

        {/* Piano Keys */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20 mb-8">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {catNotes.map((note, index) => (
              <motion.div
                key={note.id}
                className="relative cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => playNote(note)}
              >
                <div
                  className="p-4 rounded-xl text-center transition-all duration-300 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${note.color} 0%, ${note.color}dd 100%)`,
                    border: "2px solid white",
                  }}
                >
                  <div className="text-3xl md:text-4xl mb-2">{note.emoji}</div>
                  <div className="text-sm font-medium text-white">
                    {note.name}
                  </div>
                  <div className="text-xs text-white/80">{note.note}</div>
                </div>

                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: `radial-gradient(circle, ${note.color}40 0%, transparent 70%)`,
                    opacity: 0,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Recording Controls */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-xl font-dancing font-bold mb-4 text-center">
              Record Your Melody
            </h3>
            <div className="flex justify-center gap-4 mb-4">
              <motion.button
                onClick={startRecording}
                disabled={isRecording}
                className={`cat-button ${
                  isRecording ? "opacity-50 cursor-not-allowed" : ""
                }`}
                whileHover={!isRecording ? { scale: 1.05 } : {}}
                whileTap={!isRecording ? { scale: 0.95 } : {}}
              >
                {isRecording ? "Recording..." : "Start Recording"}
              </motion.button>
              <motion.button
                onClick={stopRecording}
                disabled={!isRecording}
                className={`cat-button ${
                  !isRecording ? "opacity-50 cursor-not-allowed" : ""
                }`}
                whileHover={isRecording ? { scale: 1.05 } : {}}
                whileTap={isRecording ? { scale: 0.95 } : {}}
              >
                Stop Recording
              </motion.button>
            </div>

            {recordedMelody.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Your Melody:</p>
                <div className="flex justify-center gap-2 mb-4">
                  {recordedMelody.map((note, index) => (
                    <motion.div
                      key={index}
                      className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {note}
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  onClick={() => playMelody(recordedMelody)}
                  disabled={isPlaying}
                  className="cat-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? "Playing..." : "Play Your Melody"}
                </motion.button>
              </div>
            )}
          </div>

          {/* Special Features */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-xl font-dancing font-bold mb-4 text-center">
              Special Songs
            </h3>
            <div className="space-y-4">
              <motion.button
                onClick={playOurSong}
                disabled={isPlaying}
                className="w-full cat-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🎵 Play "Our Song"
              </motion.button>

              <motion.button
                onClick={clearMelody}
                className="w-full cat-button bg-gray-500 hover:bg-gray-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🗑️ Clear Melody
              </motion.button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Current Melody:</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {currentMelody.map((note, index) => (
                  <motion.div
                    key={index}
                    className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-xs font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {note}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <h3 className="text-lg font-dancing font-bold mb-4 text-center">
            How to Use
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="text-center">
              <div className="text-2xl mb-2">👆</div>
              <p>Tap any cat to play its note</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎙️</div>
              <p>Record your own melody</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎵</div>
              <p>Play special songs together</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
