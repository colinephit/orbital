"use client";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { calculateHappinessLevel } from "./HappinessCalculator";
import { useSession } from "next-auth/react";

export default function HappinessLevel() {
  const { data: session } = useSession();
  const [happinessLevel, setHappinessLevel] = useState(0);

  useEffect(() => {
    async function fetchHappinessLevel() {
      if (session?.user?.email) {
        const happinessLevel = await calculateHappinessLevel(session.user.email);
        setHappinessLevel(happinessLevel);
      }
    }

    fetchHappinessLevel();
  }, [session]);

  return (
    <ProgressBar happinessLevel={happinessLevel} />
  )
}
