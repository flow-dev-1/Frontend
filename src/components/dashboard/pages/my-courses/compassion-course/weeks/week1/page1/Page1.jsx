import React from "react";
import { useSelector } from "react-redux";
import VideoComponent from "../../../components/Video";
import Button from "../../../components/Button";
import { selectPageData } from "../../../../../../../../redux/reducers/navigationSlice";

const Page1 = () => {
  const pageData = useSelector(selectPageData);

  return (
    <>
      <VideoComponent videoSrc={pageData.videoSrc} />
      <div className="d-flex justify-content-center w-1029px mt-4">
        <Button text="Next" />
      </div>
    </>
  );
};

export default Page1;
