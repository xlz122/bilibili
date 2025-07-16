import React, { useState, useEffect } from 'react';
import { searchSuggest } from '@/api/search';
import type { ResponseType } from '@/types';
import styles from './suggest.module.scss';

type Props = {
  keyword: string;
  onSearch: (value: string) => void;
};

type ItemType = { value: string };

function SearchSuggest(props: Props): React.ReactElement {
  const [list, setList] = useState<ItemType[]>([]);

  const getSearchSuggest = () => {
    searchSuggest({ keyword: props.keyword })
      .then((res: ResponseType & { result?: { tag: ItemType[] } }) => {
        if (res?.code !== 0) {
          return;
        }

        setList(res.result?.tag ?? []);
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    if (!props.keyword) {
      return;
    }

    getSearchSuggest();
  }, [props.keyword]);

  return (
    <div className={styles.searchSuggest}>
      <ul className={styles.suggestList}>
        {list.map?.((item, index) => {
          return (
            <li
              className={styles.suggestItem}
              key={index}
              onClick={() => props.onSearch(item.value)}
            >
              {item.value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchSuggest;
