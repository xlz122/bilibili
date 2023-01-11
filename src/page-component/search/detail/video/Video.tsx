import React from 'react';
import { useRouter } from 'next/router';
import { useStore } from 'react-redux';
import Image from 'next/image';
import { formatTenThousand } from '@utils/utils';
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

  // 跳转视频详情
  const jumpVideoDetail = (item: VideoItemType): void => {
    router.push({
      pathname: '/video',
      query: { aid: item.aid }
    });

    store.dispatch({
      type: 'routine/setViewHistory',
      payload: {
        aid: item.aid,
        pic: `https:${item.pic}`,
        title: item.title,
        createTime: new Date().getTime() / 1000
      }
    });
  };

  const RenderItem = ({ item }: { item: VideoItemType }) => (
    <li className={styles.item} onClick={() => jumpVideoDetail(item)}>
      <div className={styles.itemCover}>
        <Image src={`https:${item.pic}`} fill sizes="100%" priority alt="" />
        <span className={styles.itemDuration}>{item.duration}</span>
      </div>
      <div className={styles.itemInfo}>
        <p
          className={styles.infoTitle}
          dangerouslySetInnerHTML={{ __html: item.title }}
        ></p>
        <div className={styles.infoAuthor}>
          <Image
            width={14.5}
            height={12.5}
            src={'/images/ranking/icon-up.png'}
            alt=""
          />
          <span className={styles.authorText}>{item.author}</span>
        </div>
        <div className={styles.infoCount}>
          <div className={styles.countItem}>
            <Image
              width={14.5}
              height={12.5}
              src={'/images/ranking/icon-play.png'}
              alt=""
            />
            <span className={styles.authorText}>
              {formatTenThousand(item.play)}
            </span>
          </div>
          <div className={styles.countItem}>
            <Image
              width={14.5}
              height={12.5}
              src={'/images/ranking/icon-comment.png'}
              alt=""
            />
            <span className={styles.countText}>
              {formatTenThousand(item.video_review)}
            </span>
          </div>
        </div>
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

export default Video;
