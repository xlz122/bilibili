'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { ViewHistory } from '@/app/space/Space';
import { timeStampToDuration, formatNumber } from '@/utils/utils';
import styles from './ranking.module.scss';

type Props = {
  list: ItemType[];
};

type ItemType = {
  aid: number;
  pic: string;
  duration: number;
  title: string;
  owner: { name: string };
  stat: { view: number; danmaku: number };
};

function Ranking(props: Props): React.ReactElement {
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

  const RenderItem = ({ item, index }: { item: ItemType; index: number }) => (
    <li className={styles.item} onClick={() => jumpVideoDetail(item)}>
      <div className={styles.itemIndex}>
        {index < 3 && (
          <div className={styles.rankIcon}>
            <Image
              src={`/images/ranking/rank-0${index + 1}.png`}
              fill
              priority
              sizes="50%"
              alt=""
            />
          </div>
        )}
        {index >= 3 && <p>{index + 1}</p>}
      </div>
      <div className={styles.itemWrap}>
        <div className={styles.itemCover}>
          <Image src={item.pic} fill priority sizes="100%" alt="" />
          <span className={styles.itemDuration}>{timeStampToDuration(item.duration)}</span>
        </div>
        <div className={styles.itemInfo}>
          <p className={styles.infoTitle}>{item.title}</p>
          <div className={styles.infoAuthor}>
            <div className={styles.authorIcon}>
              <Image src="/images/ranking/icon-up.png" fill priority sizes="50%" alt="" />
            </div>
            <span className={styles.authorText}>{item.owner?.name}</span>
          </div>
          <div className={styles.infoCount}>
            <div className={styles.countItem}>
              <div className={styles.countIcon}>
                <Image src="/images/ranking/icon-play.png" fill priority sizes="50%" alt="" />
              </div>
              <span className={styles.countText}>{formatNumber(item.stat.view)}</span>
            </div>
            <div className={styles.countItem}>
              <div className={styles.countIcon}>
                <Image src="/images/ranking/icon-comment.png" fill priority sizes="50%" alt="" />
              </div>
              <span className={styles.countText}>{formatNumber(item.stat.danmaku)}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );

  return (
    <div className={styles.ranking}>
      <ul className={styles.list}>
        {props.list?.map?.((item, index) => {
          return <RenderItem key={index} item={item} index={index} />;
        })}
      </ul>
    </div>
  );
}

export default Ranking;
