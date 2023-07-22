let initialState = {
  isPlaying: false,
  modalIsOpen: false,
  inputValue: '',
  isRunning: false,
  minutes: 0,
  seconds: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "PLAY":
      return { ...state, isPlaying: false };
    case "STOP":
      return { ...state, isPlaying: true };
    case "MODALOPEN":
      return { ...state, modalIsOpen: true };
    case "MODALCLOSE":
      return { ...state, modalIsOpen: false };
    case "TIMERSTART":
      return { ...state, isRunning: true, minutes: 0, seconds: 0 };
    case "TIMERSTOP":
      return { ...state, isRunning: false, minutes: 0, seconds: 0 };
    case "TIMERTICK":
      return {
        ...state,
        seconds: state.seconds === 59 ? 0 : state.seconds + 1,
        minutes: state.seconds === 59 ? state.minutes + 1 : state.minutes,
      };

    default:
      return { ...state };
  }
};

export default reducer;