import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './tab-bar.module.scss';

function TabBar(): React.ReactElement {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              width={60}
              height={27}
              src={'/images/logo-pink.png'}
              alt=""
            />
          </Link>
        </div>
      </div>
      <ul className={styles.nav}>
        <li className={styles.navItem}>
          <Link className={styles.navItemLink} href="/">
            首页
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navItemLink} href="/channel/1/1">
            频道
          </Link>
        </li>
        <li className={`${styles.navItem} ${styles.navActiveItem}`}>
          <Link className={styles.navItemLink} href="/live">
            直播
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navItemLink} href="/">
            排行
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navItemLink} href="/space">
            我的
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default TabBar;
