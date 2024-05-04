import { useState, useEffect, useRef } from "react";
import "./App.css";
import "./index.css";
import SetTimer from "./Components/break.jsx";
import Timer from "./Components/Timer.jsx";

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [isTimerStart, setIsTimerStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isSession, setIsSession] = useState("SESSION");
  const audio = useRef(null);

  const resetTimer = () => {
    if (!timeLeft && isSession === "SESSION") {
      console.log(isSession);
      setTimeLeft(() => breakTime * 60);
      setIsSession(() => "BREAK");
      // audio.current.currentTime = 0;
      // audio.current.play();
    }
    if (!timeLeft && isSession === "BREAK") {
      console.log(isSession);
      setTimeLeft(() => sessionTime * 60);
      setIsSession(() => "SESSION");
    }
    audio.current.currentTime = 0;
    audio.current.play();
  };

  const incrementBreakTime = () => {
    if (breakTime < 60 && timeLeft) {
      setBreakTime(() => breakTime + 1);
      setTimeLeft(() => breakTime * 60 + 60);
      console.log(breakTime);
    }
  };

  const decrementBreakTime = () => {
    if (timeLeft < 0) return;
    if (breakTime > 1 && timeLeft) {
      setBreakTime(() => breakTime - 1);
      setTimeLeft(() => breakTime * 60 - 60);
      console.log(breakTime);
    }
  };

  const incrementSessionTime = () => {
    if (sessionTime < 60) {
      setSessionTime(() => sessionTime + 1);
      setTimeLeft(() => sessionTime * 60 + 60);
    }
  };

  const decrementSessionTime = () => {
    if (timeLeft < 0) return;
    if (sessionTime > 1) {
      setSessionTime(() => sessionTime - 1);
      setTimeLeft(() => sessionTime * 60 - 60);
    }
  };

  const reset = () => {
    setBreakTime(5);
    setSessionTime(25);
    setIsTimerStart(false);
    setTimeLeft(1500);
    setIsSession("SESSION");
    audio.current.pause();
    audio.current.currentTime = 0;
  };

  let timer;
  useEffect(() => {
    if (isTimerStart && timeLeft >= 0) {
      timer = setInterval(() => {
        setTimeLeft(() => timeLeft - 1);
      }, 1000);
      resetTimer();
    } else if (!isTimerStart && isSession === "BREAK") {
      // Update timeLeft to breakTime after session ends
      setTimeLeft(() => breakTime * 60);
    }
    return () => clearInterval(timer);
  }, [isSession, timeLeft, isTimerStart]);

  const startStopTimer = () => {
    setIsTimerStart(!isTimerStart);
  };

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    console.log(`${formattedMinutes}:${formattedSeconds}`);
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const formattedTime = timeFormatter();

  // useEffect(() => {
  //   if (isTimerStart) {

  //   }
  // }, [isSession, timeLeft, isTimerStart]);

  return (
    <>
      <div className="bg-slate-800 flex justify-center items-center min-h-20">
        <h1 className="text-purple-500 font-sans text-3xl">Pomodoro Clock</h1>
      </div>
      <div className="bg-slate-600 min-h-screen flex justify-around items-center">
        <div className="flex justify-center content-between flex-col w-1/2 h-full">
          <SetTimer
            id={"break-label"}
            name={"Break Length"}
            breakTime={breakTime}
            headingId={"break-length"}
            incButtonId={"break-increment"}
            decButtonId={"break-decrement"}
            handleIncrementClick={incrementBreakTime}
            handleDecrementClick={decrementBreakTime}
          />
          <SetTimer
            id={"session-label"}
            name={"Session Length"}
            sessionTime={sessionTime}
            headingId={"session-length"}
            incButtonId={"session-increment"}
            decButtonId={"session-decrement"}
            handleIncrementClick={incrementSessionTime}
            handleDecrementClick={decrementSessionTime}
          />
        </div>
        <div className="text-center w-1/2 flex justify-center items-center">
          <Timer
            formattedTime={formattedTime}
            resetTimer={reset}
            startTimer={startStopTimer}
            phase={isSession}
          />
          <audio
            id="beep"
            preload="auto"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            ref={audio}
          />
        </div>
      </div>
    </>
  );
}

export default App;
