import React from 'react';
import Image from 'next/image';
import Layout from '@components/layout/Layout';
import styles from './space.module.scss';

function Space(): React.ReactElement {
  return (
    <div className={styles.page}>
      <div className={styles.coverImage}>
        <Image src={'/images/space-bg.png'} fill sizes="100%" priority alt="" />
      </div>
      <div className={styles.tab}>
        <div className={styles.tabItem}>
          <span className={`${styles.tabItemText} ${styles.tabActiveItem}`}>
            历史记录
          </span>
        </div>
        <div className={styles.tabItem}>
          <span className={styles.tabItemText}>我的投稿</span>
        </div>
      </div>
    </div>
  );
}

Space.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Space;
