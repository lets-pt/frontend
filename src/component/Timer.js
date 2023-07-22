import React, { useState, useEffect, useRef } from 'react';

const Timer = (
  { time }
) => {
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
        <span>{time.minutes < 10 ? `0${time.minutes}` : time.minutes}</span> :
        <span>{time.seconds < 10 ? `0${time.seconds}` : time.seconds}</span>
      </div>
    </div>
  );
};

export default Timer;
