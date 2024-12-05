import React from "react";
import Button from "../../../components/Button";
import VideoComponent from "../../../components/Video";

function WeekTwoPage1() {
  return (
    <>
      <VideoComponent videoSrc={""} />
      <div className="text-center">
        <Button text={"Next"} />
      </div>
    </>
  );
}

export default WeekTwoPage1;
