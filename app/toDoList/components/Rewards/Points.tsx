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

function startOfWeek(date) {
  // Calculate the difference between the date's day of the month and its day of the week
  var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

  // Set the date to the start of the week by setting it to the calculated difference
  return new Date(date.setDate(diff));
}

async function sumHoursFromCompleted(email) {
  const completedCollection = collection(db, "completed");
  const q = query(completedCollection, where("Email", "==", email));
  const querySnapshot = await getDocs(q);

  let totalHours = 0;
  let weeklyHours = 0;
  const startoftheweek = startOfWeek(new Date());
  const nextWeek = new Date(
    startoftheweek.getFullYear(),
    startoftheweek.getMonth(),
    startoftheweek.getDate() + 7
  );

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    console.log(data.createdAt.toDate() > startoftheweek);
    if (data.Hours) {
      totalHours += parseFloat(data.Hours) || 0;
      if (data.createdAt.toDate() > startoftheweek) {
        weeklyHours += parseFloat(data.Hours) || 0;
      }
    }
  });

  const pts = totalHours * 100;
  const weeklypts = weeklyHours * 100;
  updateUserPoints(email, pts, weeklypts);

  return totalHours;
}

async function updateUserPoints(email, points, weeklypoints) {
  const pointsCollection = collection(db, "points");
  const q = query(pointsCollection, where("Email", "==", email));

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // If user exists, update points
    querySnapshot.forEach(async (doc) => {
      const docRef = doc.ref;
      await updateDoc(docRef, {
        Points: points,
        WeeklyPoints: weeklypoints,
      });
    });
  } else {
    // If user does not exist, create a new document
    const newDocRef = doc(pointsCollection);
    await setDoc(newDocRef, {
      Email: email,
      Points: points,
      WeeklyPoints: weeklypoints,
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
