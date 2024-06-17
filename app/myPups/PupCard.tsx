// each pup will be displayed in this card

import React from "react";

function PupCard({ pupImage, pupName, description }) {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl hover:transform-gpu hover:scale-110 transition-all">
      <figure>
        <img src={pupImage} alt="Pup" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{pupName}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
export default PupCard;
