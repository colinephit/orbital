'use client'

import React from "react"
import { signIn, signOut, useSession } from "next-auth/react";

const LogIn = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div>
        <p>{session.user.name}</p>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn()}>Login</button>
  );
};

export default LogIn