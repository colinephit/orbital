import React from "react";
import { purple, pink } from "@mui/material/colors";
import Button from "@mui/material/Button";

// making all of the buttons in the to do list reusable by isolating the code for the button here
// button template for all buttons

function ToDoButton({ text, onClickAction }) {
  return (
    <Button
      type="button"
      variant="contained"
      onClick={onClickAction}
      sx={{
        backgroundColor: pink[300],
        mt: 3,
        ml: 70,
        margin: "0 auto",
        display: "flex",
        "&:hover": {
          backgroundColor: pink[400],
        },
      }}
    >
      {text}
    </Button>
  );
}

export default ToDoButton;
