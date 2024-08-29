import { Icon } from "@iconify/react";
import html2canvas from "html2canvas";

const VideoComponent = ({ videoPlaying, setVideoPlaying, videoSrc }) => (
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

export default VideoComponent;
