import React from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import styles from './comment.module.scss';

type Props = {
  list: ItemType[];
  count: number;
};

type ItemType = {
  ctime: number;
  member: {
    avatar: string;
    uname: string;
  };
  content: { message: string };
};

function VideoComment(props: Props): React.ReactElement {
  const RenderItem = ({ item }: { item: ItemType }) => (
    <li className={styles.item}>
      <div className={styles.itemCover}>
        <Image src={item.member.avatar} fill sizes="50%" priority alt="" />
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.itemAvatar}>
          <span className={styles.avatarText}>{item.member.uname}</span>
          <span className={styles.avatarTime}>
            {dayjs(item.ctime * 1000).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </div>
        <div className={styles.itemContent}>{item.content.message}</div>
      </div>
    </li>
  );

  return (
    <div className={styles.videoComment}>
      <div className={styles.title}>
        <span className={styles.titleText}>评论</span>
        <span className={styles.titleCount}>{`(${props.count})`}</span>
      </div>
      <ul className={styles.list}>
        {props.list?.map?.((item, index) => {
          return <RenderItem key={index} item={item} />;
        })}
      </ul>
    </div>
  );
}

export default VideoComment;
