import React from 'react';
import Image from 'next/image';
import { formatTenThousand } from '@utils/utils';
import styles from './video-list.module.scss';

type Props = {
  list: VideoItem[];
};

export type VideoItem = {
  pic: string;
  play: number;
  video_review: number;
  title: string;
};

function VideoList(props: Props): React.ReactElement {
  return (
    <div className={styles.list}>
      {props.list.map((item, index) => {
        return (
          <div className={styles.item} key={index}>
            <div className={styles.itemCover}>
              <Image
                className={styles.itemImage}
                layout="fill"
                src={item?.pic || ''}
                alt=""
              />
              <div className={styles.infoView}>
                <div className={styles.infoItem}>
                  <i className={`icon-play-count ${styles.itemIcon}`}></i>
                  <span className={styles.itemText}>
                    {formatTenThousand(item.play)}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <i className={`icon-barrage-count ${styles.itemIcon}`}></i>
                  <span className={styles.itemText}>
                    {formatTenThousand(item.video_review)}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.itemTitle}>{item.title}</div>
          </div>
        );
      })}
    </div>
  );
}

export default VideoList;
