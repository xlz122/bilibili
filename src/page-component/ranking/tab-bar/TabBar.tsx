import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { partitions } from '@api/home';
import type { ResponseType } from '@/types/index';
import styles from './tab-bar.module.scss';

type List = {
  tid: number;
  name: string;
}[];

type Tab = {
  navIndex: number;
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
    navIndex: -1
  });

  useEffect(() => {
    if (!list) {
      return;
    }

    const index = list.findIndex(item => item.tid === Number(param[0]));

    setTab({ navIndex: index });
  }, [list]);

  const tabChange = (index: number): void => {
    setTab({ navIndex: index });
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
            <Link className={styles.itemLink} href="/ranking">
              全站
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
                <Link className={styles.itemLink} href={`/ranking/${item.tid}`}>
                  {item.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TabBar;
