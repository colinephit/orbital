import React, { useState } from "react";

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);

  const reset = () => {
    setFlip(false);
  };

  return (
    <div onClick={() => setFlip(!flip)}>
      {flip ? (
        <img src={flashcard.image_back} alt="back" />
      ) : (
        <img src={flashcard.image_front} alt="front" />
      )}
    </div>
  );
}
