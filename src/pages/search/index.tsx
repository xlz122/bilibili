import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { searchDefatult, searchHot } from '@/api/search';
import type { ResponseType, InputChange } from '@/types';
import type { HotItem } from './search-history/SearchHistory';
import SearchDetail from './search-detail/SearchDetail';
import SearchHistory from './search-history/SearchHistory';
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

  const cancel = () => {
    router.push({ pathname: '/' });
  };

  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e: InputChange): void => {
    setSearchValue(e.target.value);
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
            placeholder={props?.search?.default?.show_name}
          />
          {searchValue && (
            <Image
              className={styles.clearIcon}
              width={16}
              height={16}
              src={'/images/search-cancel.png'}
              alt=""
            />
          )}
        </div>
        <span className={styles.cancelText} onClick={cancel}>
          取消
        </span>
      </div>
      {searchValue && <SearchDetail />}
      {!searchValue && <SearchHistory list={props?.search?.hot} />}
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
