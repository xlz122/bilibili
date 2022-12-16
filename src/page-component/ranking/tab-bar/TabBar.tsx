import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { rankNav } from '@api/ranking';
import type { ResponseType } from '@/types/index';
import styles from './tab-bar.module.scss';

type List = {
  rid: number;
  name: string;
}[];

type Tab = {
  navIndex: number;
};

function TabBar(): React.ReactElement {
  const router = useRouter();

  const [list, setList] = useState<List>([]);

  const getRankNav = () => {
    rankNav({})
      .then((res: ResponseType<List>) => {
        if (res?.code === 0) {
          setList(res?.data!);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getRankNav();
  }, []);

  const [tab, setTab] = useState<Tab>({
    navIndex: 0
  });

  useEffect(() => {
    if (!list) {
      return;
    }

    const index = list.findIndex(item => item.rid === Number(router.query.rid));

    setTab({ navIndex: index });
  }, [list]);

  const tabChange = (index: number): void => {
    setTab({ navIndex: index });
  };

  return (
    <div className={styles.tabbar}>
      <div className={styles.group}>
        <div className={styles.list}>
          {list.map((item, index) => {
            return (
              <div
                className={`${styles.item} ${
                  index === tab.navIndex ? styles.activeItem : ''
                }`}
                key={index}
                onClick={() => tabChange(index)}
              >
                <Link
                  className={styles.itemLink}
                  href={{ pathname: '/ranking', query: { rid: item.rid } }}
                >
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
