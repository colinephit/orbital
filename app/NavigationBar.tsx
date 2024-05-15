import Link from "next/link";
import LogIn from "./Login";
import React from "react";

function NavigationBar() {
  return (
    <div className="navbar bg-base-100 ">
      <div className="flex-1">
        <p className="text-6xl font-mono font-semibold tracking-wider text-pink-700">
          Pawductivity Pup
        </p>
      </div>

      <ul className="menu bg-base-200 lg:menu-horizontal rounded-box w-45">
        <li>
          <Link href="/">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
            Home
          </Link>
        </li>
        <li>
          <Link href="/toDoList">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            To Do List
          </Link>
        </li>
        <li>
          <Link href="/studyTips">
            Productivity Break
            <span className="badge badge-xs badge-info"></span>
          </Link>
        </li>
      </ul>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <LogIn />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
