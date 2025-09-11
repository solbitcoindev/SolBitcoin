import { useState, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = ({ onFinish, targetDate }: { onFinish: () => void, targetDate: string }) => {
  function calculateTimeLeft(dateStr: string): TimeLeft {
    const target = new Date(dateStr);
    const now = new Date();
    const difference = target.getTime() - now.getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  // Сброс состояния при изменении даты
  const [show, setShow] = useState(true);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    setShow(true);
    setTimeLeft(calculateTimeLeft(targetDate));
  }, [targetDate]);

  useEffect(() => {
    if (!show) return;
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [show, targetDate]);

  const isFinished =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  // Когда таймер завершился — запускаем fade-out
  useEffect(() => {
    if (isFinished && show) {
      setShow(false);
    }
  }, [isFinished, show]);

  // После fade-out вызываем onFinish
  const handleExited = () => {
    onFinish();
  };

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  // Если show=false, компонент исчезает с fade-out, потом вызывается onFinish
  return (
    <AnimatePresence onExitComplete={handleExited}>
      {show && (
        <motion.div
          key={targetDate}
          className="flex gap-4 justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="countdown-box">
            <div className="relative z-10">
              <div className="text-3xl font-bold gradient-text font-space">
                {formatNumber(timeLeft.days)}
              </div>
              <div className="text-sm text-muted-foreground">days</div>
            </div>
          </div>
          <div className="countdown-box">
            <div className="relative z-10">
              <div className="text-3xl font-bold gradient-text font-space">
                {formatNumber(timeLeft.hours)}
              </div>
              <div className="text-sm text-muted-foreground">hours</div>
            </div>
          </div>
          <div className="countdown-box">
            <div className="relative z-10">
              <div className="text-3xl font-bold gradient-text font-space">
                {formatNumber(timeLeft.minutes)}
              </div>
              <div className="text-sm text-muted-foreground">min</div>
            </div>
          </div>
          <div className="countdown-box">
            <div className="relative z-10">
              <div className="text-3xl font-bold gradient-text font-space">
                {formatNumber(timeLeft.seconds)}
              </div>
              <div className="text-sm text-muted-foreground">sec</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
