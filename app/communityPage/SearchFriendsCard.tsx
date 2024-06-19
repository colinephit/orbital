import React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { amber, pink } from "@mui/material/colors";
import { Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

// friend has not yet added as a friend of current user
// potential friends appear here when users are searching for friends to add
// this should take in an argument being the friend {friend} along with its data stored in the database
// take in one argument, {friend}

function SearchFriendsCard() {
  return (
    <Card
      sx={{
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
        width: 500,
        height: 180,
        backgroundColor: amber[50],
      }}
    >
      <div style={{ display: "flex", alignItems: "center", paddingLeft: 20 }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            marginTop: "10px",
            marginBottom: "10px",
            marginLeft: "10px",
            borderRadius: "50%",
          }}
        >
          {/*Placeholder for friends profile picture */}
          <PersonIcon sx={{ height: 70, width: 50 }} />
        </Avatar>
        <div>
          <div
            style={{
              alignItems: "left",
              justifyContent: "left",
              display: "flex",
              marginLeft: "40px",
              marginBottom: "13px",
              fontSize: "30px",
              fontFamily: "Segoe UI",
            }}
          >
            {"Friend Username"}
          </div>
        </div>
        <div
          style={{
            marginLeft: "35px",
            marginTop: "100px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              "&:hover": {
                backgroundColor: pink[300],
              },
              backgroundColor: pink[200],
              outline: pink[300],
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default SearchFriendsCard;
