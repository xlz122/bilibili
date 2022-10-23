import React, { useState, useEffect } from 'react';
import { partitions } from '@api/home';
import type { ResponseType } from '@/types/index';
import styles from './tab-bar.module.scss';

type Props = {
  tid: number;
  subTid: number;
  tabChange: ({ tid, subTid }: { tid: number; subTid: number }) => void;
};

type Tab = {
  data: TabItem;
  list: {
    tid: number;
    typename: string;
  }[];
  subList: {
    tid: number;
    typename: string;
  }[];
};

type TabItem = {
  [key: string]: {
    tid: number;
    typename: string;
  }[];
};

function TabBar(props: Props): React.ReactElement {
  const [tab, setTab] = useState<Tab>({
    data: {},
    list: [],
    subList: []
  });

  const getPartitions = () => {
    partitions({})
      .then((res: ResponseType<TabItem>) => {
        if (res?.code === '1') {
          if (!res.data) {
            return false;
          }

          res.data[0]?.unshift({ tid: 0, typename: '首页' });
          res.data[0]?.push({ tid: -1, typename: '直播' });

          setTab({ ...tab, data: res.data!, list: res?.data[0] });
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getPartitions();
  }, []);

  const tabChange = (tid: number): boolean | undefined => {
    props.tabChange({ tid, subTid: 1 });

    // tid 0为首页 -1为直播
    if (tid === 0 || tid === -1 || tab.data[tid].length === 0) {
      setTab({ ...tab, subList: [] });
      return false;
    }

    // 子导航添加推荐
    if (!tab.data[tid].find(item => item.tid === 1)) {
      tab.data[tid]?.unshift({ tid: 1, typename: '推荐' });
    }

    setTab({ ...tab, subList: tab.data[tid] });
  };

  const tabSubChange = (tid: number): void => {
    props.tabChange({ tid: props.tid, subTid: tid });
  };

  return (
    <div className={styles.tabbar}>
      <div className={styles.group}>
        <div className={styles.list}>
          {tab.list.map((item, index) => {
            return (
              <div
                className={`${styles.item} ${
                  item.tid === props.tid ? styles.activeItem : ''
                }`}
                key={index}
                onClick={() => tabChange(item.tid)}
              >
                {item.typename}
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
                  item.tid === props.subTid ? styles.activeItem : ''
                }`}
                key={index}
                onClick={() => tabSubChange(item.tid)}
              >
                {item.typename}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TabBar;
