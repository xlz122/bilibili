import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { timeStampToDuration, formatTenThousand } from '@utils/utils';
import { formatDateTime } from '@utils/date';
import { videoPlayurl } from '@/api/video';
import type { ResponseType } from '@/types';
import styles from './video-player.module.scss';

type Props = {
  cid: number;
  pic: string;
  stat: {
    view: number;
    danmaku: number;
  };
  ctime: number;
  duration: number;
};

function VideoPlayer(props: Props): React.ReactElement {
  const aid = useSearchParams().get('aid');

  const [videoSrc, setVideoSrc] = useState('');

  const getVideoPlayurl = () => {
    videoPlayurl({
      aid: Number(aid),
      cid: props.cid
    })
      .then((res: ResponseType) => {
        if (res.code === 0) {
          setVideoSrc(res.data?.durl[0]?.url);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    if (!aid) {
      return;
    }

    getVideoPlayurl();
  }, [aid]);

  return (
    <div className={styles.videoPlayer}>
      <video className={styles.video} src={videoSrc} controls={true} />
      <div className={styles.cover}>
        <Image src={props.pic} fill sizes="100%" priority alt="" />
        <div className={styles.coverIconPlay}>
          <Image
            src={'/images/video/icon-play.png'}
            fill
            sizes="100%"
            priority
            alt=""
          />
        </div>
        <div className={styles.coverTip}>
          <span className={styles.tipText}>
            {formatTenThousand(props.stat.view)}万观看
          </span>
          <span className={styles.tipText}>{props.stat.danmaku}弹幕</span>
          <span className={styles.tipText}>
            {formatDateTime(props?.ctime, 'MM-dd')}
          </span>
          <span className={styles.tipTime}>
            {timeStampToDuration(props.duration)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
