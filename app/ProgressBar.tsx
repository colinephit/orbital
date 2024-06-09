import React from "react";
// argument: happiness level
// returns a progress bar that displays the different happiness level correspondingly
// colour of the progress bar content
function ProgressBar({ happinessLevel }: { happinessLevel: number }) {
  if (happinessLevel > 70) {
    return (
      <progress
        className="progress progress-success w-96 h-max"
        value={happinessLevel}
        max="100"
      ></progress>
    );
  } else if (happinessLevel > 40 && happinessLevel <= 70) {
    return (
      <progress
        className="progress progress-warning w-96 h-full"
        value={happinessLevel}
        max="100"
      ></progress>
    );
  } else {
    return (
      <progress
        className="progress progress-error w-96 h-max"
        value={happinessLevel}
        max="100"
      ></progress>
    );
  }
}

export default ProgressBar;
