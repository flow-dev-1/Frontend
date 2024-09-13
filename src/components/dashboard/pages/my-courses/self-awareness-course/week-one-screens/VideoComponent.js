import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const VideoComponent = ({ videoSrc }) => {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className='video-div'>
      {error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className='error-message'
        >
          <Icon icon='mdi:alert-circle-outline' color='red' width={40} />
          <span>Failed to load video.</span>
        </div>
      )}
      {!error && (
        <video
          className='custom-video'
          width="850px"
          controls
          controlsList="nodownload noremoteplayback"
          style={{ pointerEvents: 'auto' }} 
          onCanPlay={handleLoad}
          onError={handleError}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoComponent;
