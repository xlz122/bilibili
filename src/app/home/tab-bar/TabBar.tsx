'use client';

import React, { useState, useLayoutEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './tab-bar.module.scss';

type Props = {
  list: {
    tid: number;
    name: string;
    children: {
      rid: number;
      name: string;
    }[];
  }[];
};

type TabType = {
  navIndex: number;
  navSubIndex: number;
};

function TabBar(props: Props): React.ReactElement {
  const params = useParams();

  const [tab, setTab] = useState<TabType>({
    navIndex: -1,
    navSubIndex: -1
  });

  useLayoutEffect(() => {
    const index = props.list.findIndex(
      item => String(item.tid) === params.channel?.[1]
    );
    const subIndex = props.list?.[index]?.children?.findIndex(
      item => String(item.rid) === (params.channel?.[2] ?? params.channel?.[1])
    );

    setTab({ navIndex: index, navSubIndex: subIndex });
  }, [props.list]);

  const tabChange = (index: number) => {
    setTab({ navIndex: index, navSubIndex: 0 });
  };

  const tabSubChange = (index: number) => {
    setTab({ ...tab, navSubIndex: index });
  };

  return (
    <div className={styles.tabbar}>
      <div className={styles.group}>
        <div className={styles.list}>
          <div
            className={`${
              tab.navIndex === -1 ? styles.activeItem : styles.item
            }`}
            onClick={() => tabChange(-1)}
          >
            <Link href="/">首页</Link>
          </div>
          {props.list?.map?.((item, index) => {
            return (
              <div
                className={`${
                  index === tab.navIndex ? styles.activeItem : styles.item
                }`}
                key={index}
                onClick={() => tabChange(index)}
              >
                <Link href={`/channel/${item.tid}`}>{item.name}</Link>
              </div>
            );
          })}
          <div className={styles.item}>
            <Link href="/live" prefetch={false}>
              直播
            </Link>
          </div>
        </div>
        <i className={`icon-down-arrow ${styles.itemIcon}`}></i>
      </div>
      <div className={styles.group}>
        <ul className={`${styles.list} ${styles.subList}`}>
          {props.list?.[tab.navIndex]?.children?.map?.((item, index) => {
            return (
              <li
                className={`${styles.item} ${
                  index === tab.navSubIndex ? styles.activeItem : styles.item
                }`}
                key={index}
                onClick={() => tabSubChange(index)}
              >
                <Link href={`/channel/${params.channel?.[1]}/${item.rid}`}>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TabBar;
