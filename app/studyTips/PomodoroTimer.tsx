import React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import SelectModeButton from "./SelectModeButton";
import TimerControlButton from "./TimerControlButton";
import { Comic_Neue } from "next/font/google";
import { yellow } from "@mui/material/colors";

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && minutes === 0 && seconds === 0) {
      clearInterval(interval);
      handleTimerCompletion();
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(isBreak ? 5 : 25);
    setSeconds(0);
  };

  const handleToggleBreak = () => {
    setIsBreak(true);
    setIsActive(false);
    setMinutes(5);
    setSeconds(0);
    //handleReset();
  };

  const handleToggleFocus = () => {
    setIsBreak(false);
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    //handleReset();
  };

  const handleTimerCompletion = () => {
    if (isBreak) {
      if (pomodoroCount === 3) {
        setPomodoroCount(0);
        setMinutes(15);
      } else {
        setPomodoroCount(pomodoroCount + 1);
        setMinutes(5);
      }
      setIsBreak(false);
    } else {
      setMinutes(25);
      setIsBreak(true);
    }
  };

  return (
    <div style={{ justifyContent: "center" }}>
      <div>
        <Card sx={{ width: 1400, height: 700, position: "relative" }}>
          <CardMedia
            component="img"
            height="300"
            image="../Timer_Background.png"
            sx={{ position: "absolute", width: "100%", height: "100%" }}
          ></CardMedia>

          <CardContent
            sx={{
              position: "relative",
              zIndex: 1,
              color: "white",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: "100%",
              paddingBottom: "80px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "30px",
              }}
            >
              <div className="pr-20 pt-0">
                <SelectModeButton mode={"Focus"} onClick={handleToggleFocus} />
              </div>
              <div>
                <SelectModeButton mode={"Break"} onClick={handleToggleBreak} />
              </div>
            </div>
            <Typography sx={{ fontSize: "75px", pt: "90px" }}>
              {isBreak ? "Break" : "Focus"}{" "}
            </Typography>
            <div>
              <span style={{ fontSize: "100px" }}>
                {minutes < 10 ? `0${minutes}` : minutes} :{" "}
              </span>
              <span style={{ fontSize: "100px" }}>
                {seconds < 10 ? `0${seconds}` : seconds}{" "}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "40px",
              }}
            >
              <div style={{ paddingRight: "100px" }}>
                {isActive ? (
                  <TimerControlButton text="Pause" onClick={handleStartPause} />
                ) : (
                  <TimerControlButton text="Start" onClick={handleStartPause} />
                )}
              </div>
              <TimerControlButton text="Reset" onClick={handleReset} />
            </div>
            <div className="pt-10 italic">
              {isBreak
                ? "Go outside for a short walk and refresh your mind"
                : "Discipline is the bridge between goals and accomplishments"}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PomodoroTimer;
