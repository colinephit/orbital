import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("help");
  
  return (
    <div>
      {/* <h1>
        <Link href="/studyTips"> Link to Study Tips page</Link>
      </h1>
      <h2>
        {" "}
        <Link href="/toDoList">Link to To Do List</Link>
      </h2> */}
    </div>
  );
}
