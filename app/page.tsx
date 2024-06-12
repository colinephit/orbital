import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import ProgressBar from "./ProgressBar";
import HappinessLevel from "./HappinessLevel";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session.user.email)
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
      <h1>Placeholder for pup animation</h1>
      <div className="text-3xl">Happiness Level: {<HappinessLevel />} %</div>{" "}
      {/* add user's pups happiness level in the brackets*/}
      <ProgressBar happinessLevel={<HappinessLevel />} />
    </div>
  );
}