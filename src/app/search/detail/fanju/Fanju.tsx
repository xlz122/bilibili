import React from 'react';
import Image from 'next/image';
import styles from './fanju.module.scss';

type Props = {
  list: FanjuItemType[];
};

export type FanjuItemType = {
  cover: string;
  title: string;
};

function Fanju(props: Props): React.ReactElement {
  const RenderItem = ({ item }: { item: FanjuItemType }) => (
    <li className={styles.item}>
      <div className={styles.itemCover}>
        <Image src={item.cover} fill priority sizes="100%" alt="" />
      </div>
      <div className={styles.itemInfo}>
        <p className={styles.infoLable}>番剧</p>
        <p className={styles.infoTitle} dangerouslySetInnerHTML={{ __html: item.title }} />
      </div>
    </li>
  );

  return (
    <div className={styles.fanju}>
      <ul className={styles.list}>
        {props.list?.map?.((item, index) => {
          return <RenderItem key={index} item={item} />;
        })}
      </ul>
    </div>
  );
}

export default Fanju;
