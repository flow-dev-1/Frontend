import React, { useState } from "react";
import { Icon } from "@iconify/react";

const VideoComponent = ({ videoSrc }) => {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div className="video-div">
      {videoPlaying ? (
        <iframe
          className="custom-video"
          src={videoSrc}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="video-thumbnail">
          <div className="play-button" onClick={() => setVideoPlaying(true)}>
            <Icon icon="carbon:play-outline" className="play-icon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoComponent;
