// table for the COMPLETED items on the to do list

// want a text field that is multiline, disabled (not able to edit)

import TextField from "@mui/material/TextField";
import { lightGreen } from "@mui/material/colors";

function CompletedToDoTextField({ text }) {
  return <div style={{ fontSize: "16px" }}>{text}</div>;
}

export default CompletedToDoTextField;
