"use client";
import React, { useState } from "react";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

const Carousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex == images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex == 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel relative">
      <button onClick={prevSlide} className="object-center pt-30">
        <NavigateBeforeRoundedIcon
          sx={{ fontSize: 70, display: "inline-block" }}
        />
      </button>
      <div className="object-contain">
        <img
          src={images[activeIndex]}
          alt={`Slide ${activeIndex}`}
          className="object-contain"
        />
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
