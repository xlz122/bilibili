import React, { useState } from 'react';
import Image from 'next/image';
import Layout from '@components/layout/Layout';
import styles from './space.module.scss';

function Space(): React.ReactElement {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className={styles.space}>
      <div className={styles.cover}>
        <Image src={'/images/space-bg.png'} fill sizes="100%" priority alt="" />
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
    </div>
  );
}

Space.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Space;
