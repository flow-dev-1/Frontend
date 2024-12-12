import React from "react";
import VideoComponent from "../../../components/Video";
import Button from "../../../components/Button";
import getPageContent from "../../data";

function WeekFivePage1() {
  const currentWeek = 5;
  const currentPage = 1;
  const pageData = getPageContent(currentWeek, currentPage);

  return (
    <>
      <VideoComponent videoSrc={pageData.videoSrc} />
      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        {pageData.hasNextButton && <Button text={"Next"} />}
      </div>
    </>
  );
}

export default WeekFivePage1;
