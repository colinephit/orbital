import Link from "next/link";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import HomePageButton from "./HomePageButton";
import TipsCarousel from "./TipsCarousel";

export default function StudyTips() {
  return (
    <div>
      <h1>Productivity Tips</h1>
      <div>
        <HomePageButton></HomePageButton>
      </div>
      <div>
        <TipsCarousel></TipsCarousel>
      </div>
    </div>
  );
}
