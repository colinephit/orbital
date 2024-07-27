"use client";

import React, { useEffect, useState, useRef } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TotalHours from "./toDoList/components/Rewards/Points";
import Link from "next/link";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { db } from "../firebase"; // Adjust the import path as necessary
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FormControlLabel } from "@mui/material";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { "aria-label": "music switch" } };

const LogIn = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const authenticated = session?.user !== undefined;

  const [userData, setUserData] = useState({ name: "", image: "" });
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (authenticated) {
        const users = collection(db, "users");
        const q = query(users, where("email", "==", session?.user?.email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setUserData({ name: data.name, image: data.image });
        });
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

  const handleAudioToggle = () => {
    setIsAudioPlaying((prev) => !prev);
    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const linkStyle = {
    textDecoration: "none",
    color: "black",
  };

  if (session && session.user) {
    return (
      <div className="flex-none gap-2">
        <audio id="audio" loop autoPlay ref={audioRef}>
          <source src="/music.mp3" />
        </audio>
        <div className="dropdown dropdown-end bg-white">
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
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
          >
            <li>
              <Link
                href="/profile"
                className="justify-between"
                style={linkStyle}
              >
                {userData.name} <br /> <TotalHours /> points
              </Link>
            </li>

            <li>
              <Link
                href="/myPups"
                className="justify-between"
                style={linkStyle}
              >
                My Pups
              </Link>
            </li>

            <li>
              <Link
                href="/communityPage"
                className="justify-between"
                style={linkStyle}
              >
                My Friends
              </Link>
            </li>

            <li className="width-full items-center">
              <FormControlLabel
                value="end"
                control={
                  <PinkSwitch
                    {...label}
                    checked={isAudioPlaying}
                    onChange={handleAudioToggle}
                  />
                }
                label="Music"
                labelPlacement="end"
              />
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
