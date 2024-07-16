"use client";
import FriendsCard from "./FriendsCard";
import FriendRequests from "./FriendRequests";
import AddFriends from "./AddFriends";
import Alert from "@mui/material/Alert";
import InfoIcon from "@mui/icons-material/Info";

import SearchFriendsPopUp from "./SearchFriendsPopUp";
import Leaderboard from "./Leaderboard";
import { Info, Search } from "@mui/icons-material";
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <SearchFriendsPopUp />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              paddingBottom: "30px",
              marginTop: "60px",
              width: "100%",
            }}
          >
            <h1 style={{ textAlign: "center" }}>Friend Requests</h1>
            <div>
              {requests.length === 0 && (
                <Alert
                  sx={{
                    fontSize: "17px",
                    width: "80%",
                    marginLeft: "10%",
                    marginTop: "20px",
                    textAlign: "center",
                  }}
                  severity="success"
                >
                  You have no pending friend requests
                </Alert>
              )}
            </div>

            <div style={{ marginTop: "20px" }}>
              {requests.length != 0 && (
                <Alert
                  severity="warning"
                  sx={{
                    fontSize: "17px",
                    width: "40%",
                    marginLeft: "20%",
                    marginBottom: "40px",
                  }}
                  icon={<InfoIcon />}
                >
                  You have {requests.length} pending friend requests.
                </Alert>
              )}
              {requests.map((request, index) => (
                <FriendRequests key={index} request={request} />
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <h1 className="text-center">My Friends</h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {friends.map((friend, index) => (
                <FriendsCard key={index} friend={friend} />
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "100px",
          }}
        >
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}

export default Page;
