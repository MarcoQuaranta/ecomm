import React, { useEffect, useState } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  const COUNTDOWN_KEY = 'caliburn_countdown_expiry';
  const COUNTDOWN_MINUTES = 57;

  useEffect(() => {
    const storedExpiry = localStorage.getItem(COUNTDOWN_KEY);
    let expiry: number;

    if (storedExpiry) {
      expiry = parseInt(storedExpiry);
    } else {
      expiry = Date.now() + COUNTDOWN_MINUTES * 60 * 1000;
      localStorage.setItem(COUNTDOWN_KEY, expiry.toString());
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft(0);
      } else {
        setTimeLeft(diff);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');

    return `${hours} : ${minutes} : ${seconds}`;
  };

  return (
    <div className="bg-[#d6286b] text-white rounded-lg p-4 text-center">
      <p className="text-sm font-medium mb-2">LE VENDITE CHIUDONO IN:</p>
      <div className="text-3xl font-bold tracking-wide">{formatTime(timeLeft)}</div>
      <p className="text-xs mt-1">ore : min : sec</p>
    </div>
  );
};

export default CountdownTimer;
