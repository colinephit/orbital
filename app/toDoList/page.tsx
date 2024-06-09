import "bootstrap/dist/css/bootstrap.css";
import ToDoTable from "./components/ToDoTable";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session == null) {
    return <div className="text-3xl">You need to log in first :D</div>;
  }

  return (
    <>
      <ToDoTable />
    </>
  );
}
