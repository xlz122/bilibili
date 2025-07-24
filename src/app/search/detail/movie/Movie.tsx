import React from 'react';
import Image from 'next/image';
import styles from './movie.module.scss';

type Props = {
  list: MovieItemType[];
};

export type MovieItemType = {
  cover: string;
  title: string;
  areas: string;
  cv: string;
  staff: string;
};

function Movie(props: Props): React.ReactElement {
  const RenderItem = ({ item }: { item: MovieItemType }) => (
    <li className={styles.item}>
      <div className={styles.itemCover}>
        <Image src={item.cover} fill priority sizes="100%" alt="" />
      </div>
      <div className={styles.itemInfo}>
        <p className={styles.infoTitle} dangerouslySetInnerHTML={{ __html: item.title }} />
        <p className={styles.infoText}>{`地区: ${item.areas}`}</p>
        <p className={styles.infoText}>{`演员: ${item.cv}`}</p>
        <p className={styles.infoText}>{item.staff}</p>
      </div>
    </li>
  );

  return (
    <div className={styles.movie}>
      <ul className={styles.list}>
        {props.list?.map?.((item, index) => {
          return <RenderItem key={index} item={item} />;
        })}
      </ul>
    </div>
  );
}

export default Movie;
