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
  subList: {
    rid: number;
    name: string;
  }[];
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
    navSubIndex: -1,
    subList: []
  });

  useEffect(() => {
    if (!list) {
      return;
    }

    const index = list.findIndex(item => item.tid === Number(param[0]));
    const subIndex = list[index]?.children?.findIndex(
      item => item.rid === Number(param[1])
    );
    const subList = list[index]?.children;

    setTab({ ...tab, navIndex: index, navSubIndex: subIndex, subList });
  }, [list]);

  useEffect(() => {
    if (router.pathname === '/') {
      setTab({ ...tab, navIndex: -1, navSubIndex: -1, subList: [] });
    }
  }, [router.pathname]);

  const tabChange = (index: number, tid: number): void => {
    setTab({
      ...tab,
      navIndex: index,
      navSubIndex: 0,
      subList: list[index].children!
    });

    router.push({ pathname: `/channel/${tid}/${tid}` });
  };

  const tabSubChange = (index: number, rid: number): void => {
    setTab({ ...tab, navSubIndex: index });

    router.push({ pathname: `/channel/${param[0]}/${rid}` });
  };

  return (
    <div className={styles.tabbar}>
      <div className={styles.group}>
        <div className={styles.list}>
          <div
            className={`${styles.item} ${
              tab.navIndex === -1 ? styles.activeItem : ''
            }`}
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
                onClick={() => tabChange(index, item.tid)}
              >
                {item.name}
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
        <div className={`${styles.list} ${styles.subList}`}>
          {tab.subList?.map((item, index) => {
            return (
              <div
                className={`${styles.item} ${
                  index === tab.navSubIndex ? styles.activeItem : ''
                }`}
                key={index}
                onClick={() => tabSubChange(index, item.rid)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TabBar;
