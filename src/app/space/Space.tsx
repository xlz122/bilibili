'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import useLocalStorage from '@/hooks/useLocalStorage';
import styles from './space.module.scss';

export type ViewHistory = {
  aid: number;
  pic: string;
  title: string;
  createTime: number;
};

function Space(): React.ReactElement {
  const router = useRouter();
  const [viewHistory, setViewHistory] = useLocalStorage<ViewHistory[]>('viewHistory', []);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  const jumpVideoDetail = (item: ViewHistory) => {
    router.push(`/video-detail?aid=${item.aid}`);
    setViewHistory((state) => [
      ...state,
      {
        aid: item.aid,
        pic: item.pic,
        title: item.title,
        createTime: new Date().getTime(),
      },
    ]);
  };

  const RenderItem = ({ item }: { item: ViewHistory }) => (
    <li className={styles.historyItem} onClick={() => jumpVideoDetail(item)}>
      <div className={styles.itemCover}>
        <Image src={item.pic} fill priority sizes="50%" alt="" />
      </div>
      <div className={styles.itemInfo}>
        <p className={styles.infoTitle} dangerouslySetInnerHTML={{ __html: item.title }} />
        <span className={styles.infoTime}>
          {dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
        </span>
      </div>
    </li>
  );

  return (
    <div className={styles.space}>
      <div className={styles.cover}>
        <Image src="/images/space/banner.png" fill priority sizes="100%" alt="" />
      </div>
      <div className={styles.tabbar}>
        <div className={styles.tabItem}>
          <span
            className={`${tabIndex === 0 ? styles.activeText : styles.itemText}`}
            onClick={() => handleTabChange(0)}
          >
            历史记录
          </span>
        </div>
        <div className={styles.tabItem}>
          <span
            className={`${tabIndex === 1 ? styles.activeText : styles.itemText}`}
            onClick={() => handleTabChange(1)}
          >
            我的投稿
          </span>
        </div>
      </div>
      <div className={styles.spaceMain}>
        {tabIndex === 0 && viewHistory?.length > 0 && (
          <ul className={styles.history}>
            {viewHistory.map?.((item, index) => {
              return <RenderItem key={index} item={item} />;
            })}
          </ul>
        )}
        {tabIndex === 0 && viewHistory?.length === 0 && (
          <div className={styles.tip}>
            <div className={styles.tipCover}>
              <Image src="/images/space/tips.png" fill priority sizes="50%" alt="" />
            </div>
            <div className={styles.tipText}>你还没有历史记录</div>
            <div className={styles.tipFindText}>
              快去发现
              <Link className={styles.tipFindLink} href="/">
                新内容
              </Link>
              吧！
            </div>
          </div>
        )}
        {tabIndex === 1 && (
          <div className={styles.tip}>
            <div className={styles.tipCover}>
              <Image src="/images/space/tips.png" fill priority sizes="50%" alt="" />
            </div>
            <div className={styles.tipText}>小哔睡着了~</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Space;
