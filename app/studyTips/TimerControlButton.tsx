// button template for the Start, Pause and Reset timer to control the timer
import { Button } from "@mui/material";

function TimerControlButton({ text, onClick }) {
  return (
    <Button
      style={{
        backgroundColor: "#82b1ff",
        height: "50px",
        width: "100px",
        fontSize: "18px",
      }}
      variant="contained"
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default TimerControlButton;
