import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { amber } from "@mui/material/colors";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../firebase";

async function getUserPoints(email) {
  try {
    const pointsCollection = collection(db, "points");
    const q = query(pointsCollection, where("Email", "==", email));
    const querySnapshot = await getDocs(q);

    let userPoints = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      userPoints = data.Points;
    });

    return userPoints;
  } catch (error) {
    console.error("Error in getUserPoints: ", error);
    return 0;
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

function FriendsCard({ friend }) {
  const [points, setPoints] = useState(0);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pts = await getUserPoints(friend);
        setPoints(pts);
      } catch (e) {
        console.error("Error fetching data: " + e);
      }
    };

    if (friend) {
      fetchData();
    }
  }, [friend]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inf = await getUserInfo(friend);
        setInfo(inf);
      } catch (e) {
        console.error("Error fetching data: " + e);
      }
    };

    if (friend) {
      fetchData();
    }
  }, [friend]);

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
          <div
            style={{
              marginLeft: "40px",
              marginBottom: "15px",
              fontSize: "27px",
              fontFamily: "Segoe UI",
            }}
          >
            {points + " points"}
          </div>
        </div>
        <div>
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
