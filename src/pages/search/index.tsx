import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import type { InputChange } from '@/types';
import SearchDetail from './search-detail/SearchDetail';
import SearchHistory from './search-history/SearchHistory';
import styles from './search.module.scss';

function Search(): React.ReactElement {
  const router = useRouter();

  const cancel = () => {
    router.back();
  };

  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e: InputChange): void => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className={styles.searchHeader}>
        <div className={styles.inputView}>
          <i className={`icon-search ${styles.inputIcon}`} />
          <input
            className={styles.inputText}
            value={searchValue}
            onChange={handleInputChange}
            placeholder="搜索视频、UP主或AV号"
          />
          {searchValue && (
            <Image
              className={styles.clearIcon}
              width={16}
              height={16}
              src={'/images/search-close.png'}
              alt=""
            />
          )}
        </div>
        <span className={styles.cancelText} onClick={cancel}>
          取消
        </span>
      </div>
      {searchValue && <SearchDetail />}
      {!searchValue && <SearchHistory />}
    </>
  );
}

Search.getLayout = function getLayout(page: React.ReactElement) {
  return page;
};

export default Search;
