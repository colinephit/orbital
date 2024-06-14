import React from "react";
import PupCard from "./PupCard";
import LockedPupCard from "./LockedPupCard";

function Page() {
  return (
    <div>
      <h1>My Pups</h1>
      {/*an example of how pup card will be used (map different types of unlocked pups to each of their own card)*/}
      <div className="flex flex-row">
        <PupCard
          pupImage={""}
          pupName={"Milo"}
          description={"A fluffy poodle, loves to eat"}
        />
        <LockedPupCard />
      </div>
    </div>
  );
}

export default Page;
