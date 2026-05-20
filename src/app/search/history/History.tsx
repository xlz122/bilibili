import React from 'react';
import Image from 'next/image';
import useLocalStorage from '@/hooks/useLocalStorage';
import styles from './history.module.scss';

type Props = {
  onSearch: (value: string) => void;
};

function SearchHistory(props: Props): React.ReactElement {
  const [searchHistory, setSearchHistory] = useLocalStorage<string[]>('searchHistory', []);

  const handleHistoryClear = () => {
    setSearchHistory([]);
  };

  return (
    <div className={styles.searchHistory}>
      <div className={styles.title}>历史搜索</div>
      {searchHistory.length > 0 && (
        <>
          <ul className={styles.list}>
            {searchHistory.map?.((item, index) => {
              return (
                <li className={styles.item} key={index} onClick={() => props.onSearch(item)}>
                  <div className={styles.itemIcon}>
                    <Image src="/images/search/icon-history.png" fill priority sizes="50%" alt="" />
                  </div>
                  <span className={styles.itemText}>{item}</span>
                </li>
              );
            })}
          </ul>
          <div className={styles.clear} onClick={handleHistoryClear}>
            清除历史记录
          </div>
        </>
      )}
    </div>
  );
}

export default SearchHistory;
