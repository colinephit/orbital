import { useSession } from "next-auth/react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../firebase";
function days_between(date1, date2) {

  // The number of milliseconds in one day
  const ONE_DAY = 1000 * 60 * 60 * 24;

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(date1 - date2);

  // Convert back to days and return
  return Math.round(differenceMs / ONE_DAY);

}

export async function calculateHappinessLevel(email) {
  const todosCollection = collection(db, "todos");
  const q = query(todosCollection, where("Email", "==", email));
  const querySnapshot = await getDocs(q);

  const noOfTasks = querySnapshot.size;

  if (noOfTasks == 0) {
    return 100;
  }

  let happiness = 0;
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const deadline = new Date(data.Deadline);
    const createdAt = data.createdAt.toDate();
    if (deadline && createdAt) {
      happiness += 100 * 1/noOfTasks * (1 - 1/(days_between(deadline, createdAt) + 1)) || 0;
    }
  });
  return Math.round(happiness);
}