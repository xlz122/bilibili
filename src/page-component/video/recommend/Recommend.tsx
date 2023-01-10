import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { formatTenThousand } from '@utils/utils';
import { videoRecommend } from '@/api/video';
import type { ResponseType } from '@/types';
import styles from './recommend.module.scss';

export type ItemType = {
  pic?: string;
  title?: string;
  stat: {
    view: number;
    danmaku: number;
  };
};

function VideoRecommend(): React.ReactElement {
  const router = useRouter();

  const [list, setList] = useState([]);

  const getVideoRecommend = () => {
    videoRecommend({ aid: Number(router.query.aid) })
      .then((res: ResponseType) => {
        if (res.code === 0) {
          setList(res.data.slice(0, 6));
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    if (!router.query.aid) {
      return;
    }

    getVideoRecommend();
  }, [router.query.aid]);

  const RenderItem = ({ item }: { item: ItemType }) => (
    <div className={styles.item}>
      <div className={styles.itemCover}>
        <Image
          className={styles.itemImage}
          src={item?.pic || ''}
          fill
          sizes="50%"
          priority
          alt=""
        />
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <i className={`icon-play-count ${styles.itemIcon}`}></i>
            <span className={styles.itemText}>
              {formatTenThousand(item.stat.view)}
            </span>
          </div>
          <div className={styles.infoItem}>
            <i className={`icon-barrage-count ${styles.itemIcon}`}></i>
            <span className={styles.itemText}>
              {formatTenThousand(item.stat.danmaku)}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.itemTitle}>{item?.title}</div>
    </div>
  );

  return (
    <>
      <div className={styles.title}>
        <div className={styles.titleText}>相关推荐</div>
        <div className={styles.moreText}>查看更多</div>
      </div>
      <div className={styles.list}>
        {list.map((item, index) => {
          return <RenderItem key={index} item={item} />;
        })}
      </div>
    </>
  );
}

export default VideoRecommend;
