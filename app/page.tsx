'use client';

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";

export default function Home() {
  return (
    <>
      <h1>
        <Link href="./components/studyTips">Study Tips page</Link>
      </h1>
      <h2>
        {" "}
        <Link href="./components/toDoList">To Do List</Link>
      </h2>
      <h2>
        {" "}
        <Link href="./components/pup">Pup</Link>
      </h2>
    </>
  );
}
