import React, { useState, useEffect, useRef } from 'react';
const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef();

  const handleStart = () => {
    setIsRunning(true);
    setMinutes(0);
    setSeconds(0);
  };


  const handleReset = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (seconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          setSeconds(0);
        } else {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, minutes, seconds]);

  return (
    <div>
      <input
        type="number"
      />
      분
      <input
        type="number"
      />
      초
      <div>
        <span>{minutes < 10 ? `0${minutes}` : minutes}</span> :
        <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>
      <div>
        {!isRunning && (
          <button onClick={handleStart}>시작</button>
        )}
        <button onClick={handleReset}>리셋</button>
      </div>
    </div>
  );
};

export default Timer;
