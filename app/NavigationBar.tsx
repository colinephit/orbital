import Link from "next/link";
import LogIn from "./Login";
import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";

const linkStyle = {
  textDecoration: "none",
  color: "rgb(204,0,102)",
};

function NavigationBar() {
  return (
    <div className="navbar bg-white ">
      <div className="flex-1">
        <p className="text-6xl font-mono font-semibold tracking-wider text-pink-700">
          Pawductivity Pup
        </p>
      </div>

      <ul className="menu bg-gray-100 lg:menu-horizontal rounded-box w-45 align-left">
        <li>
          <Link href="/" style={linkStyle}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
            <HomeRoundedIcon />
            Home
          </Link>
        </li>
        <li>
          <Link href="/aboutUs" style={linkStyle}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
            <InfoRoundedIcon />
            About Us
          </Link>
        </li>
        <li>
          <Link href="/toDoList" style={linkStyle}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <CreateRoundedIcon />
            To Do List
          </Link>
        </li>
        <li>
          <Link href="/studyTips" style={linkStyle}>
            <WorkRoundedIcon />
            Productivity Page
            <span className="badge badge-xs badge-info"></span>
          </Link>
        </li>
      </ul>

      <div>
        <LogIn />
      </div>
    </div>
  );
}

export default NavigationBar;
