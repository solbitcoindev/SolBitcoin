import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Maximize2, Minimize2, X, ArrowLeft } from 'lucide-react';

interface LauncherProps {
  onClose: () => void;
}

const Launcher: React.FC<LauncherProps> = ({ onClose }) => {
  const isMobile = useIsMobile();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // 👉 Центрируем сразу при создании
  const [position, setPosition] = useState<{ x: number; y: number }>(() => ({
    x: window.innerWidth / 2 - 195,
    y: window.innerHeight / 2 - 422,
  }));

  // Обновляем позицию при ресайзе экрана
  useEffect(() => {
    if (!isMobile) {
      const handleResize = () => {
        setPosition({
          x: window.innerWidth / 2 - 195,
          y: window.innerHeight / 2 - 422,
        });
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isMobile]);

  // Drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile || isFullscreen || !windowRef.current) return;
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Drag move
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || isMobile || isFullscreen) return;
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isMobile, isDragging, dragOffset]);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (isMobile) return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-none" // 👈 фон кликается
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        ref={windowRef}
        className={`
          relative bg-background border border-primary rounded-[30px] overflow-hidden pointer-events-auto
          ${isMobile ? 'w-full h-full' : isFullscreen ? 'w-full h-full' : 'w-[390px] h-[802px]'}
          ${isDragging ? 'shadow-xl' : ''}
        `}
        style={
          !isMobile && !isFullscreen
            ? {
                position: 'fixed', // 👈 теперь всегда фиксированное
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
              }
            : { inset: 0 }
        }
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Заголовок */}
        <div
          className="absolute top-0 left-0 right-0 p-4 bg-background-secondary flex justify-between items-center z-10 select-none"
          onMouseDown={handleMouseDown}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div className="flex items-center">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="mr-2"
                aria-label="Back to main"
              >
                <ArrowLeft size={20} />
              </Button>
            )}
            <h2 className="text-xl font-bold">SolBitcoin Launcher</h2>
          </div>
          <div className="flex gap-2">
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close launcher"
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        {/* Контент */}
        <div className="h-full pt-16 flex flex-col items-center justify-center p-4">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center mb-6">
            <span className="text-muted-foreground">Game Preview</span>
          </div>
          <Button
            size="lg"
            className="bg-gradient-primary text-primary-foreground hover:opacity-90 glow-primary px-8 py-6 text-lg"
          >
            Start Game
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Launcher;
