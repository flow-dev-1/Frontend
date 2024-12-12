import React from "react";
import VideoComponent from "../../../components/Video";
import Button from "../../../components/Button";
import getPageContent from "../../data";

function WeekTwoPage3() {
  const currentWeek = 2;
  const currentPage = 3;
  const pageData = getPageContent(currentWeek, currentPage);

  return (
    <>
      <VideoComponent videoSrc={pageData.videoSrc} />
      <div className="d-flex justify-content-center gap-96px mt-4 w-1029px">
        {pageData.navigation.prev && <Button text={"Prev"} />}
        {pageData.navigation.next && <Button text={"Next"} />}
      </div>
    </>
  );
}

export default WeekTwoPage3;
