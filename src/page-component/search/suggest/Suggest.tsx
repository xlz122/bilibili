import React, { useState, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';
import { searchSuggest } from '@/api/search';
import type { ResponseType } from '@/types';
import styles from './suggest.module.scss';

type Props = {
  keyword: string;
  search: (value: string) => void;
};

type List = {
  value: string;
}[];

function SearchSuggest(props: Props): React.ReactElement {
  const [list, setList] = useState<List>([]);

  const getSearchSuggest = (keyword: string) => {
    searchSuggest({ keyword })
      .then((res: ResponseType) => {
        if (res.code === 0) {
          setList((res as Record<string, { tag: List }>).result.tag || []);
        }
      })
      .catch(() => ({}));
  };

  const throttleSuggest = useCallback(
    throttle(getSearchSuggest, 1000, {
      leading: true, // 第一次是否执行
      trailing: true // 节流结束后是否执行
    }),
    []
  );

  useEffect(() => {
    if (!props.keyword) {
      return;
    }

    throttleSuggest(props.keyword);
  }, [props.keyword]);

  return (
    <div className={styles.searchSuggest}>
      <ul className={styles.suggestList}>
        {list?.map((item, index) => {
          return (
            <li
              className={styles.suggestItem}
              key={index}
              onClick={() => props.search(item.value)}
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
