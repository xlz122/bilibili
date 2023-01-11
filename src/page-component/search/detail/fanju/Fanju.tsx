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
        <Image src={item.cover} fill sizes="100%" priority alt="" />
      </div>
      <div className={styles.itemInfo}>
        <p className={styles.infoLable}>番剧</p>
        <p
          className={styles.infoTitle}
          dangerouslySetInnerHTML={{ __html: item.title }}
        ></p>
      </div>
    </li>
  );

  return (
    <ul>
      {props.list?.map((item, index) => {
        return <RenderItem key={index} item={item} />;
      })}
    </ul>
  );
}

export default Fanju;
