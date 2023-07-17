import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [userTime, setUserTime] = useState('');

  const handleStart = () => {
    if (userTime > 0) {
      setTimer(userTime);
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimer(0);
    setUserTime('');
  };

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  return (
    <div>
      <input
        type="number"
        value={userTime}
        onChange={(e) => setUserTime(parseInt(e.target.value))}
      />
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
      <p>Timer: {timer}</p>
    </div>
  );
};

export default Timer;
