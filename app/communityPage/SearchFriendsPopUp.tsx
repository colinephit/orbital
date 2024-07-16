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
import Alert from "@mui/material/Alert";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

// the Add Friends Button that causes the search pop up upon click

function SearchFriendsPopUp() {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [noUserFound, setNoUserFound] = React.useState(false);

  const handleClickOpen = async () => {
    setOpen(true);
    await fetchUsers();
  };

  const handleClose = () => {
    location.reload();
    setOpen(false);
  };

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);
      const usersList = [];
      querySnapshot.forEach((doc) => {
        usersList.push(doc.data());
      });
      usersList.sort((a, b) => a.name.localeCompare(b.name));
      setUsers(usersList);
      setSearchResults(usersList);
    } catch (error) {
      console.error("Error fetching users data: ", error);
    }
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email;

    try {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        setUser(userDoc.data());
        setNoUserFound(false);
      } else {
        setUser(null);
        setNoUserFound(true);
        console.log("No user found with that email");
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
      setUser(null);
      setNoUserFound(true);
    }
  };

  return (
    <React.Fragment>
      <AddFriends onClick={handleClickOpen} />

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            height: "800px",
          },
          component: "form",
          onSubmit: handleSearch,
        }}
        maxWidth="md"
        fullWidth
        style={{
          textAlign: "center",
        }}
      >
        <DialogTitle style={{ fontSize: "25px", marginRight: "20px" }}>
          Find Friends
        </DialogTitle>

        <DialogContent>
          <DialogContentText>Enter your friend's email</DialogContentText>
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
            style={{ height: "100px" }}
          />
        </DialogContent>

        {/*each possible friend will show up in each of these cards*/}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {user ? (
            <SearchFriendsCard friend={user} />
          ) : (
            noUserFound && (
              <Alert
                severity="error"
                style={{ width: "300px", justifyContent: "center" }}
              >
                No user found
              </Alert>
            )
          )}
        </div>

        <DialogTitle style={{ fontSize: "25px" }}>Existing Users</DialogTitle>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflowX: "scroll",
            whiteSpace: "nowrap",
            height: "500px",
          }}
        >
          {searchResults.length > 0 ? (
            searchResults.map((user, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "30px",
                }}
              >
                <SearchFriendsCard friend={user} />
              </div>
            ))
          ) : (
            <Alert severity="error">No existing users found</Alert>
          )}
        </div>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>

          {/*<Button type="submit">Add</Button>*/}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default SearchFriendsPopUp;
