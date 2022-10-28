import React from 'react';
import Image from 'next/image';
import styles from './search-history.module.scss';

type Props = {
  list: HotItem[];
};

export type HotItem = {
  keyword: string;
};

function SearchHistory(props: Props): React.ReactElement {
  return (
    <div className={styles.page}>
      <div className={styles.searchHot}>
        <h2 className={styles.hotTitle}>大家都在搜</h2>
        <ul className={styles.hotList}>
          {props.list.map((item, index) => {
            return (
              <li className={styles.hotItem} key={index}>
                {item.keyword}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.searchHistory}>
        <div className={styles.historyTitle}>历史搜索</div>
        <ul className={styles.historyList}>
          <li className={styles.historyItem}>
            <Image
              className={styles.historyItemIcon}
              width={15}
              height={15}
              src={'/images/search-history.png'}
              alt=""
            />
            <span className={styles.historyItemText}>一人之下</span>
          </li>
          <li className={styles.historyItem}>
            <Image
              className={styles.historyItemIcon}
              width={15}
              height={15}
              src={'/images/search-history.png'}
              alt=""
            />
            <span className={styles.historyItemText}>二次增高</span>
          </li>
          <li className={styles.historyItem}>
            <Image
              className={styles.historyItemIcon}
              width={15}
              height={15}
              src={'/images/search-history.png'}
              alt=""
            />
            <span className={styles.historyItemText}>哈</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SearchHistory;
