import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session == null) {
    return (
      <>
        <div className="text-4xl pt-3">Welcome to Pawductivity Pup!</div>
        <div className="text-4xl pt-3">Log in now to see your pup.</div>
        <img src="/SleepingDog.gif" className="size-3/6 p-0"></img>
      </>
    );
  }

  return (
    <div>
      <h2>pup happiness level</h2>
    </div>
  );
}
