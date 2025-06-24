'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { formatNumber } from '@/utils/utils';
import styles from './live.module.scss';

type Props = {
  list: GroupItemType[];
};

type GroupItemType = {
  module_info: {
    title: string;
    area_v2_parent_id: number;
  };
  list: ItemType[];
};

type ItemType = {
  roomid: number;
  title: string;
  cover: string;
  uname: string;
  watched_show: { num: number };
};

function Live(props: Props): React.ReactElement {
  const router = useRouter();

  const jumpLiveAreaList = ({ id, name }: { id: number; name: string }) => {
    router.push(`/live-list?parent_area_id=${id}&parent_area_name=${name}`);
  };

  const jumpLiveArea = () => {
    router.push('/live-area');
  };

  const jumpLiveDetail = (item: ItemType) => {
    router.push(`/live-room?roomid=${item.roomid}`);
  };

  const RenderGroup = ({ item }: { item: GroupItemType }) => (
    <div className={styles.panel}>
      <div className={styles.title}>
        <div className={styles.titleText}>{item.module_info.title}</div>
        <div
          className={styles.more}
          onClick={() => {
            jumpLiveAreaList({
              id: item.module_info.area_v2_parent_id,
              name: item.module_info.title
            });
          }}
        >
          <div className={styles.moreText}>进来看看</div>
          <Image
            className={styles.moreIcon}
            width="16"
            height="16"
            src="/images/live/icon-arrow.png"
            alt=""
          />
        </div>
      </div>
      <div className={styles.list}>
        {item.list?.map?.((i, ind) => {
          return <RenderItem key={ind} item={i} />;
        })}
      </div>
    </div>
  );

  const RenderItem = ({ item }: { item: ItemType }) => (
    <div className={styles.item} onClick={() => jumpLiveDetail(item)}>
      <div className={styles.itemCover}>
        <Image src={item.cover} fill sizes="50%" priority alt="" />
        <div className={styles.info}>
          <div className={styles.infoName}>{item.uname}</div>
          <div className={styles.infoItem}>
            <Image
              width="8"
              height="8"
              src="/images/live/icon-eye.png"
              alt=""
            />
            <span className={styles.itemCount}>
              {formatNumber(item.watched_show?.num)}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.itemTitle}>{item.title}</div>
    </div>
  );

  return (
    <>
      {props.list?.map?.((item, index) => {
        if (index === 0) {
          return;
        }

        return <RenderGroup key={index} item={item} />;
      })}
      <div className={styles.operate}>
        <button
          className={styles.operateItem}
          onClick={() => {
            jumpLiveAreaList({ id: 0, name: '全部直播' });
          }}
        >
          全部直播
        </button>
        <button className={styles.operateItem} onClick={jumpLiveArea}>
          全部分类
        </button>
      </div>
    </>
  );
}

export default Live;
