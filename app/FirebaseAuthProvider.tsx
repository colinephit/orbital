'use client'

import { signInWithCustomToken } from "firebase/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { auth } from "../firebase";

async function syncFirebaseAuth(session: Session) {
  if (session && session.firebaseToken)  {
    try {
      await signInWithCustomToken(auth, session.firebaseToken)
      //console.log("success signing in")
    } catch (error) {
      //console.error("Error signing in with custom token: ", error)
    }
  } else {
    auth.signOut()
  }
}

function FirebaseAuthProvider({
    children,
  }: {
    children: React.ReactNode;  
  }) {
    const {data: session} = useSession();
    useEffect(() => {
      if (!session) return;
      //console.log("attempting to sync firebase")
      syncFirebaseAuth(session);
    }, [session])
  return <>{children}</>
}

export default FirebaseAuthProvider