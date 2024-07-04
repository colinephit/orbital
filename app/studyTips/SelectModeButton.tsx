// button for users to select either the "Focus" mode or the "Break" mode

import React from "react";
import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";

function SelectModeButton({ mode, onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        fontSize: "20px",
        color: "#f5f5f5",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        width: "300px",
      }}
    >
      {mode}
    </Button>
  );
}

export default SelectModeButton;
