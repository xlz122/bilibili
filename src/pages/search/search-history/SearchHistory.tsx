import React from 'react';
import Image from 'next/image';
import styles from './search-history.module.scss';

function SearchHistory(): React.ReactElement {
  return (
    <div className={styles.page}>
      <div className={styles.searchHot}>
        <h2 className={styles.hotTitle}>大家都在搜</h2>
        <ul className={styles.hotList}>
          <li className={styles.hotItem}>鹤岗被确定为中等城市</li>
          <li className={styles.hotItem}>欧盟2035年起将停产燃油车</li>
          <li className={styles.hotItem}>女大学生遭坠楼男砸中</li>
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
