import React, { useEffect, useState, useRef } from 'react';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TimerProps {
  isActive: boolean;
  onFinish: (finalTime: number) => void; // Pass final time to the onFinish callback
}

const Timer: React.FC<TimerProps> = ({ isActive, onFinish }) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number | null>(null); // Use useRef to store the interval ID

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // Pass the final time when the timer stops
      if (time > 0) {
        onFinish(time);
      }
    }

    // Cleanup interval on component unmount or when isActive changes
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [isActive, time, onFinish]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex items-center">
      <FontAwesomeIcon icon={faClock} className="text-lg leading-lg opacity-75 mr-2" />
      <span>{formatTime(time)}</span>
    </div>
  );
};

export default Timer;
