import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from 'react-redux';
import Image from 'next/image';
import { formatNumber } from '@/utils/utils';
import styles from './video.module.scss';

type Props = {
  list: VideoItemType[];
};

export type VideoItemType = {
  aid: number;
  pic: string;
  title: string;
  duration: string;
  author: string;
  play: number;
  video_review: number;
};

function Video(props: Props): React.ReactElement {
  const router = useRouter();
  const store = useStore();

  const jumpVideoDetail = (item: VideoItemType) => {
    router.push(`/video-detail?aid=${item.aid}`);

    store.dispatch({
      type: 'routine/setViewHistory',
      payload: {
        aid: item.aid,
        pic: item.pic.includes('http') ? item.pic : `http:${item.pic}`,
        title: item.title,
        createTime: new Date().getTime()
      }
    });
  };

  const RenderItem = ({ item }: { item: VideoItemType }) => (
    <li className={styles.item} onClick={() => jumpVideoDetail(item)}>
      <div className={styles.itemCover}>
        <Image
          src={item.pic.includes('http') ? item.pic : `http:${item.pic}`}
          fill
          priority
          sizes="100%"
          alt=""
        />
        <span className={styles.itemDuration}>{item.duration}</span>
      </div>
      <div className={styles.itemInfo}>
        <p
          className={styles.infoTitle}
          dangerouslySetInnerHTML={{ __html: item.title }}
        ></p>
        <div className={styles.infoAuthor}>
          <Image
            width="15"
            height="13"
            src="/images/ranking/icon-up.png"
            alt=""
          />
          <span className={styles.authorText}>{item.author}</span>
        </div>
        <div className={styles.infoCount}>
          <div className={styles.countItem}>
            <Image
              width="15"
              height="13"
              src="/images/ranking/icon-play.png"
              alt=""
            />
            <span className={styles.countText}>{formatNumber(item.play)}</span>
          </div>
          <div className={styles.countItem}>
            <Image
              width="15"
              height="13"
              src="/images/ranking/icon-comment.png"
              alt=""
            />
            <span className={styles.countText}>
              {formatNumber(item.video_review)}
            </span>
          </div>
        </div>
      </div>
    </li>
  );

  return (
    <div className={styles.video}>
      <ul className={styles.list}>
        {props.list.map?.((item, index) => {
          return <RenderItem key={index} item={item} />;
        })}
      </ul>
    </div>
  );
}

export default Video;
