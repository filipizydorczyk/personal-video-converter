import React, { FC, useEffect, useRef } from 'react';
import RangeSlider from 'react-range-slider-input';

type VideoPlayerProps = {
  video?: string;
};

const VideoPlayer: FC<VideoPlayerProps> = ({ video }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log(ref.current?.currentTime);
  }, [ref.current?.duration]);

  return (
    <div className="center-v">
      <video
        ref={ref}
        className="w-100 h-auto border-radius-15"
        src={video}
        controls
      />
      <RangeSlider
        onInput={(val: [number, number]) =>
          console.log(val, ref.current?.duration)
        }
        max={1}
        min={0}
        step={0.01}
      />
    </div>
  );
};

export default VideoPlayer;
