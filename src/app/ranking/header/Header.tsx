'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './header.module.scss';

type Props = {
  list: { rid: number; name: string }[];
};

function Header(props: Props): React.ReactElement {
  const router = useRouter();
  const rid = useSearchParams().get('rid');

  return (
    <div className={styles.header}>
      <div className={styles.navigation}>
        <i className={styles.icon} onClick={() => router.back()}></i>
        <div className={styles.title}>排行榜</div>
      </div>
      <ul className={styles.tabbar}>
        {props.list?.map?.((item, index) => {
          return (
            <li
              className={`${item.rid === Number(rid) ? styles.activeItem : styles.item}`}
              key={index}
            >
              <Link href={{ pathname: '/ranking', query: { rid: item.rid } }}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Header;
