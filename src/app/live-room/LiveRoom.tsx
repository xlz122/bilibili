import React from 'react';
import Image from 'next/image';
import styles from './live-room.module.scss';

type Props = {
  data: Partial<{ user_cover: string }>;
};

function LiveRoom(props: Props): React.ReactElement {
  return (
    <div className={styles.liveRoom}>
      <div className={styles.roomInfo}>
        <div className={styles.infoCover}>
          <Image
            src={props.data.user_cover ?? ''}
            fill
            priority
            sizes="100%"
            alt=""
          />
        </div>
        <div className={styles.avatar}>
          <span className={styles.avatarText}>Mo_F丶莫风</span>
          <span className={styles.avatarText}>1.1w人看过</span>
        </div>
        <div className={styles.follow}>+ 关注 </div>
      </div>
      <div className={styles.roomVideo}>
        <div className={styles.videoCover}>
          <Image
            src={props.data.user_cover ?? ''}
            fill
            priority
            sizes="100%"
            alt=""
          />
        </div>
        <div className={styles.iconPlay}>
          <Image
            src="/images/live-room/icon-play.png"
            fill
            priority
            sizes="100%"
            alt=""
          />
        </div>
      </div>
      <div className={styles.roomControl}>
        <div className={styles.controlInput}>发个弹幕呗~</div>
        <div className={styles.iconGift}>
          <Image
            src="/images/live-room/icon-gift.png"
            fill
            priority
            sizes="100%"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default LiveRoom;
