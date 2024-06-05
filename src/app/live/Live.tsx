'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { formatTenThousand } from '@/utils/utils';
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
  watched_show: {
    num: number;
  };
};

function Live(props: Props): React.ReactElement {
  const router = useRouter();

  const jumpLiveAreaList = ({ id, name }: { id: number; name: string }) => {
    router.push(`/live-list?parent_area_id=${id}&parent_area_name=${name}`);
  };

  const jumpLiveArea = (): void => {
    router.push('/live-area');
  };

  const jumpLiveDetail = (item: ItemType): void => {
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
            width={16}
            height={16}
            src={'/images/live/icon-arrow.png'}
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
        <Image
          className={styles.itemImage}
          src={item.cover}
          fill
          sizes="50%"
          priority
          alt=""
        />
        <div className={styles.info}>
          <div className={styles.infoName}>
            <span className={styles.nameText}>{item.uname}</span>
          </div>
          <div className={styles.infoCount}>
            <Image
              width={8}
              height={8}
              src={'/images/live/icon-eye.png'}
              alt=""
            />
            <span className={styles.countText}>
              {formatTenThousand(item.watched_show?.num)}
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
        <div className={styles.operateItem}>
          <button
            className={styles.operateItemBtn}
            onClick={() => {
              jumpLiveAreaList({ id: 0, name: '全部直播' });
            }}
          >
            全部直播
          </button>
        </div>
        <div className={styles.operateItem}>
          <button className={styles.operateItemBtn} onClick={jumpLiveArea}>
            全部分类
          </button>
        </div>
      </div>
    </>
  );
}

export default Live;
