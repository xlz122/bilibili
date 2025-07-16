'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useStore, useSelector } from 'react-redux';
import Image from 'next/image';
import type { RootState } from '@/store';
import type { InputChange, InputEnter } from '@/types';
import SearchHistory from './history/History';
import SearchSuggest from './suggest/Suggest';
import SearchDetail from './detail/Detail';
import styles from './search.module.scss';

type Props = {
  default: { show_name?: string };
  hot: { keyword: string }[];
};

function Search(props: Props): React.ReactElement {
  const router = useRouter();
  const store = useStore();
  const searchHistory = useSelector(
    (state: RootState) => state.routine.searchHistory
  );

  const keyword = useSearchParams().get('keyword') ?? '';
  const [searchValue, setSearchValue] = useState(keyword);

  const handleInputChange = (e: InputChange) => {
    // 清空/搜索后再次输入
    if (!e.target.value || keyword) {
      router.push('/search');
    }

    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    router.push('/search');
    setSearchValue('');
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);

    router.push(`/search?keyword=${value}`);
    store.dispatch({
      type: 'routine/setSearchHistory',
      payload: Array.from(new Set([value, ...searchHistory]))
    });
  };

  const handleEnterKey = (e: InputEnter) => {
    if (e.code !== 'Enter') {
      return;
    }

    const defaultValue = props.default?.show_name;

    setSearchValue(e.target.value || defaultValue || '');
    router.push(`/search?keyword=${e.target.value || defaultValue}`);
    store.dispatch({
      type: 'routine/setSearchHistory',
      payload: Array.from(
        new Set([e.target.value || defaultValue, ...searchHistory])
      )
    });
  };

  const cancel = () => {
    router.push('/');
  };

  return (
    <>
      <div className={styles.search}>
        <div className={styles.searchInput}>
          <i className={`icon-search ${styles.inputIcon}`} />
          <input
            className={styles.inputText}
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleEnterKey}
            placeholder={props.default?.show_name}
          />
          {searchValue && (
            <Image
              className={styles.clearIcon}
              width="16"
              height="16"
              src="/images/search/icon-clear.png"
              onClick={handleClear}
              alt=""
            />
          )}
        </div>
        <span className={styles.searchCancel} onClick={cancel}>
          取消
        </span>
      </div>
      {!keyword && !searchValue && (
        <>
          <div className={styles.searchHot}>
            <h2 className={styles.hotTitle}>大家都在搜</h2>
            <ul className={styles.hotList}>
              {props.hot?.map?.((item, index) => {
                return (
                  <li
                    className={styles.hotItem}
                    key={index}
                    onClick={() => handleSearch(item.keyword)}
                  >
                    {item.keyword}
                  </li>
                );
              })}
            </ul>
          </div>
          <SearchHistory onSearch={handleSearch} />
        </>
      )}
      {!keyword && searchValue && (
        <SearchSuggest keyword={searchValue} onSearch={handleSearch} />
      )}
      {keyword && <SearchDetail />}
    </>
  );
}

export default Search;
