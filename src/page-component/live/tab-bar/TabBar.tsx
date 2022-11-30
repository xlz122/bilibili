import React from 'react';
import Link from 'next/link';
import styles from './tab-bar.module.scss';

function TabBar(): React.ReactElement {
  return (
    <ul className={styles.tabbar}>
      <li className={styles.tabItem}>
        <Link className={styles.tabItemLink} href="/">
          首页
        </Link>
      </li>
      <li className={styles.tabItem}>
        <Link className={styles.tabItemLink} href="/channel/1/1">
          频道
        </Link>
      </li>
      <li className={`${styles.tabItem} ${styles.tabActiveItem}`}>
        <Link className={styles.tabItemLink} href="/live">
          直播
        </Link>
      </li>
      <li className={styles.tabItem}>
        <Link className={styles.tabItemLink} href="/">
          排行
        </Link>
      </li>
      <li className={styles.tabItem}>
        <Link className={styles.tabItemLink} href="/space">
          我的
        </Link>
      </li>
    </ul>
  );
}

export default TabBar;
