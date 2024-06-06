// checkbox component in the pop up message (style only, no functionalities)

import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";

function PopUpCheckbox({ onClickAction }) {
  return (
    <Checkbox
      edge="start"
      tabIndex={-1}
      onChange={onClickAction}
      sx={{
        "& .MuiSvgIcon-root": { fontSize: 28 },
        color: pink[800],
        "&.Mui-checked": { color: pink[400] },
      }}
    />
  );
}

export default PopUpCheckbox;
