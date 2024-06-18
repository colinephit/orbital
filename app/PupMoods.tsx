"use client";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { calculateHappinessLevel } from "./HappinessCalculator";
import { useSession } from "next-auth/react";

export default function PupMoods() {
  const { data: session } = useSession();
  const [happinessLevel, setHappinessLevel] = useState(0);

  useEffect(() => {
    async function fetchHappinessLevel() {
      if (session?.user?.email) {
        const happinessLevel = await calculateHappinessLevel(
          session.user.email
        );
        setHappinessLevel(happinessLevel);
      }
    }

    fetchHappinessLevel();
  }, [session]);

  if (happinessLevel <= 40) {
    return <img src="/Dog1_Sad.gif" className="size-3/6 p-0"></img>;
  } else if (happinessLevel <= 70) {
    return <img src="/Dog1_Neutral.gif" className="size-3/6 p-0"></img>;
  } else if (happinessLevel <= 100) {
    return <img src="/Dog1_Happy.gif" className="size-3/6 p-0"></img>;
  }
}
