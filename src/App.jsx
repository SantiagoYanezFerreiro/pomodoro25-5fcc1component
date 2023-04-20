import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [displayTime, setDisplayTime] = React.useState(25 * 60);
  const [breakTime, setBreakTime] = React.useState(5 * 60);
  const [sessionTime, setSessionTime] = React.useState(25 * 60);
  const [timerOn, setTimerOn] = React.useState(false);
  const [onBreak, setOnBreak] = React.useState(false);
  const [breakAudio, setBreakAudio] = React.useState(
    new Audio("./BeepSound.mp3")
  );

  const playBreakSound = () => {
    breakAudio.currentTime = 0;
    breakAudio.play();
  };
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const changeTime = (amount, type) => {
    if (type === "break") {
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) {
        return;
      }
      setSessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };

  const controlTime = () => {
    let second = 1000;
    let date = new Date.getTime();
    let nextDate = new Date.getTime() + second;
    let onBreakVariable = onBreak;
    if (!timerOn) {
      let interval = setInterval(() => {
        date = newDate.getTime();
        if (date > nextDate) {
          setDisplayTime((prev) => {
            return prev - 1;
          });
        }
        nextDate += second;
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  };
  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
  };

  return (
    <div className="center-align">
      <h1>25+5 Clock</h1>
      <div className="dual-container" id="break-label">
        Break Time
        <Length
          id="break-length"
          title={"break-length"}
          changeTime={changeTime}
          type={"break"}
          time={breakTime}
          formatTime={formatTime}
        />
        <div id="session-label">
          Session Time
          <Length
            title={"session-length"}
            changeTime={changeTime}
            type={"session"}
            time={sessionTime}
            formatTime={formatTime}
          />
        </div>
      </div>
      <h1>{formatTime(displayTime)}</h1>
      <button className="play-pause" onClick={controlTime}>
        {timerOn ? <i className="">Play</i> : <i className="">Reset</i>}
      </button>
      <button className="reset-btn" onClick={resetTime}>
        Autorenew
      </button>
    </div>
  );
}
function Length({ title, changeTime, type, time, formatTime }) {
  return (
    <div>
      <h3>{title}</h3>
      <div className="time-sets">
        <button id="break-increment" onClick={() => changeTime(+60, type)}>
          +
        </button>
        <h3>{formatTime(time)}</h3>
        <button id="break-decrement" onClick={() => changeTime(-60, type)}>
          -
        </button>
      </div>
    </div>
  );
}

export default App;
