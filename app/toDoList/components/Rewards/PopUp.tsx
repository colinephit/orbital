"use client";
// modified from PopUpCheckbox, includes functionalities
// modified checkbox, pop up that asks users to key in their number of hours spent when the checkbox is clicked

import * as React from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { blue, pink } from "@mui/material/colors";
import SelectHours from "./SelectHours";
import PopUpCheckbox from "./PopUpCheckbox";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  onClickAction: (hours: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, onClickAction } = props;

  const [hours, setHours] = React.useState(""); 

  const handleClose = () => {
    onClose(selectedValue);
    onClickAction(hours);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        Well done on completing your task! Select the time spent on this task to
        receive your points.
      </DialogTitle>
      <div className="flex justify-center items-center">
        <SelectHours hours={hours} onHoursChange={setHours} />
      </div>

      <div className="flex justify-center items-center">
        <DialogActions>
          <Button autoFocus onClick={handleClose} sx={{ color: pink[700] }}>
            Confirm
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

interface PopUpProps {
  onClickAction: (hours: string) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  completed: () => void;
}

export default function PopUp({ onClickAction, inputProps }) {
  const [open, setOpen] = React.useState(false);
  //const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  const handleHoursSelected = (hours: string) => {
    console.log("Selected hours:", hours);
    onClickAction(hours);
  }

  return (
    <div>
      <Typography variant="subtitle1" component="div"></Typography>
      <br />

      <PopUpCheckbox onClickAction={handleClickOpen} />

      {/* <ModifiedCheckbox onClick={handleClickOpen}/> */}

      <SimpleDialog
        selectedValue={null}
        open={open}
        onClose={handleClose}
        onClickAction={handleHoursSelected}
      />
    </div>
  );
}

