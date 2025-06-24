'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import { timeStampToDuration, formatNumber } from '@/utils/utils';
import styles from './player.module.scss';

type Props = {
  url: string;
  detail: Partial<{
    cid: number;
    pic: string;
    stat: {
      view: number;
      danmaku: number;
    };
    ctime: number;
    duration: number;
  }>;
};

function VideoPlayer(props: Props): React.ReactElement {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const handleVideoPlay = () => {
    setPlaying(true);
  };

  useEffect(() => {
    if (!playing) {
      return;
    }

    videoRef.current?.play?.();
  }, [playing]);

  return (
    <div className={styles.videoPlayer}>
      {playing && (
        <video
          className={styles.video}
          controls
          ref={videoRef}
          src={props.url}
        />
      )}
      {!playing && (
        <div className={styles.cover}>
          <Image
            src={props.detail.pic ?? ''}
            fill
            priority
            sizes="100%"
            alt=""
          />
          <div className={styles.iconPlay} onClick={handleVideoPlay}>
            <Image
              src="/images/video/icon-play.png"
              fill
              priority
              sizes="100%"
              alt=""
            />
          </div>
          <div className={styles.tip}>
            <span className={styles.tipText}>
              {formatNumber(props.detail.stat?.view ?? 0)}播放
            </span>
            <span className={styles.tipText}>
              {props.detail.stat?.danmaku}弹幕
            </span>
            <span className={styles.tipText}>
              {dayjs(props.detail.ctime).format('MM月DD日')}
            </span>
            <span className={styles.tipTime}>
              {timeStampToDuration(props.detail.duration ?? 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
