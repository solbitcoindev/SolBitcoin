import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = ({ onFinish }: { onFinish: () => void }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const targetDate = new Date("2025-09-10T12:19:00");
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isFinished =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  useEffect(() => {
    if (isFinished) {
      onFinish(); // сообщаем родителю
    }
  }, [isFinished, onFinish]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  if (isFinished) return null;

  return (
    <div className="flex gap-4 justify-center">
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
    </div>
  );
};
