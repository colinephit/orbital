"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LogIn = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogin = async () => {
    signIn(undefined, { callbackUrl: "/" });
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
              <img
                alt="Tailwind CSS Navbar component"
                src={session.user.image}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">{session.user.name}</a>
            </li>
            <li>
              <a href="/aboutUs">
                <button>About Us</button>
              </a>
            </li>
            <li>
              <button onClick={() => signOut()}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LogIn;
