"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../Header";
import TipsCarousel from "./TipsCarousel";

export default function StudyTips() {
  const images = [
    "/Card1_Front.png",
    "/Card2_Front.png",
    "/Card3_Front.png",
    "/Card4_Front.png",
    "/Card5_Front.png",
    "/Card6_Front.png",
    "/Card7_Front.png",
    "/Card8_Front.png",
  ];

  const flashcards = [
    { id: 1, image_front: "/Card1_Front.png", image_back: "/Card1_Back.png" },
    { id: 2, image_front: "/Card2_Front.png", image_back: "/Card2_Back.png" },
    { id: 3, image_front: "/Card3_Front.png", image_back: "/Card3_Back.png" },
    { id: 4, image_front: "/Card4_Front.png", image_back: "/Card4_Back.png" },
    { id: 5, image_front: "/Card5_Front.png", image_back: "/Card5_Back.png" },
    { id: 6, image_front: "/Card6_Front.png", image_back: "/Card6_Back.png" },
    { id: 7, image_front: "/Card7_Front.png", image_back: "/Card7_Back.png" },
    { id: 8, image_front: "/Card8_Front.png", image_back: "/Card8_Back.png" },
  ];

  const [cards, setCards] = useState(flashcards);

  return (
    <div>
      <div className="p-3">
        <Header title="Productivity Tips" />
      </div>

      <div className="p-5">
        <TipsCarousel images={images} />
      </div>
    </div>
  );
}
