import React from "react";
import VideoComponent from "../../../components/Video";
import Button from "../../../components/Button";

function WeekThreePage11() {
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

export default WeekThreePage11;
