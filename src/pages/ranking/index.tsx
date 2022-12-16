import React from 'react';
import Image from 'next/image';
import TabBar from '@/page-component/ranking/tab-bar/TabBar';
import styles from './ranking.module.scss';

type ItemType = {};

function Ranking(): React.ReactElement {
  const RenderItem = ({ item }: { item: ItemType }) => (
    <div className={styles.rankItem}>
      <div className={styles.itemNum}>1</div>
      <div className={styles.itemWrap}>
        <div className={styles.itemCover}>
          <Image
            src={'/images/ranking/icon-arrow.png'}
            fill
            sizes="100%"
            priority
            alt=""
          />
          <span className={styles.itemDuration}>2:27</span>
        </div>
        <div className={styles.itemInfo}>
          <p className={styles.infoTitle}>
            “从放羊娃到国家队队长，37岁的他全场打满120分钟！”
          </p>
          <div className={styles.infoAuthor}>
            <Image
              width={14.5}
              height={12.5}
              src={'/images/ranking/icon-up.png'}
              alt=""
            />
            <span className={styles.authorText}>爱睡觉的kunkun</span>
          </div>
          <div className={styles.infoCount}>
            <div className={styles.countItem}>
              <Image
                width={14.5}
                height={12.5}
                src={'/images/ranking/icon-play.png'}
                alt=""
              />
              <span className={styles.authorText}>360.22万</span>
            </div>
            <div className={styles.countItem}>
              <Image
                width={14.5}
                height={12.5}
                src={'/images/ranking/icon-comment.png'}
                alt=""
              />
              <span className={styles.countText}>360.22万</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.ranking}>
      <RenderItem item={{}} />
      <RenderItem item={{}} />
      <RenderItem item={{}} />
    </div>
  );
}

Ranking.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <div className={styles.header}>
        <Image
          className={styles.headerIcon}
          width={10}
          height={20}
          src={'/images/ranking/ranking-arrow.png'}
          alt=""
        />
        <div className={styles.headerText}>排行榜</div>
      </div>
      <TabBar />
      {page}
    </>
  );
};

export default Ranking;
