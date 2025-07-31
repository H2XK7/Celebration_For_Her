"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Pet {
  id: number;
  x: number;
  y: number;
  direction: number;
  type: "cat" | "dog" | "heart" | "star";
  isWalking: boolean;
}

export default function CutePets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    const initialPets: Pet[] = [
      {
        id: 1,
        x: Math.random() * (windowSize.width - 100),
        y: Math.random() * (windowSize.height - 100),
        direction: Math.random() * 360,
        type: "cat",
        isWalking: true,
      },
      {
        id: 2,
        x: Math.random() * (windowSize.width - 100),
        y: Math.random() * (windowSize.height - 100),
        direction: Math.random() * 360,
        type: "dog",
        isWalking: true,
      },
      {
        id: 3,
        x: Math.random() * (windowSize.width - 100),
        y: Math.random() * (windowSize.height - 100),
        direction: Math.random() * 360,
        type: "heart",
        isWalking: true,
      },
    ];

    setPets(initialPets);

    const interval = setInterval(() => {
      setPets((prevPets) =>
        prevPets.map((pet) => {
          const newDirection = pet.direction + (Math.random() - 0.5) * 20;
          const speed = 0.8;
          const newX = pet.x + Math.cos((newDirection * Math.PI) / 180) * speed;
          const newY = pet.y + Math.sin((newDirection * Math.PI) / 180) * speed;

          let finalX = newX;
          let finalY = newY;
          let finalDirection = newDirection;

          if (newX < 0 || newX > windowSize.width - 50) {
            finalDirection = 180 - newDirection;
            finalX = Math.max(0, Math.min(windowSize.width - 50, newX));
          }

          if (newY < 0 || newY > windowSize.height - 50) {
            finalDirection = -newDirection;
            finalY = Math.max(0, Math.min(windowSize.height - 50, newY));
          }

          return {
            ...pet,
            x: finalX,
            y: finalY,
            direction: finalDirection,
            isWalking: Math.random() > 0.15,
          };
        })
      );
    }, 150);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateWindowSize);
    };
  }, [windowSize.width, windowSize.height]);

  const getPetEmoji = (type: string, isWalking: boolean) => {
    switch (type) {
      case "cat":
        return isWalking ? "🐱" : "😺";
      case "dog":
        return isWalking ? "🐕" : "🐕‍🦺";
      case "heart":
        return isWalking ? "💖" : "💖";
      case "star":
        return isWalking ? "🌟" : "🌟";
      default:
        return "🐾";
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {pets.map((pet) => (
        <motion.div
          key={pet.id}
          className="absolute text-3xl select-none"
          style={{
            left: pet.x,
            top: pet.y,
          }}
          animate={{
            x: pet.isWalking ? [0, 1, 0] : 0,
            y: pet.isWalking ? [0, -1, 0] : 0,
          }}
          transition={{
            duration: 0.8,
            repeat: pet.isWalking ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <motion.div
            animate={{
              rotate: pet.isWalking ? [0, 3, -3, 0] : 0,
              scale: pet.isWalking ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 1.2,
              repeat: pet.isWalking ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="drop-shadow-lg"
          >
            <span role="img" aria-label={`${pet.type} emoji`}>
              {getPetEmoji(pet.type, pet.isWalking)}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
