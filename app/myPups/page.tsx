"use client";

import React from "react";
import PupCard from "./PupCard";
import LockedPupCard from "./LockedPupCard";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from "react";

async function getPupsDatabase() {
  const pupsCollection = collection(db, "pups"); // collection of pups in firebase
  const q = query(pupsCollection);
  const querySnapshot = await getDocs(q);

  const unlockedPups = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.Unlocked) {
      unlockedPups.push(data);
    }
  });
  return unlockedPups;
}

function Page() {
  const [unlockedPups, setUnlockPups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pups = await getPupsDatabase();
        setUnlockPups(pups);
      } catch (e) {
        console.error("Error fetching data: " + e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>My Pups</h1>
      {/*an example of how pup card will be used (map different types of unlocked pups to each of their own card)*/}

      <div className="flex flex-row pt-10 justify-center">
        {unlockedPups.map((pup) => (
          <PupCard
            key={pup.id}
            pupImage={""}
            pupName={pup.Name}
            description={pup.Description}
          />
        ))}

        <LockedPupCard />
      </div>
    </div>
  );
}

export default Page;

// old hardcoded pupcards
{
  /* <PupCard
          pupImage={""}
          pupName={"Milo"}
          description={"Fluffy and loves to eat"}
        /> */
}
{
  /* <PupCard
          pupImage={""}
          pupName={"Waffles"}
          description={"Friendly and affectionate, the best companion dog"}
        />
        <PupCard
          pupImage={""}
          pupName={"Cookie"}
          description={
            "Intelligible, sociable, loyal, and loves outdoor activities"
          }
        /> */
}
