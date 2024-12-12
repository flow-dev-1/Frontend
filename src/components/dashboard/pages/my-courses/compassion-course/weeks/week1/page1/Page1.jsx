import React from "react";
import VideoComponent from "../../../components/Video";
import Button from "../../../components/Button";
import getPageContent from "../../data/index.js";

const Page1 = () => {
  // Get Week 1's first page data

  const currentWeek = 1;
  const currentPage = 1;
  const pageData = getPageContent(currentWeek, currentPage);


  return (
    <>
      <VideoComponent videoSrc={pageData.videoSrc} />
      <div className="d-flex justify-content-center w-1029px mt-4">
        {pageData.hasNextButton && <Button text={"Next"} />}
      </div>
    </>
  );
};

export default Page1;
