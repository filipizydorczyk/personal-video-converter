import React, { FC } from 'react';

type VideoPlayerProps = {
  video?: string;
};

const VideoPlayer: FC<VideoPlayerProps> = ({ video }) => {
  return (
    <video
      className="w-100 h-auto center-v border-radius-15"
      src={video}
      controls
    />
  );
};

export default VideoPlayer;
