import React from 'react';
import Image from 'next/image';
import styles from './live-group.module.scss';

type Props = {
  list: ListItemType[];
};

export type ListItemType = {
  module_info: {
    title: string;
  };
  list: {
    title: string;
    cover: string;
    uname: string;
    watched_show: {
      num: number;
    };
  }[];
};

const RenderItem = ({ item }: { item: ListItemType }) => (
  <div className={styles.panel}>
    <div className={styles.title}>
      <div className={styles.titleText}>{item.module_info.title}</div>
      <div className={styles.more}>
        <div className={styles.moreText}>进来看看</div>
        <Image
          className={styles.rightIcon}
          width={16}
          height={16}
          src={'/images/live-right-arrow.png'}
          alt=""
        />
      </div>
    </div>
    <div className={styles.list}>
      {item.list.map((i, index) => {
        return (
          <div className={styles.item} key={index}>
            <div className={styles.itemCover}>
              <Image
                className={styles.itemImage}
                src={i?.cover || ''}
                fill
                sizes="50%"
                priority
                alt=""
              />
              <div className={styles.infoView}>
                <div className={styles.infoItem}>
                  <span className={styles.itemText}>{i.uname}</span>
                </div>
                <div className={styles.infoItem}>
                  <Image
                    width={8}
                    height={8}
                    src={'/images/live-eye.png'}
                    alt=""
                  />
                  <span className={styles.itemText}>
                    {i?.watched_show?.num}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.itemTitle}>{i.title}</div>
          </div>
        );
      })}
    </div>
  </div>
);

function LiveGroup(props: Props): React.ReactElement {
  return (
    <div className={styles.page}>
      {props?.list?.map((item, index) => {
        // 第一项分类不展示
        if (index === 0) {
          return null;
        }

        return <RenderItem key={index} item={item} />;
      })}
      <div className={styles.operate}>
        <div className={styles.operateItem}>
          <button className={styles.operateBtn}>全部直播</button>
        </div>
        <div className={styles.operateItem}>
          <button className={styles.operateBtn}>全部分类</button>
        </div>
      </div>
    </div>
  );
}

export default LiveGroup;
