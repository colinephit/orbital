"use client";
import FriendsCard from "./FriendsCard";
import FriendRequests from "./FriendRequests";
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

async function getFriendRequests(email) {
  const requestsCollection = collection(db, "friends");
  const q = query(requestsCollection, where("Email", "==", email));
  const querySnapshot = await getDocs(q);

  let requests = [];

  querySnapshot.forEach((doc) => {
    requests = doc.data().Requests || [];
  });

  return requests;
}

function Page() {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
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

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsArray = await getFriendRequests(session.user.email);
        setRequests(requestsArray);
      } catch (e) {
        console.error("Error fetching friend requests: " + e);
      }
    };
    fetchRequests();
  }, [session]);

  if (friends.length == 0) {
    return (
      <div>
        <h1>You have no friends :,D</h1>
        <SearchFriendsPopUp />
        <h1>Friend Requests</h1>
        <div style={{ marginTop: "30px" }}>
          {requests.map((request, index) => (
            <FriendRequests key={index} request={request} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <SearchFriendsPopUp />
      </div>
      <div style={{ display: "flex", textAlign: "center" }}>
        <div style={{ flex: 1 }}>
          <h1 className="">My Friends</h1>
          <div style={{ marginTop: "30px" }}>
            {friends.map((friend, index) => (
              <FriendsCard key={index} friend={friend} />
            ))}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h1>Friend Requests</h1>
          <div style={{ marginTop: "30px" }}>
            {requests.map((request, index) => (
              <FriendRequests key={index} request={request} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
