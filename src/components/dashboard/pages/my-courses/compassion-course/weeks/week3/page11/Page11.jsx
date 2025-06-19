import React from "react";
import VideoComponent from "../../../components/Video";
import Button from "../../../components/Button";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";
import { useSelector } from "react-redux";

function WeekThreePage11() {
  const pageData = useSelector(selectPageData);

  return (
    <>
      <VideoComponent videoSrc={pageData.videoSrc} />
      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px gap-4">
        <Button text={"Prev"} /> <Button text={"Next"} />
      </div>
    </>
  );
}

export default WeekThreePage11;
