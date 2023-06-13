import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { useStore } from 'react-redux';
import Image from 'next/image';
import { timeStampToDuration, formatTenThousand } from '@utils/utils';
import { rankRegion } from '@/api/ranking';
import type { ResponseType } from '@/types/index';
import TabBar from '@/page-component/ranking/tab-bar/TabBar';
import styles from './ranking.module.scss';

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

function Ranking(): React.ReactElement {
  const router = useRouter();
  const store = useStore();

  const rid = useSearchParams().get('rid');

  const [list, setList] = useState([]);
  const getRankRegion = () => {
    rankRegion({ rid: Number(rid) })
      .then((res: ResponseType) => {
        if (res.code === 0) {
          setList(res?.data?.list?.slice(0, 20));
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    if (!rid) {
      return;
    }

    getRankRegion();
  }, [rid]);

  // 跳转视频详情
  const jumpVideoDetail = (item: ItemType): void => {
    router.push({
      pathname: '/video',
      query: { aid: item.aid }
    });

    store.dispatch({
      type: 'routine/setViewHistory',
      payload: {
        aid: item.aid,
        pic: item.pic,
        title: item.title,
        createTime: new Date().getTime() / 1000
      }
    });
  };

  const RenderItem = ({ item, index }: { item: ItemType; index: number }) => (
    <li className={styles.rankItem} onClick={() => jumpVideoDetail(item)}>
      <div className={styles.itemNum}>
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
    <div className={styles.ranking}>
      <div className={styles.navBar}>
        <div className={styles.navBarBack} onClick={() => router.back()}></div>
        <div className={styles.navBarText}>排行榜</div>
      </div>
      <TabBar />
      <div className={styles.rankingMain}>
        <ul className={styles.rankList}>
          {list?.map((item, index) => {
            return <RenderItem key={index} item={item} index={index} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Ranking;
