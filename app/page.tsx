import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";

export default function Home() {
  return (
    <>
      <h1>
        <Link href="/studyTips"> Link to Study Tips page</Link>
      </h1>
      <h2>
        {" "}
        <Link href="/toDoList">Link to To Do List</Link>
      </h2>
    </>
  );
}