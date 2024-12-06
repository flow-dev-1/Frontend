import React from "react";
import Button from "../../../components/Button";
import VideoComponent from "../../../components/Video";

function WeekTwoPage7() {
  return (
    <>
      <VideoComponent videoSrc={""} />
      <div className="d-flex justify-content-center gap-4 mt-4">
        <Button text={"Prev"} />
        <Button text={"Next"} />
      </div>
    </>
  );
}

export default WeekTwoPage7;
