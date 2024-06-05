'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from 'react-redux';
import Image from 'next/image';
import { timeStampToDuration, formatTenThousand } from '@/utils/utils';
import styles from './ranking.module.scss';

type Props = {
  list: ItemType[];
};

type ItemType = {
  aid: number;
  pic: string;
  duration: number;
  title: string;
  owner: {
    name: string;
  };
  stat: {
    view: number;
    danmaku: number;
  };
};

function Ranking(props: Props): React.ReactElement {
  const router = useRouter();
  const store = useStore();

  const jumpVideoDetail = (item: ItemType): void => {
    router.push(`/video-detail?aid=${item.aid}`);

    store.dispatch({
      type: 'routine/setViewHistory',
      payload: {
        aid: item.aid,
        pic: item.pic,
        title: item.title,
        createTime: new Date().getTime()
      }
    });
  };

  const RenderItem = ({ item, index }: { item: ItemType; index: number }) => (
    <li className={styles.rankItem} onClick={() => jumpVideoDetail(item)}>
      <div className={styles.itemIndex}>
        {index < 3 && (
          <Image
            width={20}
            height={32}
            src={`/images/ranking/rank${index + 1}.png`}
            alt=""
          />
        )}
        {index >= 3 && <span>{index + 1}</span>}
      </div>
      <div className={styles.itemWrap}>
        <div className={styles.itemCover}>
          <Image src={item.pic} fill sizes="100%" priority alt="" />
          <span className={styles.itemDuration}>
            {timeStampToDuration(item.duration)}
          </span>
        </div>
        <div className={styles.itemInfo}>
          <p className={styles.infoTitle}>{item.title}</p>
          <div className={styles.infoAuthor}>
            <Image
              width={14.5}
              height={12.5}
              src={'/images/ranking/icon-up.png'}
              alt=""
            />
            <span className={styles.authorText}>{item.owner?.name}</span>
          </div>
          <div className={styles.infoCount}>
            <div className={styles.countItem}>
              <Image
                width={14.5}
                height={12.5}
                src={'/images/ranking/icon-play.png'}
                alt=""
              />
              <span className={styles.authorText}>
                {formatTenThousand(item.stat.view)}
              </span>
            </div>
            <div className={styles.countItem}>
              <Image
                width={14.5}
                height={12.5}
                src={'/images/ranking/icon-comment.png'}
                alt=""
              />
              <span className={styles.countText}>
                {formatTenThousand(item.stat.danmaku)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );

  return (
    <ul className={styles.ranking}>
      {props.list?.map?.((item, index) => {
        return <RenderItem key={index} item={item} index={index} />;
      })}
    </ul>
  );
}

export default Ranking;
