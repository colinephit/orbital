"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Header from "../Header";
import TipsCarousel from "./TipsCarousel";
import PomodoroTimer from "./PomodoroTimer";

export default function StudyTips() {
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

  return (
    <div>
      <div className="p-4">
        <Header title="Pomodoro Timer" />
      </div>
      <div className="flex justify-center">
        <PomodoroTimer />
      </div>
      <div style={{ marginTop: "50px" }}>
        <Header title="Productivity Tips" />
      </div>

      <div className="p-3 flex justify-center items-center flex-col">
        <p style={{ fontSize: "18px" }}>
          Click on each flashcard to learn more about each study tip!
        </p>
        <TipsCarousel flashcards={flashcards} />
      </div>
    </div>
  );
}
