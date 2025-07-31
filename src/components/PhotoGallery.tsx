'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';

interface Photo {
  id: number;
  src: string;
  alt: string;
  title: string;
  caption?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  initialIndex?: number;
  onClose?: () => void;
  showFullscreen?: boolean;
}

export default function PhotoGallery({
  photos,
  initialIndex = 0,
  onClose,
  showFullscreen = false,
}: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(showFullscreen);
  const containerRef = useRef<HTMLDivElement>(null);
  const { triggerHapticFeedback } = useGameStore();

  const currentPhoto = photos[currentIndex];

  const nextPhoto = () => {
    triggerHapticFeedback();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    setIsZoomed(false);
  };

  const prevPhoto = () => {
    triggerHapticFeedback();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    setIsZoomed(false);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.x > 100 && currentIndex > 0) {
      prevPhoto();
    } else if (info.offset.x < -100 && currentIndex < photos.length - 1) {
      nextPhoto();
    }
  };

  const toggleZoom = () => {
    triggerHapticFeedback();
    setIsZoomed(!isZoomed);
  };

  const toggleFullscreen = () => {
    triggerHapticFeedback();
    setIsFullscreen(!isFullscreen);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        if (currentIndex > 0) prevPhoto();
        break;
      case 'ArrowRight':
        if (currentIndex < photos.length - 1) nextPhoto();
        break;
      case 'Escape':
        onClose?.();
        break;
      case ' ':
        e.preventDefault();
        toggleZoom();
        break;
    }
  };

  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isFullscreen, currentIndex]);

  const containerClasses = isFullscreen
    ? 'fixed inset-0 z-50 bg-black/90 flex items-center justify-center'
    : 'relative w-full h-64';

  return (
    <div className={containerClasses}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="relative w-full h-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Main Photo */}
          <motion.img
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            className={`w-full h-full object-cover rounded-2xl shadow-lg ${
              isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
            }`}
            drag={isFullscreen}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            onClick={toggleZoom}
            whileHover={{ scale: isZoomed ? 1 : 1.02 }}
            whileTap={{ scale: isZoomed ? 0.98 : 0.95 }}
            style={{
              transform: isZoomed ? 'scale(1.5)' : 'scale(1)',
              transition: 'transform 0.3s ease',
            }}
          />

          {/* Photo Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 rounded-b-2xl">
            <h3 className="text-white font-dancing font-bold text-lg">
              {currentPhoto.title}
            </h3>
            {currentPhoto.caption && (
              <p className="text-white/80 text-sm mt-1">{currentPhoto.caption}</p>
            )}
          </div>

          {/* Navigation Arrows */}
          {isFullscreen && (
            <>
              <button
                onClick={prevPhoto}
                disabled={currentIndex === 0}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 photo-nav-button disabled:opacity-50"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextPhoto}
                disabled={currentIndex === photos.length - 1}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 photo-nav-button disabled:opacity-50"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Controls */}
          {isFullscreen && (
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={toggleZoom}
                className="cat-button p-2 rounded-full"
              >
                {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
              </button>
              <button
                onClick={onClose}
                className="cat-button p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
          )}

          {/* Photo Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsZoomed(false);
                }}
                className={`photo-indicator ${
                  index === currentIndex ? 'bg-primary' : 'bg-secondary'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Thumbnail Strip */}
      {isFullscreen && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/20 backdrop-blur-sm rounded-full p-2">
          {photos.map((photo, index) => (
            <motion.img
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              className={`w-12 h-12 object-cover rounded-lg cursor-pointer ${
                index === currentIndex ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => {
                setCurrentIndex(index);
                setIsZoomed(false);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  );
} 