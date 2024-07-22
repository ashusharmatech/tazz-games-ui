import React, { useEffect, useState } from 'react';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TimerProps {
  isActive: boolean;
  onFinish: () => void;
}

const Timer: React.FC<TimerProps> = ({ isActive, onFinish }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
      onFinish();
    }
    return () => clearInterval(interval);
  }, [isActive, time, onFinish]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="top-0 left-0 text-xl p-2 shadow-md rounded">
      <FontAwesomeIcon icon={faClock} className='text-lg leading-lg opacity-75 mr-2' /> {formatTime(time)}
    </div>
  );
};

export default Timer;
