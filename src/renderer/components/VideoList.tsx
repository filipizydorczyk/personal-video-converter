import React, { FC } from 'react';
import VideoListItem from './VideoListItem';
import { VideoFile } from '../../main/event';

type VideoListProps = {
  videos: VideoFile[];
  isDisabled?: boolean;
  onCutHanlder?: (path: string) => void;
  onItemClickHandler?: (path: string) => void;
  onDeleteHandler?: (path: string) => void;
  onConvertHandler?: (path: string, target: 'mp4' | 'mov') => void;
};

const VideoList: FC<VideoListProps> = ({
  videos,
  isDisabled = false,
  onCutHanlder = () => {},
  onItemClickHandler = () => {},
  onDeleteHandler = () => {},
  onConvertHandler = () => {},
}) => {
  return (
    <div
      className="p-2"
      style={{
        maxHeight: 'calc(100vh - 50px)',
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'scroll',
      }}
    >
      {videos.map((video) => (
        <VideoListItem
          key={video.path}
          name={video.name}
          path={video.path}
          url={video.url}
          isDisabled={isDisabled}
          onClick={onItemClickHandler}
          onCutHanlder={onCutHanlder}
          onDeleteHandler={onDeleteHandler}
          onConvertHandler={onConvertHandler}
        />
      ))}
    </div>
  );
};

export default VideoList;
