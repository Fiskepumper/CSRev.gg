import React, { useState } from 'react';
import './video.css';

const Video: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="video-section">
      <div className="video-container">
        {!videoLoaded && !hasError && (
          <div className="video-placeholder"></div>
        )}
        {hasError && (
          <div className="video-error"></div>
        )}
        <video
          className="homepage-video"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setHasError(true)}
          style={{ display: videoLoaded ? 'block' : 'none' }}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Video;