import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session == null) {
    return (
    <div className="text-2xl">a sleeping pup</div>
    );
  }

  return (
    <div>
      <h2>pup happiness level</h2>
    </div>
  );
}
