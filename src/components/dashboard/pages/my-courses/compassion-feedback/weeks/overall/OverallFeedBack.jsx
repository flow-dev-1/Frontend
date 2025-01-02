import React from "react";
import celebrate from "../../../../../../../assets/celebrate.png";

import Hurray from "../../../compassion-course/components/Hurray";

function OverallFeedBack() {
  return (
    <>
      <div className="bg-sky-blue custom-border-20 question-box-container d-flex justify-content-center align-items-center flex-column gap-3">
        <img src={celebrate} alt="celebrate" className="text-center" />
        <h1 className="text-green" style={{ fontSize: "100px" }}>
          Hurray!
        </h1>
      </div>
      <p className="fs-3 text-gray mt-3">
        Congratulations on completing the Compassion Curriculum! Over the past
        weeks, you’ve discovered what it means to be compassionate, learned the
        value of self-compassion, and explored ways to show kindness to others.
        You’ve also gained insights into your Circle of Concern and practiced
        applying compassion in real-life scenarios.
      </p>
      <p className="fs-3 text-gray my-3">
        Compassion is a lifelong practice. The skills you’ve gained in this
        course will help you navigate challenges, build meaningful connections,
        and create a positive impact in your community. Continue to reflect on
        what you’ve learned, strive to see the world from different
        perspectives, and always choose kindness.
      </p>
      <p className="fs-3 text-gray">
        Keep spreading compassion, and remember: even small acts of kindness can
        make a big difference!
      </p>

      <div className="bg-blue p-3 mt-2 rounded rounded-4">
        <h2 className="text-white fs-1">Overall Feedback</h2>
        <p className="text-white fs-3">
          Figma ipsum component variant main layer. Draft hand plugin arrow line
          plugin slice. Comment boolean background union stroke subtract
          underline vector. Italic move undo create pen strikethrough main
          arrange image. Component font.Figma ipsum component variant main
          layer. Draft hand plugin arrow line plugin slice. Comment boolean
          background union stroke subtract underline vector. Italic move undo
          create pen strikethrough main arrange image. Component font.
        </p>
      </div>
    </>
  );
}

export default OverallFeedBack;
