import React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { amber, pink } from "@mui/material/colors";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useSession } from "next-auth/react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase";

// friend has not yet added as a friend of current user
// potential friends appear here when users are searching for friends to add
// this should take in an argument being the friend {friend} along with its data stored in the database
// take in one argument, {friend}

async function sendFriendRequest(user, friend) {
  if (user == friend) {
    alert("You can't befriend yourself...!");
    return;
  }

  const friendsCollection = collection(db, "friends");
  const q = query(friendsCollection, where("Email", "==", friend));

  const quser = query(friendsCollection, where("Email", "==", user));
  const userSnapshot = await getDocs(quser);

  let alreadyFriends = false;

  if (!userSnapshot.empty) {
    userSnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.Friends && userData.Friends.includes(friend)) {
        alreadyFriends = true;
      }
    });
  }

  if (alreadyFriends) {
    alert("You are already friends with that user :D");
    return;
  }

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    querySnapshot.forEach(async (doc) => {
      const friendData = doc.data();
      if (friendData.Requests && friendData.Requests.includes(user)) {
        alert("You have already sent a request to that user :D");
        return;
      }
      const docRef = doc.ref;
      await updateDoc(docRef, {
        Requests: arrayUnion(user),
      });
    });
  } else {
    const newDocRef = doc(friendsCollection);
    await setDoc(newDocRef, {
      Email: user,
      Requests: [user],
    });
  }
}

function SearchFriendsCard({ friend }) {
  const currentUser = useSession();

  return (
    <div>
      <Card
        sx={{
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
          width: 600,
          height: 180,
          backgroundColor: amber[50],
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            marginTop: "30px",
          }}
        >
          <Avatar
            src={friend.image}
            sx={{
              width: 80,
              height: 80,
              marginTop: "10px",
              marginBottom: "10px",
              marginLeft: "10px",
              borderRadius: "50%",
            }}
          ></Avatar>

          <div
            style={{
              alignItems: "left",
              justifyContent: "left",
              display: "flex",
              marginLeft: "40px",
              marginBottom: "1px",
              fontSize: "30px",
              fontFamily: "Segoe UI",
              width: "180px",
            }}
          >
            {friend.name}
          </div>

          <Button
            variant="contained"
            onClick={async (e) => {
              const requestFriend = await sendFriendRequest(
                currentUser.data.user.email,
                friend.email
              );
            }}
            sx={{
              "&:hover": {
                backgroundColor: pink[300],
              },
              backgroundColor: pink[300],
              outline: pink[300],
              marginLeft: "100px",
            }}
          >
            Send request
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default SearchFriendsCard;
