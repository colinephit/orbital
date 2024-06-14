import React from "react";

function LockedPupCard() {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src="/LockedPup.png" alt="Pup" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Locked!</h2>
        <p>Comlete more tasks to unlock this pup!</p>
      </div>
    </div>
  );
}

export default LockedPupCard;
