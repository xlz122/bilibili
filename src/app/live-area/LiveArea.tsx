'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './live-area.module.scss';

type Props = {
  list: {
    id: number;
    name: string;
    entrance_icon: { src: string };
  }[];
};

function LiveArea(props: Props): React.ReactElement {
  const router = useRouter();

  const jumpLiveAreaList = ({ id, name }: { id: number; name: string }) => {
    router.push(`/live-list?parent_area_id=${id}&parent_area_name=${name}`);
  };

  return (
    <div className={styles.liveArea}>
      <h5 className={styles.title}>全部分类</h5>
      <ul className={styles.list}>
        {props.list?.map?.((item, index) => {
          return (
            <li
              className={styles.item}
              key={index}
              onClick={() => {
                jumpLiveAreaList({ id: item.id, name: item.name });
              }}
            >
              <div className={styles.itemCover}>
                <Image
                  src={item.entrance_icon?.src}
                  fill
                  sizes="50%"
                  priority
                  alt=""
                />
              </div>
              <p className={styles.itemText}>{item.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LiveArea;
