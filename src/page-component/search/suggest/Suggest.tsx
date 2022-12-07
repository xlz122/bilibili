import React from 'react';
import styles from './suggest.module.scss';

type Props = {
  keyword: string;
  search: (value: string) => void;
};

function SearchSuggest(props: Props): React.ReactElement {
  return (
    <div className={styles.searchSuggest}>
      <ul className={styles.suggestList}>
        <li
          className={styles.suggestItem}
          onClick={() => props.search(props.keyword)}
        >
          {props.keyword}
        </li>
      </ul>
    </div>
  );
}

export default SearchSuggest;
