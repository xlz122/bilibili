import React from 'react';
import Image from 'next/image';
import { liveInfo } from '@/api/live';
import type { GetServerSidePropsContext } from 'next';
import type { ResponseType } from '@/types/index';
import styles from './live-room.module.scss';

type Props = {
  data: {
    user_cover: string;
  };
};

function LiveRoom(props: Props): React.ReactElement {
  return (
    <div className={styles.liveRoom}>
      <div className={styles.roomInfo}>
        <div className={styles.infoCover}>
          <Image
            src={props.data.user_cover}
            fill
            sizes="100%"
            priority
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
            src={props.data.user_cover}
            fill
            sizes="100%"
            priority
            alt=""
          />
        </div>
        <div className={styles.videoIconPlay}>
          <Image
            src={'/images/live/live-room-play.png'}
            fill
            sizes="100%"
            priority
            alt=""
          />
        </div>
      </div>
      <div className={styles.roomControl}>
        <div className={styles.controlInput}>发个弹幕呗~</div>
        <div className={styles.controlIconGift}>
          <Image
            src={'/images/live/live-room-gift.png'}
            fill
            sizes="100%"
            priority
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res: ResponseType<Props> = await liveInfo({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    roomid: Number(context.query.roomid)
  });

  const props = {
    data: {}
  };

  if (res?.code === 0) {
    props.data = res.data || {};
  }

  return {
    props
  };
}

LiveRoom.getLayout = function getLayout(page: React.ReactElement) {
  return page;
};

export default LiveRoom;
