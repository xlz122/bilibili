import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useStore, useSelector } from 'react-redux';
import Image from 'next/image';
import { searchDefatult, searchHot } from '@/api/search';
import type { RootState } from '@/store';
import type { ResponseType, InputChange, InputEnter } from '@/types';
import type { HotItem } from '@/page-component/search/history/History';
import SearchHistory from '@/page-component/search/history/History';
import SearchSuggest from '@/page-component/search/suggest/Suggest';
import SearchDetail from '@/page-component/search/detail/Detail';
import styles from './search.module.scss';

type Props = {
  search: {
    default: {
      show_name?: string;
    };
    hot: HotItem[];
  };
};

function Search(props: Props): React.ReactElement {
  const router = useRouter();
  const store = useStore();

  const { keyword } = router.query;
  const searchHistory = useSelector(
    (state: RootState) => state.routine.searchHistory
  );

  const cancel = () => {
    router.push({ pathname: '/' });
  };

  const [searchValue, setSearchValue] = useState('');
  const handleInputChange = (e: InputChange): void => {
    if (!e.target.value) {
      router.push({ pathname: '/search' });
    }

    setSearchValue(e.target.value);
  };

  // 清空搜索
  const handleClear = (): void => {
    router.push({ pathname: '/search' });
    setSearchValue('');
  };

  // 搜索
  const handleSearch = (value: string): void => {
    setSearchValue(value);

    router.push({
      pathname: '/search',
      query: { keyword: value }
    });

    store.dispatch({
      type: 'routine/setSearchHistory',
      payload: Array.from(new Set([...searchHistory, value]))
    });
  };

  // 搜索回车
  const handleEnterKey = (e: InputEnter): boolean | undefined => {
    if (!e.target.value) {
      return false;
    }

    if (e.nativeEvent.code === 'Enter') {
      router.push({
        pathname: '/search',
        query: {
          keyword: e.target.value
        }
      });

      store.dispatch({
        type: 'routine/setSearchHistory',
        payload: Array.from(new Set([...searchHistory, e.target.value]))
      });
    }
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
            onKeyPress={handleEnterKey}
            placeholder={props?.search?.default?.show_name}
          />
          {searchValue && (
            <Image
              className={styles.clearIcon}
              width={16}
              height={16}
              src={'/images/search/search-clear.png'}
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
        <SearchHistory list={props?.search?.hot} search={handleSearch} />
      )}
      {!keyword && searchValue && (
        <SearchSuggest keyword={searchValue} search={handleSearch} />
      )}
      {keyword && <SearchDetail />}
    </>
  );
}

export async function getServerSideProps(): Promise<{ props: Props }> {
  const res: ResponseType<Props['search']['default']> = await searchDefatult({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  });
  const res2: ResponseType = await searchHot({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  });

  const props: Props = {
    search: {
      default: {},
      hot: []
    }
  };

  if (res?.code === 0) {
    props.search.default = res.data!;
  }

  if (res2?.code === 0) {
    props.search.hot = (res2.list as HotItem[]).slice(0, 3);
  }

  return {
    props
  };
}

Search.getLayout = function getLayout(page: React.ReactElement) {
  return page;
};

export default Search;
