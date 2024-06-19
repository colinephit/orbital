import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddFriends from "./AddFriends";
import SearchFriendsCard from "./SearchFriendsCard";

// the Add Friends Button that causes the search pop up upon click

function SearchFriendsPopUp() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <AddFriends onClick={handleClickOpen} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
          maxWidth="sm"
          fullWidth
          style={{
            textAlign: "center",
          }}
        >
          <DialogTitle style={{ fontSize: "25px" }}>Find Friends</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Description on how to add friends, eg search their username or
              email
              {/*note: i just left the email address here in case its easier but if not can just use text field*/}
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          {/*each possible friend will show up in each of these cards*/}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SearchFriendsCard />
          </div>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>

            {/*<Button type="submit">Add</Button>*/}
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
}

export default SearchFriendsPopUp;
