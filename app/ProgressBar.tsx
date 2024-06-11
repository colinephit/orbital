"use client";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import React from "react";
import { styled } from "@mui/material/styles";
import {
  red,
  orange,
  amber,
  yellow,
  lime,
  lightGreen,
  green,
} from "@mui/material/colors";

// progress bar that displays different colours according to the pup's happiness level
function ProgressBar({ happinessLevel }: { happinessLevel: number }) {
  const getGradientColor = (happinessLevel: number) => {
    // Interpolating gradient colors based on thresholds
    if (happinessLevel <= 10) {
      return `linear-gradient(to right, ${red[900]}, ${red[600]})`;
    } else if (happinessLevel <= 20) {
      return `linear-gradient(to right, ${red[900]}, ${orange[600]})`;
    } else if (happinessLevel <= 30) {
      return `linear-gradient(to right, ${orange[900]}, ${amber[500]})`;
    } else if (happinessLevel <= 40) {
      return `linear-gradient(to right, ${orange[800]}, ${amber[200]})`;
    } else if (happinessLevel <= 50) {
      return `linear-gradient(to right, ${orange[400]}, ${yellow[200]})`;
    } else if (happinessLevel <= 60) {
      return `linear-gradient(to right, ${amber[400]}, ${lime[200]})`;
    } else if (happinessLevel <= 70) {
      return `linear-gradient(to right, ${yellow[400]}, ${lime[600]})`;
    } else if (happinessLevel <= 80) {
      return `linear-gradient(to right, ${lime[300]}, ${green[400]})`;
    } else if (happinessLevel <= 90) {
      return `linear-gradient(to right, ${lightGreen[500]}, ${green[500]})`;
    } else if (happinessLevel < 100) {
      return `linear-gradient(to right, ${green[500]}, #00e676)`;
    } else {
      return "#00c853"; // green colour when happiness level is 100%
    }
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 50,
    borderRadius: 30,
    width: 800,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[300],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 20,
      // backgroundColor: getColour(happinessLevel),
      background: getGradientColor(happinessLevel),
    },
  }));

  return <BorderLinearProgress variant="determinate" value={happinessLevel} />;
}

export default ProgressBar;
