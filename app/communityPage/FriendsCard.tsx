import React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { amber } from "@mui/material/colors";

// friend has already been added as a friend of current user
// this should take in an argument being the friend {friend} along with its data stored in the database
function FriendsCard() {
  return (
    <Card
      sx={{
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
        width: 580,
        height: 200,
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
          <div
            style={{
              marginLeft: "40px",
              marginBottom: "15px",
              fontSize: "27px",
              fontFamily: "Segoe UI",
            }}
          >
            {"Friend points"}
          </div>
        </div>
        <div>
          {/*Placeholder for friends' pup*/}
          <img
            src={"/Dog1_Neutral.gif"}
            alt=""
            width="150"
            height="130"
            style={{
              marginTop: "10px",
              marginLeft: "30px",
              marginRight: "10px",
              marginBottom: "10px",
            }}
          />
        </div>
      </div>
    </Card>
  );
}

export default FriendsCard;
