import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.scss';

function Header(): React.ReactElement {
  return (
    <div className={styles.header}>
      <Link className={styles.logo} href="/">
        <div className={styles.logoCover}>
          <Image src="/images/live/logo.png" fill priority sizes="50%" alt="" />
        </div>
      </Link>
      <ul className={styles.tabbar}>
        <li className={styles.tabItem}>
          <Link href="/">首页</Link>
        </li>
        <li className={styles.tabItem}>
          <Link href="/channel/1/1">频道</Link>
        </li>
        <li className={`${styles.tabItem} ${styles.tabActiveItem}`}>
          <Link href="/live">直播</Link>
        </li>
        <li className={styles.tabItem}>
          <Link href={{ pathname: '/ranking', query: { rid: 0 } }}>排行</Link>
        </li>
        <li className={styles.tabItem}>
          <Link href="/space">我的</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
