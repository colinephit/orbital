import React from "react";
import LogIn from "./login";
import Link from "next/link";

const NavBar = () => {
  return (
    <header>
      <LogIn />
      {" "}
      <Link href="/">Home</Link>
    </header>
  )
}

export default NavBar