import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { partitions } from '@api/home';
import type { ResponseType } from '@/types/index';
import styles from './tab-bar.module.scss';

type List = {
  tid: number;
  name: string;
  children: {
    rid: number;
    name: string;
  }[];
}[];

type Tab = {
  navIndex: number;
  navSubIndex: number;
};

function TabBar(): React.ReactElement {
  const router = useRouter();
  const param = router.query.param || [];

  const [list, setList] = useState<List>([]);

  const getPartitions = () => {
    partitions({})
      .then((res: ResponseType<List>) => {
        if (res?.code === 0) {
          setList(res?.data!);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getPartitions();
  }, []);

  const [tab, setTab] = useState<Tab>({
    navIndex: -1,
    navSubIndex: -1
  });

  useEffect(() => {
    if (!list) {
      return;
    }

    const index = list.findIndex(item => item.tid === Number(param[0]));
    const subIndex = list[index]?.children?.findIndex(
      item => item.rid === (Number(param[1]) || Number(param[0]))
    );

    setTab({ navIndex: index, navSubIndex: subIndex });
  }, [list]);

  const tabChange = (index: number): void => {
    setTab({
      navIndex: index,
      navSubIndex: 0
    });
  };

  const tabSubChange = (index: number): void => {
    setTab({ ...tab, navSubIndex: index });
  };

  return (
    <div className={styles.tabbar}>
      <div className={styles.group}>
        <div className={styles.list}>
          <div
            className={`${styles.item} ${
              tab.navIndex === -1 ? styles.activeItem : ''
            }`}
            onClick={() => tabChange(-1)}
          >
            <Link className={styles.itemLink} href="/">
              首页
            </Link>
          </div>
          {list.map((item, index) => {
            return (
              <div
                className={`${styles.item} ${
                  index === tab.navIndex ? styles.activeItem : ''
                }`}
                key={index}
                onClick={() => tabChange(index)}
              >
                <Link className={styles.itemLink} href={`/channel/${item.tid}`}>
                  {item.name}
                </Link>
              </div>
            );
          })}
          <div className={styles.item}>
            <Link className={styles.itemLink} href="/live" prefetch={false}>
              直播
            </Link>
          </div>
        </div>
        <i className={`icon-arrow-down ${styles.itemIcon}`}></i>
      </div>
      <div className={styles.group}>
        <ul className={`${styles.list} ${styles.subList}`}>
          {list[tab.navIndex]?.children?.map((item, index) => {
            return (
              <li
                className={`${styles.item} ${
                  index === tab.navSubIndex ? styles.activeItem : ''
                }`}
                key={index}
                onClick={() => tabSubChange(index)}
              >
                <Link
                  className={styles.itemLink}
                  href={`/channel/${param[0]}/${item.rid}`}
                >
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
