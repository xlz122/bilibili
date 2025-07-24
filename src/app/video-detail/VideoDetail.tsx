import React from 'react';
import Image from 'next/image';
import styles from './video-detail.module.scss';

type Props = {
  detail: Partial<{
    cid: number;
    title: string;
    owner: { face: string; name: string };
  }>;
};

function VideoDetail(props: Props): React.ReactElement {
  return (
    <div className={styles.videoDetail}>
      <span className={styles.hot}>热门</span>
      <span className={styles.title}>{props.detail.title}</span>
      <div className={styles.author}>
        <div className={styles.authorInfo}>
          <div className={styles.infoCover}>
            <Image src={props.detail.owner?.face ?? ''} fill priority sizes="100%" alt="" />
          </div>
          <span className={styles.infoName}>{props.detail.owner?.name}</span>
        </div>
        <div className={styles.authorOther}>
          <i className={styles.iconLike}></i>
          <i className={styles.iconCollection}></i>
          <i className={styles.iconShare}></i>
        </div>
      </div>
    </div>
  );
}

export default VideoDetail;
