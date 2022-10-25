import React, { useState, useEffect } from 'react';
import { partitions } from '@api/home';
import type { ResponseType } from '@/types/index';
import styles from './tab-bar.module.scss';

type Props = {
  index: number;
  subIndex: number;
  tabChange: ({ index, subIndex, rid }: TabChangeParams) => void;
};

export type TabChangeParams = {
  index: number;
  subIndex: number;
  rid: number;
};

type Tab = {
  list: {
    tid: number;
    name: string;
    children?: {
      rid: number;
      name: string;
    }[];
  }[];
  subList: {
    rid: number;
    name: string;
  }[];
};

function TabBar(props: Props): React.ReactElement {
  const [tab, setTab] = useState<Tab>({
    list: [],
    subList: []
  });

  const getPartitions = () => {
    partitions({})
      .then((res: ResponseType<Tab['list']>) => {
        if (res?.code === 0) {
          if (!res.data) {
            return false;
          }

          res.data?.unshift({ tid: 0, name: '首页' });
          res.data?.push({ tid: -1, name: '直播' });

          setTab({ ...tab, list: res?.data });
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getPartitions();
  }, []);

  const tabChange = (index: number, tid: number): boolean | undefined => {
    props.tabChange({
      index,
      subIndex: 0,
      rid: (tab.list[index].children && tab.list[index].children![0].rid) || 0
    });

    // tid 0为首页 -1为直播
    if (tid === 0 || tid === -1 || tab.list[index].children?.length === 0) {
      setTab({ ...tab, subList: [] });
      return false;
    }

    setTab({ ...tab, subList: tab.list[index].children! });
  };

  const tabSubChange = (index: number, rid: number): void => {
    props.tabChange({ index: props.index, subIndex: index, rid });
  };

  return (
    <div className={styles.tabbar}>
      <div className={styles.group}>
        <div className={styles.list}>
          {tab.list.map((item, index) => {
            return (
              <div
                className={`${styles.item} ${
                  index === props.index ? styles.activeItem : ''
                }`}
                key={index}
                onClick={() => tabChange(index, item.tid)}
              >
                {item.name}
              </div>
            );
          })}
        </div>
        <i className={`icon-arrow-down ${styles.itemIcon}`}></i>
      </div>
      <div className={styles.group}>
        <div className={`${styles.list} ${styles.subList}`}>
          {tab.subList.map((item, index) => {
            return (
              <div
                className={`${styles.item} ${
                  index === props.subIndex ? styles.activeItem : ''
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
