import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { formatDateTime } from '@utils/date';
import { videoComment } from '@/api/video';
import type { ResponseType } from '@/types';
import styles from './comment.module.scss';

type Comment = {
  page: {
    count: number;
  };
  replies: ItemType[];
};

type ItemType = {
  ctime: number;
  member: {
    avatar: string;
    uname: string;
  };
  content: {
    message: string;
  };
};

function VideoComment(): React.ReactElement {
  const aid = useSearchParams().get('aid');

  const [comment, setComment] = useState<Partial<Comment>>({});
  const getVideoRecommend = () => {
    videoComment({ aid: Number(aid), page: 1 })
      .then((res: ResponseType) => {
        if (res.code === 0) {
          setComment(res.data);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    if (!aid) {
      return;
    }

    getVideoRecommend();
  }, [aid]);

  const RenderItem = ({ item }: { item: ItemType }) => (
    <li className={styles.item}>
      <div className={styles.itemCover}>
        <Image
          className={styles.itemImage}
          src={item.member.avatar}
          fill
          sizes="50%"
          priority
          alt=""
        />
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.itemAvatar}>
          <span className={styles.avatarText}>{item.member.uname}</span>
          <span className={styles.avatarTime}>
            {formatDateTime(item.ctime, 'yyyy-MM-dd hh:mm')}
          </span>
        </div>
        <div className={styles.itemContent}>{item.content.message}</div>
      </div>
    </li>
  );

  return (
    <div className={styles.videoComment}>
      <div className={styles.title}>
        <span>评论</span>
        <span className={styles.titleCount}>{`(${comment?.page?.count})`}</span>
      </div>
      <ul className={styles.list}>
        {comment?.replies?.map((item, index) => {
          return <RenderItem key={index} item={item} />;
        })}
      </ul>
    </div>
  );
}

export default VideoComment;
