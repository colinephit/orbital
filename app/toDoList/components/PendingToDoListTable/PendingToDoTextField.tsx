// table for the PENDING items on the to do list (ie these items have been added, but not yet completed)\

// want a text field that is multiline, disabled (not able to edit)

import TextField from "@mui/material/TextField";
import { lightGreen } from "@mui/material/colors";

function PendingToDoTextField({ text }) {
  return (
    <TextField
      defaultValue={text}
      id="filled-disabled filled-multiline-flexible"
      margin="normal"
      multiline
      maxRows={4}
      style={{ color: lightGreen[300], width: "80%" }}
      inputProps={{ readOnly: true }}
    ></TextField>
  );
}

export default PendingToDoTextField;
