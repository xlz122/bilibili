import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStore, useSelector } from 'react-redux';
import Image from 'next/image';
import { formatDateTime } from '@utils/date';
import type { RootState } from '@/store';
import Layout from '@components/layout/Layout';
import styles from './space.module.scss';

type ItemType = {
  aid: number;
  pic: string;
  title: string;
  createTime: number;
};

function Space(): React.ReactElement {
  const router = useRouter();
  const store = useStore();

  const viewHistory = useSelector(
    (state: RootState) => state.routine.viewHistory
  );

  const [tabIndex, setTabIndex] = useState(0);

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

  const RenderItem = ({ item }: { item: ItemType }) => (
    <li className={styles.historyItem} onClick={() => jumpVideoDetail(item)}>
      <div className={styles.itemCover}>
        <Image
          className={styles.itemImage}
          src={item?.pic || ''}
          fill
          sizes="50%"
          priority
          alt=""
        />
      </div>
      <div className={styles.itemInfo}>
        <span
          className={styles.infoTitle}
          dangerouslySetInnerHTML={{ __html: item.title }}
        ></span>
        <span className={styles.infoTime}>
          {formatDateTime(item.createTime, 'yyyy-MM-dd hh:mm:ss')}
        </span>
      </div>
    </li>
  );

  // 页面是否加载完成
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={styles.space}>
      <div className={styles.cover}>
        <Image
          src={'/images/space/space-bg.png'}
          fill
          sizes="100%"
          priority
          alt=""
        />
      </div>
      <div className={styles.tab}>
        <div className={styles.tabItem}>
          <span
            className={`${styles.itemText} ${
              tabIndex === 0 ? styles.itemActiveText : ''
            }`}
            onClick={() => setTabIndex(0)}
          >
            历史记录
          </span>
        </div>
        <div className={styles.tabItem}>
          <span
            className={`${styles.itemText} ${
              tabIndex === 1 ? styles.itemActiveText : ''
            }`}
            onClick={() => setTabIndex(1)}
          >
            我的投稿
          </span>
        </div>
      </div>
      {tabIndex === 0 && mounted && (
        <ul className={styles.history}>
          {viewHistory.map((item, index) => {
            return <RenderItem key={index} item={item} />;
          })}
        </ul>
      )}
      {tabIndex === 1 && (
        <div className={styles.contribute}>
          <div className={styles.contributeImage}>
            <Image
              src={'/images/space/space-contribute.png'}
              fill
              sizes="50%"
              priority
              alt=""
            />
          </div>
          <div className={styles.contributeText}>小哔睡着了~</div>
        </div>
      )}
    </div>
  );
}

Space.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Space;
