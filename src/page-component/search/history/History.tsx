import React, { useState, useEffect } from 'react';
import { useStore, useSelector } from 'react-redux';
import Image from 'next/image';
import type { RootState } from '@/store';
import styles from './history.module.scss';

type Props = {
  list: HotItem[];
  search: (value: string) => void;
};

export type HotItem = {
  keyword: string;
};

function SearchHistory(props: Props): React.ReactElement {
  const store = useStore();
  const searchHistory = useSelector(
    (state: RootState) => state.routine.searchHistory
  );

  // 页面是否加载完成
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleClearHistory = () => {
    store.dispatch({
      type: 'routine/setSearchHistory',
      payload: []
    });
  };

  return (
    <div className={styles.searchHistory}>
      <div className={styles.searchHot}>
        <h2 className={styles.hotTitle}>大家都在搜</h2>
        <ul className={styles.hotList}>
          {props?.list?.map((item, index) => {
            return (
              <li
                className={styles.hotItem}
                key={index}
                onClick={() => props.search(item.keyword)}
              >
                {item.keyword}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.history}>
        <div className={styles.historyTitle}>历史搜索</div>
        <ul className={styles.historyList}>
          {mounted &&
            searchHistory?.map((item, index) => {
              return (
                <li
                  className={styles.historyItem}
                  key={index}
                  onClick={() => props.search(item)}
                >
                  <Image
                    className={styles.historyItemIcon}
                    width={15}
                    height={15}
                    src={'/images/search/search-history.png'}
                    alt=""
                  />
                  <span className={styles.historyItemText}>{item}</span>
                </li>
              );
            })}
        </ul>
        {mounted && searchHistory?.length > 0 && (
          <div className={styles.clearHistory} onClick={handleClearHistory}>
            清除历史记录
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchHistory;
