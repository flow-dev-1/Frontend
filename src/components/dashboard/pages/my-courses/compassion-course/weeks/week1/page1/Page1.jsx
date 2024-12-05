import React from "react";
import VideoComponent from "../../../components/Video";
import Button from "../../../components/Button";

const Page1 = () => {
  return (
    <>
      <VideoComponent videoSrc={""} />
      <div className="text-center">
        <Button text={"Next"} />
      </div>
    </>
  );
};

export default Page1;
