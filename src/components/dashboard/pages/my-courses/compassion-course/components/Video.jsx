import React, { useState, useEffect } from "react";

import "./video.css";
import { Icon } from "@iconify/react";

function VideoComponent({ videoSrc }) {
  const [percentageWatched, setPercentageWatched] = useState(3);
  const videoRef = React.createRef();

  useEffect(() => {
    const video = videoRef.current;
    const intervalId = setInterval(() => {
      if (video) {
        const currentTime = video.currentTime;
        const duration = video.duration;
        const percentage = (currentTime / duration) * 100;
        setPercentageWatched(percentage);
      }
    }, 1000); // update every 1 second

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <video
        className="custom-video"
        ref={videoRef}
        controls
        controlsList="nodownload noremoteplayback"
        style={{ pointerEvents: "auto" }}
        onCanPlay={""}
        onError={""}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Icon
        icon="mdi:play-circle-outline"
        color="skyblue"
        width={40}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        style={{
          width: `${percentageWatched}%`,
          height: "10px",
          backgroundColor: "skyblue",
          marginTop: "-6px",
        }}
      ></div>
    </div>
  );
}

export default VideoComponent;
