"use client";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../../../firebase";

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

  return totalHours;
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
