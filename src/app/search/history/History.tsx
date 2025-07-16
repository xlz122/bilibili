import React from 'react';
import { useStore, useSelector } from 'react-redux';
import Image from 'next/image';
import useMounted from '@/hooks/useMounted';
import type { RootState } from '@/store';
import styles from './history.module.scss';

type Props = {
  onSearch: (value: string) => void;
};

function SearchHistory(props: Props): React.ReactElement {
  const store = useStore();

  const searchHistory = useSelector(
    (state: RootState) => state.routine.searchHistory
  );
  const mounted = useMounted();

  const handleClearHistory = () => {
    store.dispatch({ type: 'routine/setSearchHistory', payload: [] });
  };

  return (
    <div className={styles.searchHistory}>
      <div className={styles.title}>历史搜索</div>
      {mounted && searchHistory.length > 0 && (
        <>
          <ul className={styles.list}>
            {searchHistory.map?.((item, index) => {
              return (
                <li
                  className={styles.item}
                  key={index}
                  onClick={() => props.onSearch(item)}
                >
                  <Image
                    className={styles.itemIcon}
                    width="15"
                    height="15"
                    src="/images/search/icon-history.png"
                    alt=""
                  />
                  <span className={styles.itemText}>{item}</span>
                </li>
              );
            })}
          </ul>
          <div className={styles.clear} onClick={handleClearHistory}>
            清除历史记录
          </div>
        </>
      )}
    </div>
  );
}

export default SearchHistory;
