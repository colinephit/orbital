// table for the COMPLETED items on the to do list

// want a text field that is multiline, disabled (not able to edit)

import TextField from "@mui/material/TextField";
import { lightGreen } from "@mui/material/colors";

function CompletedToDoTextField({ text }) {
  return (
    <TextField
      defaultValue={text}
      id="filled-disabled filled-multiline-flexible"
      margin="normal"
      multiline
      maxRows={4}
      style={{ color: lightGreen[300], width: "100%" }}
      inputProps={{ readOnly: true }}
      //helperText={"Due " + deadline}
    ></TextField>
  );
}

export default CompletedToDoTextField;
