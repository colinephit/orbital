"use client";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { calculateHappinessLevel } from "./HappinessCalculator";
import { useSession } from "next-auth/react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

async function getUserPoints(email) {
  const pointsCollection = collection(db, "points");
  const q = query(pointsCollection, where("Email", "==", email));
  const querySnapshot = await getDocs(q);

  let userPoints = 0;
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    userPoints = data.Points;
  });

  console.log("user points: ", userPoints);
  return userPoints;
}

export default function PupMoods() {
  const { data: session } = useSession();
  const [happinessLevel, setHappinessLevel] = useState(0);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    async function fetchHappinessLevel() {
      if (session?.user?.email) {
        const happinessLevel = await calculateHappinessLevel(
          session.user.email
        );
        setHappinessLevel(happinessLevel);
      }
    }

    async function fetchUserPoints() {
      if (session?.user?.email) {
        const points = await getUserPoints(session.user.email);
        setUserPoints(points);
      }
    }

    fetchHappinessLevel();
    fetchUserPoints();
  }, [session]);

  console.log(userPoints);
  const dogIndex = Math.floor(userPoints / 3600) + 1;
  console.log(dogIndex);
  let imgSrc = `/Dog${dogIndex}_Sad.gif`;

  if (happinessLevel > 70) {
    imgSrc = imgSrc.replace("Sad", "Happy");
  } else if (happinessLevel > 40) {
    imgSrc = imgSrc.replace("Sad", "Neutral");
  }

  return <img src={imgSrc} className="size-3/6 p-0" alt="Pup Mood" />;
}
