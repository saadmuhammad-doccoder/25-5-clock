import "../App.css";
import "../index.css";

const Timer = (props) => {
  return (
    <div className="text-center w-1/2 h-full flex justify-center items-center flex-col gap-6">
      <h1 id="timer-label" className="text-purple-400 text-2xl inline-block">
        {props.phase === "SESSION" ? "Session" : "Break"}
      </h1>
      <div className="inline-block w-full">
        <h1 id="time-left" className="text-purple-400 text-5xl mb-7">
          {props.formattedTime}
        </h1>
        <div className="flex justify-around items-center">
          <button
            id="start_stop"
            className="text-slate-600 bg-purple-400 hover:bg-purple-600 focus:ring-4 focus:ring-opacity-50 focus:ring-purple-700 font-bold rounded-lg text-sm px-5 py-2.5 shadow-sm"
            onClick={props.startTimer}
          >
            ▶||
          </button>
          <button
            id="reset"
            className="text-slate-600 bg-purple-400 hover:bg-purple-600 focus:ring-4 focus:ring-opacity-50 focus:ring-purple-700 font-bold rounded-lg text-sm px-5 py-2.5 shadow-sm"
            onClick={props.resetTimer}
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
