'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from 'react-redux';
import Image from 'next/image';
import { formatNumber } from '@/utils/utils';
import Panel from './panel/Panel';
import styles from './channel.module.scss';

type Props = {
  region: ItemType[];
  archive: ItemType[];
};

type ItemType = {
  aid: number;
  pic: string;
  play: number;
  video_review: number;
  title: string;
  stat: {
    danmaku: number;
    view: number;
  };
};

function Channel(props: Props): React.ReactElement {
  const router = useRouter();
  const store = useStore();

  const jumpVideoDetail = (item: ItemType) => {
    router.push(`/video-detail?aid=${item.aid}`);

    store.dispatch({
      type: 'routine/setViewHistory',
      payload: {
        aid: item.aid,
        pic: item.pic,
        title: item.title,
        createTime: new Date().getTime()
      }
    });
  };

  const RenderRegionItem = ({ item }: { item: ItemType }) => {
    return (
      <li className={styles.item} onClick={() => jumpVideoDetail(item)}>
        <div className={styles.itemCover}>
          <Image src={item.pic} fill sizes="50%" priority alt="" />
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <i className={`icon-play-count ${styles.itemIcon}`}></i>
              <span className={styles.itmCount}>{formatNumber(item.play)}</span>
            </div>
            <div className={styles.infoItem}>
              <i className={`icon-barrage-count ${styles.itemIcon}`}></i>
              <span className={styles.itmCount}>
                {formatNumber(item.video_review)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.itemTitle}>{item.title}</div>
      </li>
    );
  };

  const RenderArchiveItem = ({ item }: { item: ItemType }) => {
    return (
      <li className={styles.item} onClick={() => jumpVideoDetail(item)}>
        <div className={styles.itemCover}>
          <Image src={item.pic} fill sizes="50%" priority alt="" />
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <i className={`icon-play-count ${styles.itemIcon}`}></i>
              <span className={styles.itmCount}>
                {formatNumber(item.stat.view)}
              </span>
            </div>
            <div className={styles.infoItem}>
              <i className={`icon-barrage-count ${styles.itemIcon}`}></i>
              <span className={styles.itmCount}>
                {formatNumber(item.stat.danmaku)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.itemTitle}>{item.title}</div>
      </li>
    );
  };

  return (
    <div className={styles.channel}>
      <Panel title="热门推荐">
        <ul className={styles.list}>
          {props.region?.map?.((item, index) => {
            return <RenderRegionItem key={index} item={item} />;
          })}
        </ul>
      </Panel>
      <Panel title="最新视频">
        <ul className={styles.list}>
          {props.archive?.map?.((item, index) => {
            return <RenderArchiveItem key={index} item={item} />;
          })}
        </ul>
      </Panel>
    </div>
  );
}

export default Channel;
