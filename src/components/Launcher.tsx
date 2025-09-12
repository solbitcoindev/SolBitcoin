import React, { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Maximize2, Minimize2, X, ArrowLeft } from 'lucide-react';

interface LauncherProps {
  onClose: () => void;
}

const Launcher: React.FC<LauncherProps> = ({ onClose }) => {
  const isMobile = useIsMobile();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const windowRef = useRef<HTMLDivElement>(null);

  // Начало перетаскивания
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile || isFullscreen) return;
    if (!windowRef.current) return;

    setIsDragging(true);

    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Перемещение
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || isMobile || isFullscreen) return;
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  // Окончание перетаскивания
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Фуллскрин на ПК
  const toggleFullscreen = () => {
    if (isMobile) return;

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable fullscreen: ${e}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    if (!isMobile) {
      // Для ПК центрируем окно при открытии
      setPosition({
        x: window.innerWidth/2 - 195,
        y: window.innerHeight/2 - 422
      });

      // Добавляем обработчики для перетаскивания
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        
        // Выходим из полноэкранного режима при закрытии
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      };
    }
  }, [isMobile]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isMobile ? 'bg-background' : 'bg-black/50'
      }`}
      style={isMobile ? {} : { cursor: isDragging ? 'grabbing' : 'default' }}
    >
      <div
        ref={windowRef}
        className={`
          relative bg-background border border-primary rounded-xl overflow-hidden
          ${
            isMobile
              ? 'w-full h-full'
              : isFullscreen
              ? 'w-full h-full'
              : 'w-[390px] h-[844px]'
          }
          transition-all duration-300
          ${isDragging ? 'shadow-xl' : ''}
        `}
        style={
          !isMobile && !isFullscreen
            ? {
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }
            : {}
        }
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
                {isFullscreen ? (
                  <Minimize2 size={20} />
                ) : (
                  <Maximize2 size={20} />
                )}
              </Button>
            )}
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                aria-label="Close launcher"
              >
                <X size={20} />
              </Button>
            )}
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
      </div>
    </div>
  );
};

export default Launcher;

