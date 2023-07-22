import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useTimerState = () => {
  const dispatch = useDispatch();
  const intervalRef = useRef();
  const minutes = useSelector(state => state.minutes);
  const seconds = useSelector(state => state.seconds);
  const isRunning = useSelector(state => state.isRunning);

  const startTimer = () => {
    dispatch({ type: "TIMERSTART" });
  };

  const stopTimer = () => {
    dispatch({ type: "TIMERSTOP" });
  };

  useEffect(() => {
    if (isRunning) {
      console.log('useffect');
      intervalRef.current = setInterval(() => {
        dispatch({ type: "TIMERTICK" });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, dispatch]);

  return {
    intervalRef,
    startTimer,
    stopTimer,
    minutes,
    isRunning,
    seconds
  };
};

export default useTimerState;
