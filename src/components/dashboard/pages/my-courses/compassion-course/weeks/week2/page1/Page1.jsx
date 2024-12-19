import React from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/Button";
import VideoComponent from "../../../components/Video";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";

function WeekTwoPage1() {
  const pageData = useSelector(selectPageData);

  return (
    <>
      <VideoComponent videoSrc={pageData.videoSrc} />
      <div className="d-flex justify-content-center gap-96px mt-4 ">
        <Button text="Next" />
      </div>
    </>
  );
}

export default WeekTwoPage1;
