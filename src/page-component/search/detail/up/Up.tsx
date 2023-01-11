import React from 'react';
import Image from 'next/image';
import styles from './up.module.scss';

type Props = {
  list: UpItemType[];
};

export type UpItemType = {
  upic: string;
  uname: string;
  fans: number;
  videos: number;
  usign: string;
};

function Up(props: Props): React.ReactElement {
  const RenderItem = ({ item }: { item: UpItemType }) => (
    <li className={styles.item}>
      <div className={styles.itemCover}>
        <Image src={`https:${item.upic}`} fill sizes="100%" priority alt="" />
      </div>
      <div className={styles.itemInfo}>
        <p className={styles.infoName}>{item.uname}</p>
        <p className={styles.infoText}>
          {`粉丝: ${item.fans} 视频: ${item.videos}`}
        </p>
        <p className={styles.infoText}>{item.usign}</p>
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

export default Up;
