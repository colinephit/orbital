import { TextField } from "@mui/material";

function InputTextField({ value, label, onChangeAction }) {
  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={onChangeAction}
      required
      autoComplete="off"
    ></TextField>
  );
}

export default InputTextField;
