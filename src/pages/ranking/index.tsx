import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { timeStampToDuration, formatTenThousand } from '@utils/utils';
import { rankRegion } from '@/api/ranking';
import type { ResponseType } from '@/types/index';
import TabBar from '@/page-component/ranking/tab-bar/TabBar';
import styles from './ranking.module.scss';

type ItemType = {
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

function Ranking(): React.ReactElement {
  const router = useRouter();

  const [list, setList] = useState([]);

  // 获取分类列表
  const getRankRegion = () => {
    rankRegion({ rid: Number(router.query.rid) })
      .then((res: ResponseType) => {
        if (res.code === 0) {
          setList(res.data.list.slice(0, 20));
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    if (!router.query.rid) {
      return;
    }

    getRankRegion();
  }, [router.query.rid]);

  const RenderItem = ({ item, index }: { item: ItemType; index: number }) => (
    <li className={styles.rankItem}>
      <div className={styles.itemNum}>
        {index < 3 && (
          <Image
            width={19.5}
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
    <>
      <div className={styles.header}>
        <Image
          className={styles.headerIcon}
          width={10}
          height={20}
          src={'/images/ranking/icon-arrow.png'}
          alt=""
          onClick={() => router.back()}
        />
        <div className={styles.headerText}>排行榜</div>
      </div>
      <TabBar />
      <ul className={styles.ranking}>
        {list.map((item, index) => {
          return <RenderItem key={index} item={item} index={index} />;
        })}
      </ul>
    </>
  );
}

export default Ranking;
