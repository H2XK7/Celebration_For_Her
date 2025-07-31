'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Camera, Music, Play, Pause, ArrowLeft, Volume2, Sparkles, Gift, Star } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

interface InteractiveGamesProps {
  gameType: 'birthday' | 'girlfriend' | 'memory';
  onGameComplete: (gameId: string, photoIndex: number) => void;
  onBack: () => void;
}

interface GameData {
  id: string;
  title: string;
  description: string;
  type: 'matching' | 'puzzle' | 'quiz' | 'garden';
  elements: any[];
  rewardPhoto: number;
  rewardMessage: string;
  backgroundMusic: string;
}

export default function InteractiveGames({ 
  gameType, 
  onGameComplete, 
  onBack 
}: InteractiveGamesProps) {
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [gameState, setGameState] = useState<any>({});
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { triggerHapticFeedback, playConfetti } = useGameStore();

  const games: Record<string, GameData[]> = {
    birthday: [
      {
        id: 'cat-cake-matching',
        title: 'Cat-Cake Matching Game',
        description: 'Match birthday cats with their favorite cake flavors',
        type: 'matching',
        elements: [
          { id: 1, type: 'cat', emoji: '🐱', name: 'Birthday Cat', matchId: 1 },
          { id: 2, type: 'cat', emoji: '🐈', name: 'Party Cat', matchId: 2 },
          { id: 3, type: 'cat', emoji: '🐈‍⬛', name: 'Celebration Cat', matchId: 3 },
          { id: 4, type: 'cake', emoji: '🎂', name: 'Chocolate Cake', matchId: 1 },
          { id: 5, type: 'cake', emoji: '🧁', name: 'Vanilla Cake', matchId: 2 },
          { id: 6, type: 'cake', emoji: '🍰', name: 'Strawberry Cake', matchId: 3 }
        ],
        rewardPhoto: 1,
        rewardMessage: 'You unlocked a special birthday memory!',
        backgroundMusic: '/audio/birthday-game.mp3'
      },
      {
        id: 'memory-balloon-pop',
        title: 'Memory Balloon Pop',
        description: 'Pop balloons to reveal relationship memories',
        type: 'puzzle',
        elements: [
          { id: 1, emoji: '🎈', message: 'Our first date', revealed: false },
          { id: 2, emoji: '🎈', message: 'When you made me laugh', revealed: false },
          { id: 3, emoji: '🎈', message: 'Our first kiss', revealed: false },
          { id: 4, emoji: '🎈', message: 'When you comforted me', revealed: false },
          { id: 5, emoji: '🎈', message: 'Our first trip together', revealed: false },
          { id: 6, emoji: '🎈', message: 'When you surprised me', revealed: false }
        ],
        rewardPhoto: 2,
        rewardMessage: 'You discovered beautiful memories!',
        backgroundMusic: '/audio/memory-game.mp3'
      }
    ],
    girlfriend: [
      {
        id: 'love-letter-assembly',
        title: 'Love Letter Assembly',
        description: 'Drag romantic words to complete love declarations',
        type: 'puzzle',
        elements: [
          { id: 1, word: 'Every', position: 0, correct: true },
          { id: 2, word: 'moment', position: 1, correct: true },
          { id: 3, word: 'with', position: 2, correct: true },
          { id: 4, word: 'you', position: 3, correct: true },
          { id: 5, word: 'is', position: 4, correct: true },
          { id: 6, word: 'magical', position: 5, correct: true }
        ],
        rewardPhoto: 1,
        rewardMessage: 'You completed a beautiful love letter!',
        backgroundMusic: '/audio/love-game.mp3'
      },
      {
        id: 'heart-garden-planting',
        title: 'Heart Garden Planting',
        description: 'Tap to plant heart-shaped flowers',
        type: 'garden',
        elements: [
          { id: 1, emoji: '🌹', name: 'Rose of Love', planted: false },
          { id: 2, emoji: '🌸', name: 'Cherry Blossom', planted: false },
          { id: 3, emoji: '🌺', name: 'Hibiscus of Passion', planted: false },
          { id: 4, emoji: '🌻', name: 'Sunflower of Joy', planted: false },
          { id: 5, emoji: '🌷', name: 'Tulip of Hope', planted: false },
          { id: 6, emoji: '💐', name: 'Bouquet of Forever', planted: false }
        ],
        rewardPhoto: 2,
        rewardMessage: 'You created a beautiful heart garden!',
        backgroundMusic: '/audio/garden-game.mp3'
      }
    ],
    memory: [
      {
        id: 'photo-memory-matching',
        title: 'Photo Memory Matching',
        description: 'Match current photos with past memories',
        type: 'matching',
        elements: [
          { id: 1, type: 'photo', emoji: '📸', name: 'First Date', matchId: 1 },
          { id: 2, type: 'photo', emoji: '📷', name: 'Beach Trip', matchId: 2 },
          { id: 3, type: 'photo', emoji: '📹', name: 'Birthday Party', matchId: 3 },
          { id: 4, type: 'memory', emoji: '💕', name: 'Love Story', matchId: 1 },
          { id: 5, type: 'memory', emoji: '🌊', name: 'Ocean Memories', matchId: 2 },
          { id: 6, type: 'memory', emoji: '🎉', name: 'Celebration', matchId: 3 }
        ],
        rewardPhoto: 1,
        rewardMessage: 'You matched beautiful memories!',
        backgroundMusic: '/audio/memory-game.mp3'
      },
      {
        id: 'timeline-creation',
        title: 'Timeline Creation',
        description: 'Arrange relationship milestones chronologically',
        type: 'puzzle',
        elements: [
          { id: 1, event: 'First Meeting', date: '2023-01-15', position: 0 },
          { id: 2, event: 'First Date', date: '2023-02-14', position: 1 },
          { id: 3, event: 'First Kiss', date: '2023-03-20', position: 2 },
          { id: 4, event: 'First Trip', date: '2023-06-15', position: 3 },
          { id: 5, event: 'First Birthday', date: '2023-08-10', position: 4 },
          { id: 6, event: 'Today', date: '2024-01-01', position: 5 }
        ],
        rewardPhoto: 2,
        rewardMessage: 'You created our beautiful timeline!',
        backgroundMusic: '/audio/timeline-game.mp3'
      }
    ]
  };

  const availableGames = games[gameType] || [];

  const handleGameSelect = (game: GameData) => {
    triggerHapticFeedback();
    setCurrentGame(game.id);
    setGameState({});
    
    // Play game selection sound
    const audio = new Audio('/audio/game-select.mp3');
    audio.volume = 0.3;
    audio.play().catch(console.error);
  };

  const handleGameComplete = (game: GameData) => {
    triggerHapticFeedback();
    playConfetti();
    
    // Play success sound
    const audio = new Audio('/audio/game-success.mp3');
    audio.volume = 0.4;
    audio.play().catch(console.error);
    
    onGameComplete(game.id, game.rewardPhoto);
  };

  const renderMatchingGame = (game: GameData) => {
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [matchedPairs, setMatchedPairs] = useState<number[]>([]);

    const handleItemClick = (item: any) => {
      triggerHapticFeedback();
      
      if (matchedPairs.includes(item.matchId)) return;
      
      if (selectedItems.length === 0) {
        setSelectedItems([item]);
      } else if (selectedItems.length === 1) {
        const firstItem = selectedItems[0];
        if (firstItem.matchId === item.matchId && firstItem.id !== item.id) {
          // Match found!
          setMatchedPairs([...matchedPairs, item.matchId]);
          setSelectedItems([]);
          
          // Check if game is complete
          if (matchedPairs.length + 1 === game.elements.length / 2) {
            setTimeout(() => handleGameComplete(game), 1000);
          }
        } else {
          setSelectedItems([]);
        }
      }
    };

    return (
      <div className="grid grid-cols-3 gap-4 p-6">
        {game.elements.map((item) => (
          <motion.div
            key={item.id}
            className={`relative cursor-pointer p-4 rounded-lg text-center transition-all duration-300 ${
              selectedItems.find(s => s.id === item.id) 
                ? 'bg-primary text-white scale-110' 
                : matchedPairs.includes(item.matchId)
                ? 'bg-green-500 text-white opacity-60'
                : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => handleItemClick(item)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-4xl mb-2">{item.emoji}</div>
            <div className="text-sm font-medium">{item.name}</div>
            
            {matchedPairs.includes(item.matchId) && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Star className="w-8 h-8 text-yellow-400" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  const renderPuzzleGame = (game: GameData) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    const handleStepComplete = (stepId: number) => {
      triggerHapticFeedback();
      setCompletedSteps([...completedSteps, stepId]);
      setCurrentStep(currentStep + 1);
      
      if (currentStep + 1 >= game.elements.length) {
        setTimeout(() => handleGameComplete(game), 1000);
      }
    };

    return (
      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">Progress: {completedSteps.length}/{game.elements.length}</span>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completedSteps.length / game.elements.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {game.elements.map((element, index) => (
            <motion.div
              key={element.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                completedSteps.includes(element.id)
                  ? 'border-green-500 bg-green-50'
                  : index === currentStep
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 bg-white'
              }`}
              whileHover={index === currentStep ? { scale: 1.02 } : {}}
              onClick={() => index === currentStep && handleStepComplete(element.id)}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{element.emoji || '📝'}</div>
                <div className="flex-1">
                  <div className="font-medium">{element.word || element.event || element.message}</div>
                  {element.date && <div className="text-sm text-gray-500">{element.date}</div>}
                </div>
                {completedSteps.includes(element.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Star className="w-6 h-6 text-green-500" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderGardenGame = (game: GameData) => {
    const [plantedFlowers, setPlantedFlowers] = useState<number[]>([]);

    const handlePlantFlower = (flowerId: number) => {
      triggerHapticFeedback();
      setPlantedFlowers([...plantedFlowers, flowerId]);
      
      // Play planting sound
      const audio = new Audio('/audio/plant-flower.mp3');
      audio.volume = 0.3;
      audio.play().catch(console.error);
      
      if (plantedFlowers.length + 1 >= game.elements.length) {
        setTimeout(() => handleGameComplete(game), 1000);
      }
    };

    return (
      <div className="p-6">
        <div className="mb-6 text-center">
          <h3 className="text-lg font-medium mb-2">Plant your love garden</h3>
          <p className="text-sm text-gray-600">Tap flowers to plant them in your garden</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {game.elements.map((flower) => (
            <motion.div
              key={flower.id}
              className={`relative cursor-pointer p-4 rounded-lg text-center transition-all duration-300 ${
                plantedFlowers.includes(flower.id)
                  ? 'bg-green-100 border-2 border-green-300'
                  : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
              }`}
              onClick={() => !plantedFlowers.includes(flower.id) && handlePlantFlower(flower.id)}
              whileHover={!plantedFlowers.includes(flower.id) ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-4xl mb-2">{flower.emoji}</div>
              <div className="text-sm font-medium">{flower.name}</div>
              
              {plantedFlowers.includes(flower.id) && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Sparkles className="w-6 h-6 text-green-500" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Garden Progress */}
        <div className="mt-6 text-center">
          <div className="text-sm text-gray-600 mb-2">
            Garden Progress: {plantedFlowers.length}/{game.elements.length}
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(plantedFlowers.length / game.elements.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderGame = (game: GameData) => {
    switch (game.type) {
      case 'matching':
        return renderMatchingGame(game);
      case 'puzzle':
        return renderPuzzleGame(game);
      case 'garden':
        return renderGardenGame(game);
      default:
        return <div>Game not implemented</div>;
    }
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

      <div className="max-w-4xl mx-auto relative z-10">
        {!currentGame ? (
          /* Game Selection Screen */
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-dancing font-bold gradient-text mb-4">
                Choose Your Adventure! 🎮
              </h1>
              <p className="text-lg text-gray-600">
                Complete games to unlock special memories and surprises
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 cursor-pointer hover:shadow-xl transition-all duration-300"
                  onClick={() => handleGameSelect(game)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{game.type === 'matching' ? '🎯' : game.type === 'puzzle' ? '🧩' : '🌱'}</div>
                    <h3 className="text-xl font-dancing font-bold mb-2">{game.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{game.description}</p>
                    <div className="text-xs text-primary font-medium">
                      Reward: Photo {game.rewardPhoto}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* Game Play Screen */
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-dancing font-bold">
                    {availableGames.find(g => g.id === currentGame)?.title}
                  </h2>
                  <button
                    onClick={() => setCurrentGame(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {availableGames.find(g => g.id === currentGame)?.description}
                </p>
              </div>
              
              <div className="p-6">
                {renderGame(availableGames.find(g => g.id === currentGame)!)}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
} 