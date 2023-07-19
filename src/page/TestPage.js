import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [selectedTime, setSelectedTime] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleStartTimer = () => {
    const minutes = parseInt(selectedTime);
    setRemainingTime(minutes * 60);
    setIsTimerRunning(true);
  };

  useEffect(() => {
    let timerInterval;

    if (isTimerRunning) {
      timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isTimerRunning]);

  useEffect(() => {
    if (remainingTime === 0) {
      setIsTimerRunning(false);
    }
  }, [remainingTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <input
        type="number"
        min="1"
        placeholder="Enter minutes"
        value={selectedTime}
        onChange={handleTimeChange}
      />
      <button onClick={handleStartTimer}>Start Timer</button>
      {isTimerRunning && <p>Remaining Time: {formatTime(remainingTime)}</p>}
    </div>
  );
};

export default Timer;
