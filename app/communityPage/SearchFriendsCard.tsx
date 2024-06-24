import React from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { amber, pink } from "@mui/material/colors";
import { Button } from "@mui/material";
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

async function addFriend(user, friend) {
  const friendsCollection = collection(db, "friends");
  const q = query(friendsCollection, where("Email", "==", user));

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // If user exists, update friend
    querySnapshot.forEach(async (doc) => {
      const docRef = doc.ref;
      await updateDoc(docRef, {
        Friends: arrayUnion(friend),
      });
    });
  } else {
    // If user does not exist, create a new document
    const newDocRef = doc(friendsCollection);
    await setDoc(newDocRef, {
      Email: user,
      Friends: [friend],
    });
  }
}

function SearchFriendsCard({ friend }) {
  const currentUser = useSession();
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
        <div>
          <div
            style={{
              alignItems: "left",
              justifyContent: "left",
              display: "flex",
              marginLeft: "40px",
              marginBottom: "1px",
              fontSize: "30px",
              fontFamily: "Segoe UI",
            }}
          >
            {friend.name}
          </div>
        </div>
        <div
          style={{
            marginLeft: "35px",
          }}
        >
          <Button
            variant="contained"
            onClick={async (e) => {
              console.log(friend.email, currentUser.data.user.email);
              const addedFriend = await addFriend(
                currentUser.data.user.email,
                friend.email
              );
            }}
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
