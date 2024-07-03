import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";
import "./App.css";

const App = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [inputTime, setInputTime] = useState("25:00");

  useEffect(() => {
    let timer = null;

    if (isActive && !isPaused) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
            setIsActive(false);
            alert("Time's up!");
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isActive, isPaused, minutes, seconds]);

  const handlePlayPause = () => {
    setIsActive(!isActive);
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    const [min, sec] = inputTime.split(":").map(Number);
    setMinutes(min);
    setSeconds(sec);
  };

  const handleInputChange = (e) => {
    setInputTime(e.target.value);
  };

  const handleSetTime = () => {
    const [min, sec] = inputTime.split(":").map(Number);
    setMinutes(min);
    setSeconds(sec);
    setIsActive(false);
    setIsPaused(false);
  };

  const formatTime = (min, sec) =>
    `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const initialTotalSeconds = inputTime
    .split(":")
    .reduce((acc, time) => 60 * acc + +time, 0);
  const remainingSeconds = minutes * 60 + seconds;
  const progress = (remainingSeconds / initialTotalSeconds) * circumference;

  return (
    <div className="container">
      <h1>Pomodoro Timer</h1>
      <div className="time-input">
        <input
          type="text"
          value={inputTime}
          onChange={handleInputChange}
          pattern="\d{1,2}:\d{2}"
          placeholder="mm:ss"
        />
        <button onClick={handleSetTime}>Set Time</button>
      </div>
      <div className="timer">
        <svg className="progress-ring" width="220" height="220">
          <circle
            className="progress-ring__circle"
            stroke="white"
            strokeWidth="4"
            fill="transparent"
            r={radius}
            cx="110"
            cy="110"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: progress,
            }}
          />
        </svg>
        <span className="time">{formatTime(minutes, seconds)}</span>
      </div>
      <div className="controls">
        <button className="control-button" onClick={handlePlayPause}>
          {isActive && !isPaused ? <FaPause /> : <FaPlay />}
        </button>
        <button className="control-button" onClick={handleReset}>
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

export default App;
