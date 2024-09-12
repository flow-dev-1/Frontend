import React, { useState } from 'react'
import { Icon } from '@iconify/react'



const VideoComponent = ({ videoSrc }) => {
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setLoading(false)
    setError(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  return (
    <div className='video-div'>
      {loading && !error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className='loading-indicator'
        >
          <Icon icon='eos-icons:loading' spin={true} width={40} />
          <span>Loading...</span>
        </div>
      )}
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
        <iframe
          className='custom-video'
          src={videoSrc}
          title='YouTube video player'
          onLoad={handleLoad}
          onError={handleError}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      )}
    </div>
  )
}

export default VideoComponent

  // < iframe src = "https://drive.google.com/file/d/1ry_zbSKBTR0QM9rVsYoJ8Ntg6oH5sCR1/preview" width = "640" height = "480" allow = "autoplay" ></iframe >