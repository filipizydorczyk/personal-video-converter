import React, { FC, useEffect, useRef, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import { secondsToTimeString } from '../utils';

export type VideoRangeDTO = {
  start: string;
  end: string;
  duration: string;
};

type VideoPlayerProps = {
  video?: string;
  onRangeChange: (time: VideoRangeDTO) => void;
};

const VideoPlayer: FC<VideoPlayerProps> = ({
  video,
  onRangeChange = () => {},
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [range, setRange] = useState<[number, number]>([0, 1]);
  const [startTime, setStartTime] = useState('00:00:00.00');
  const [endTime, setEndTime] = useState('00:00:00.00');
  const [durationTime, setDurationTime] = useState('00:00:00.00');

  useEffect(() => {
    setRange([0, 1]);
  }, [video]);

  useEffect(() => {
    const [start, end] = range;
    const videoDuration = ref.current?.duration || 0;
    const rangeStart = secondsToTimeString(videoDuration * start);
    const rangeEnd = secondsToTimeString(videoDuration * end);
    const rangeDuration = secondsToTimeString(videoDuration * (end - start));

    setStartTime(rangeStart);
    setEndTime(rangeEnd);
    setDurationTime(rangeDuration);

    onRangeChange({
      start: rangeStart,
      end: rangeEnd,
      duration: rangeDuration,
    });
  }, [range]);

  return (
    <div className="center-v">
      <video
        ref={ref}
        className="w-100 h-auto border-radius-15"
        src={video}
        controls
      />
      <RangeSlider
        onInput={(val: [number, number]) => setRange(val)}
        value={range}
        max={1}
        min={0}
        step={0.01}
      />
      <p>
        {startTime} {endTime} {durationTime}
      </p>
    </div>
  );
};

export default VideoPlayer;
