"use client";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Button from "@mui/material/Button";
import { pink } from "@mui/material/colors";

// Add Friends button component only (design only, no functionality)
function AddFriends({ onClick }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        type="button"
        variant="contained"
        onClick={onClick}
        sx={{
          backgroundColor: pink[300],
          mt: 3,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: pink[400],
          },
        }}
      >
        Add Friends
      </Button>
    </div>
  );
}

export default AddFriends;
