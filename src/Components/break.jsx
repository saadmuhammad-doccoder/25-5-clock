import "../App.css";
import "../index.css";

const SetTimer = (props) => {
  return (
    <div className="flex justify-center items-center flex-col m-14">
      <h1
        id={props.name === "Break Length" ? props.id : props.id}
        className="text-purple-300 text-2xl"
      >
        {props.name}
      </h1>
      <div className="text-center w-full flex justify-around items-center">
        <button
          id={
            props.name === "Break Length"
              ? props.incButtonId
              : props.incButtonId
          }
          className="text-slate-600 bg-purple-400 hover:bg-purple-600 focus:ring-4 focus:ring-opacity-50 focus:ring-purple-700 font-bold rounded-lg text-sm px-5 py-2.5 shadow-sm"
          onClick={
            props.name === "Break Length"
              ? props.handleIncrementClick
              : props.handleIncrementClick
          }
        >
          &uarr;
        </button>
        <h1
          id={props.name === "Break Length" ? props.headingId : props.headingId}
          className="text-purple-400 text-2xl inline-block"
        >
          {props.name === "Break Length" ? props.breakTime : props.sessionTime}
        </h1>
        <button
          id={
            props.name === "Break Length"
              ? props.decButtonId
              : props.decButtonId
          }
          className="text-slate-600 bg-purple-400 hover:bg-purple-600 focus:ring-4 focus:ring-opacity-50 focus:ring-purple-700 font-bold rounded-lg text-sm px-5 py-2.5 shadow-sm"
          onClick={
            props.name === "Break Length"
              ? props.handleDecrementClick
              : props.handleDecrementClick
          }
        >
          &darr;
        </button>
      </div>
    </div>
  );
};

export default SetTimer;
