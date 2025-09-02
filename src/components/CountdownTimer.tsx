import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 7,
    hours: 14,
    minutes: 50,
    seconds: 4
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

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