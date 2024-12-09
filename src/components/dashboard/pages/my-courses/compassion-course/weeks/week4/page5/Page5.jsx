import React from "react";
import VideoComponent from "../../../components/Video";
import Button from "../../../components/Button";

function WeekFourPage5() {
  return (
    <>
      <VideoComponent videoSrc={""} />
      <div className="text-center">
        <Button text={"Prev"} />
        <Button text={"Next"} />
      </div>
    </>
  );
}

export default WeekFourPage5;
