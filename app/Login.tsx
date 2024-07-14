"use client";

import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TotalHours from "./toDoList/components/Rewards/Points";
import Link from "next/link";
import Button from "@mui/material/Button";
import { pink, lightGreen } from "@mui/material/colors";
import { db } from "../firebase"; // Adjust the import path as necessary
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const LogIn = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const authenticated = session?.user !== undefined;

  const [userData, setUserData] = useState({ name: "", image: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      if (authenticated) {
        if (session?.user?.name === undefined) {
          const users = collection(db, "users");
          const q = query(users, where("email", "==", session?.user?.email));
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            setUserData({ name: data.name, image: data.image });
          });
        } else {
          setUserData({ name: session.user.name, image: session.user.image });
        }
      }
    };

    fetchUserData();
  }, [session]);

  const handleLogin = async () => {
    const result = await signIn(undefined, {
      redirect: true,
      callbackUrl: "/",
    });

    if (result?.error) {
      alert("Wrong credentials!");
    } else {
      router.push("/");
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
    router.push("/");
  };

  if (session && session.user) {
    return (
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img src={userData.image} alt="Tailwind CSS Navbar component" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <div className="justify-between">
                {userData.name} <br /> <TotalHours /> points
              </div>
            </li>

            <li>
              <Link href="/myPups" className="justify-between">
                My Pups
              </Link>
            </li>

            <li>
              <Link href="/communityPage" className="justify-between">
                My Friends
              </Link>
            </li>

            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Button
        variant="contained"
        onClick={handleLogin}
        sx={{
          backgroundColor: "#82b1ff",
          "&:hover": {
            backgroundColor: "#8c9eff",
          },
          marginBottom: "15px",
        }}
      >
        Login
      </Button>
    </div>
  );
};

export default LogIn;
