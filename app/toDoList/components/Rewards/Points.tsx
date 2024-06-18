"use client";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../../../../firebase";
import { addDoc, doc, setDoc } from "firebase/firestore";

async function sumHoursFromCompleted(email) {
  const completedCollection = collection(db, "completed");
  const q = query(completedCollection, where("Email", "==", email));
  const querySnapshot = await getDocs(q);

  let totalHours = 0;
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.Hours) {
      totalHours += parseFloat(data.Hours) || 0;
    }
  });

  const pts = totalHours * 100;
  updateUserPoints(email, pts);

  return totalHours;
}

async function updateUserPoints(email, points) {
  const pointsCollection = collection(db, "points");
  const q = query(pointsCollection, where("Email", "==", email));

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // If user exists, update points
    querySnapshot.forEach(async (doc) => {
      const docRef = doc.ref;
      await updateDoc(docRef, {
        Points: points,
      });
      //console.log("Points updated for:", email);
    });
  } else {
    // If user does not exist, create a new document
    const newDocRef = doc(pointsCollection);
    await setDoc(newDocRef, {
      Email: email,
      Points: 0,
    });
    // console.log("New user added with email:", email);
  }
}

function TotalHours() {
  const { data: session } = useSession();
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    async function fetchTotalHours() {
      if (session?.user?.email) {
        const hours = await sumHoursFromCompleted(session.user.email);
        setTotalHours(hours);
      }
    }

    fetchTotalHours();
  }, [session]);

  return totalHours * 100;
}

export default TotalHours;
