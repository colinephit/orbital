import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

export default function ForgotPassword() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const resetEmail = async (email) => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent!");
        setOpen(false);
      } catch (error) {
        console.error("Error sending password reset email:", error);
        alert("Error sending password reset email.");
      }
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>Forgot Password</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: () => {
            console.log(email);
            resetEmail(email);
          },
        }}
      >
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email address here. We will send an email to reset
            your password.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Ok</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
