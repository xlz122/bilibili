'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { ViewHistory } from '@/app/space/Space';
import { formatNumber } from '@/utils/utils';
import styles from './home.module.scss';

type Props = {
  list: ItemType[];
};

type ItemType = {
  aid: number;
  pic: string;
  title: string;
  stat: { view: number; danmaku: number };
};

function Home(props: Props): React.ReactElement {
  const router = useRouter();
  const [viewHistory, setViewHistory] = useLocalStorage<ViewHistory[]>('viewHistory', []);

  const jumpVideoDetail = (item: ItemType) => {
    router.push(`/video-detail?aid=${item.aid}`);

    setViewHistory([
      ...viewHistory,
      {
        aid: item.aid,
        pic: item.pic,
        title: item.title,
        createTime: new Date().getTime(),
      },
    ]);
  };

  const RenderItem = ({ item }: { item: ItemType }) => {
    return (
      <li className={styles.item} onClick={() => jumpVideoDetail(item)}>
        <div className={styles.itemCover}>
          <Image src={item.pic} fill priority sizes="50%" alt="" />
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <i className={`icon-play-count ${styles.itemIcon}`}></i>
              <span className={styles.itmCount}>{formatNumber(item.stat?.view)}</span>
            </div>
            <div className={styles.infoItem}>
              <i className={`icon-barrage-count ${styles.itemIcon}`}></i>
              <span className={styles.itmCount}>{formatNumber(item.stat?.danmaku)}</span>
            </div>
          </div>
        </div>
        <div className={styles.itemTitle}>{item.title}</div>
      </li>
    );
  };

  return (
    <div className={styles.home}>
      <ul className={styles.list}>
        {props.list?.map?.((item, index) => {
          return <RenderItem key={index} item={item} />;
        })}
      </ul>
    </div>
  );
}

export default Home;
