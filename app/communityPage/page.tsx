"use client";
import FriendsCard from "./FriendsCard";
import AddFriends from "./AddFriends";
import SearchFriendsPopUp from "./SearchFriendsPopUp";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

async function getFriendsDatabase(email) {
  const friendsCollection = collection(db, "friends");
  const q = query(friendsCollection, where("Email", "==", email));
  const querySnapshot = await getDocs(q);

  let friends = [];

  querySnapshot.forEach((doc) => {
    friends = doc.data().Friends || [];
  });

  return friends;
}

function Page() {
  const [friends, setFriends] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const fetchData = async () => {
        try {
          const friendsArray = await getFriendsDatabase(session.user.email);
          setFriends(friendsArray);
        } catch (e) {
          console.error("Error fetching data: " + e);
        }
      };
      fetchData();
    }
  }, [status, session]);

  if (friends.length == 0) {
    return (
      <div>
        <h1>You have no friends :,D</h1>
        <SearchFriendsPopUp />
      </div>
    );
  }

  return (
    <div>
      <h1>My Friends</h1>
      <SearchFriendsPopUp />
      <div style={{ marginTop: "30px" }}>
        {friends.map((friend) => (
          <FriendsCard friend={friend} />
        ))}
      </div>
    </div>
  );
}

export default Page;
