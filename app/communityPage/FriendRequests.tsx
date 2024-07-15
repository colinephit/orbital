import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { amber, pink } from "@mui/material/colors";
import { Button } from "@mui/material";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../firebase";
import {
  updateDoc,
  arrayUnion,
  doc,
  setDoc,
  arrayRemove,
} from "firebase/firestore";
import { useSession } from "next-auth/react";

async function addFriend(user, friend) {
  const friendsCollection = collection(db, "friends");
  const quser = query(friendsCollection, where("Email", "==", user));
  const qfriend = query(friendsCollection, where("Email", "==", friend));

  const querySnapshot = await getDocs(quser);
  const qSnapshot = await getDocs(qfriend);

  let docId = null;

  if (!querySnapshot.empty) {
    const userDocs = querySnapshot.docs.map(async (doc) => {
      const docRef = doc.ref;
      await updateDoc(docRef, {
        Friends: arrayUnion(friend),
      });
      return docRef.id;
    });

    const docIds = await Promise.all(userDocs);
    docId = docIds[0];

    if (!qSnapshot.empty) {
      const friendDocs = qSnapshot.docs.map(async (doc) => {
        const docRef = doc.ref;
        await updateDoc(docRef, {
          Friends: arrayUnion(user),
        });
      });
      await Promise.all(friendDocs);
    } else {
      const newDocRef = doc(friendsCollection);
      await setDoc(newDocRef, {
        Email: friend,
        Friends: [user],
      });
    }
  } else {
    const newDocRef = doc(friendsCollection);
    await setDoc(newDocRef, {
      Email: user,
      Friends: [friend],
    });

    if (!qSnapshot.empty) {
      const friendDocs = qSnapshot.docs.map(async (doc) => {
        const docRef = doc.ref;
        await updateDoc(docRef, {
          Friends: arrayUnion(user),
        });
      });
      await Promise.all(friendDocs);
    } else {
      const newDocRef = doc(friendsCollection);
      await setDoc(newDocRef, {
        Email: friend,
        Friends: [user],
      });
    }
  }

  console.log("user ", user);
  console.log("friend ", friend);
  console.log(docId);

  if (docId) {
    const userDoc = doc(db, "friends", docId);
    try {
      await updateDoc(userDoc, {
        Requests: arrayRemove(friend),
      });
    } catch (e) {
      console.error("Error removing friend request: ", e);
    }
  }
}

async function getUserInfo(email) {
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  let userInfo = {};

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    userInfo = {
      name: data.name,
      image: data.image,
    };
  });

  return userInfo;
}

function FriendRequests({ request }) {
  const [info, setInfo] = useState({});

  const currentUser = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inf = await getUserInfo(request);
        setInfo(inf);
      } catch (e) {
        console.error("Error fetching data: " + e);
      }
    };

    if (request) {
      fetchData();
    }
  }, [request]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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
            //@ts-ignore
            src={info.image}
            sx={{
              width: 80,
              height: 80,
              marginTop: "10px",
              marginBottom: "10px",
              marginLeft: "10px",
              borderRadius: "50%",
            }}
          >
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
              {/* @ts-ignore */}
              {info.name}
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
                console.log(request);
                const addedFriend = await addFriend(
                  currentUser.data.user.email,
                  request
                );
                location.reload();
              }}
              sx={{
                "&:hover": {
                  backgroundColor: pink[300],
                },
                backgroundColor: pink[300],
                outline: pink[300],
                marginLeft: "40%",
              }}
            >
              Accept
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default FriendRequests;
