"use client";
import React, { useState } from "react";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import Flashcard from "./Flashcard";

const Carousel = ({ flashcards }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex == flashcards.length - 1 ? 0 : prevIndex + 1
    );
    setFlip(false);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex == 0 ? flashcards.length - 1 : prevIndex - 1
    );
    setFlip(false);
  };

  return (
    <div className="carousel relative">
      <button onClick={prevSlide} className="object-center pt-30">
        <NavigateBeforeRoundedIcon
          sx={{ fontSize: 70, display: "inline-block" }}
        />
      </button>
      {/* <div className="hover:shadow-2xl shadow-gray-600">
        <Flashcard flashcard={flashcards[activeIndex]} />
      </div> */}
      {/*Flashcard feature, moved here instead of using the Flashcard component due to the need to 
        reset the flashcard everytime a new card is shown by carousel*/}

      <div
        className="hover:shadow-2xl shadow-red-300"
        onClick={() => setFlip(!flip)}
      >
        {flip ? (
          <img src={flashcards[activeIndex].image_back} alt="back" />
        ) : (
          <img src={flashcards[activeIndex].image_front} alt="front" />
        )}
      </div>
      <button onClick={nextSlide} className="object-center pt-30">
        <NavigateNextRoundedIcon
          sx={{ fontSize: 70, display: "inline-block" }}
        />
      </button>
    </div>
  );
};

export default Carousel;
