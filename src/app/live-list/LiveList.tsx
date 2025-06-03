'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { formatNumber } from '@/utils/utils';
import styles from './live-list.module.scss';

type Props = {
  title: string;
  list: ItemType[];
};

type ItemType = {
  roomid: number;
  title: string;
  cover: string;
  uname: string;
  watched_show: { num: number };
};

function LiveList(props: Props): React.ReactElement {
  const router = useRouter();

  const jumpLiveDetail = (item: ItemType) => {
    router.push(`/live-room?roomid=${item.roomid}`);
  };

  const RenderItem = ({ item }: { item: ItemType }) => (
    <div className={styles.item} onClick={() => jumpLiveDetail(item)}>
      <div className={styles.itemCover}>
        <Image src={item.cover} fill sizes="50%" priority alt="" />
        <div className={styles.info}>
          <div className={styles.infoName}>{item.uname}</div>
          <div className={styles.infoItem}>
            <Image
              width="8"
              height="8"
              src="/images/live/icon-eye.png"
              alt=""
            />
            <span className={styles.itemCount}>
              {formatNumber(item.watched_show?.num)}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.itemTitle}>{item.title}</div>
    </div>
  );

  return (
    <div className={styles.liveList}>
      <h5 className={styles.title}>{props.title}</h5>
      <div className={styles.list}>
        {props.list?.map?.((item, index) => {
          return <RenderItem key={index} item={item} />;
        })}
      </div>
      {props.list?.length < 30 && (
        <button className={styles.noMore}>没有更多直播间了</button>
      )}
    </div>
  );
}

export default LiveList;
