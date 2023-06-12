import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { rankNav } from '@api/ranking';
import type { ResponseType } from '@/types/index';
import styles from './tab-bar.module.scss';

type List = {
  rid: number;
  name: string;
}[];

function TabBar(): React.ReactElement {
  const rid = useSearchParams().get('rid');

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

  return (
    <div className={styles.tabbar}>
      <div className={styles.group}>
        <ul className={styles.list}>
          {list?.map((item, index) => {
            return (
              <li
                className={`${styles.item} ${
                  item.rid === Number(rid) ? styles.activeItem : ''
                }`}
                key={index}
              >
                <Link
                  className={styles.itemLink}
                  href={{ pathname: '/ranking', query: { rid: item.rid } }}
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
