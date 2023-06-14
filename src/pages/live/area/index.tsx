import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { liveArea } from '@/api/live';
import type { ResponseType } from '@/types/index';
import TabBar from '@/page-component/live/tab-bar/TabBar';
import styles from './live-area.module.scss';

type Props = {
  list: {
    id: number;
    name: string;
    entrance_icon: {
      src: string;
    };
  }[];
};

function LiveArea(props: Props): React.ReactElement {
  return (
    <div className={styles.liveAreaMain}>
      <h5 className={styles.areaTitle}>全部分类</h5>
      <ul className={styles.areaList}>
        {props.list?.map((item, index) => {
          return (
            <li className={styles.areaItem} key={index}>
              <div className={styles.areaItemCover}>
                <Image
                  src={item?.entrance_icon?.src || ''}
                  fill
                  sizes="50%"
                  priority
                  alt=""
                />
              </div>
              <p className={styles.areaItemText}>{item.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps(): Promise<{
  props: Props;
  revalidate: number;
}> {
  const res: ResponseType = await liveArea({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  });

  const props: Props = {
    list: []
  };

  if (res?.code === 0) {
    // 最后一项(精彩轮播)不展示
    props.list = res?.data.slice(0, res.data.length - 1) || [];
  }

  return {
    props,
    revalidate: 60
  };
}

LiveArea.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <div className={styles.liveArea}>
      <Link className={styles.logo} href="/">
        <Image
          className={styles.logoImage}
          width={58}
          height={26}
          src={'/images/live/live-logo-pink.png'}
          alt=""
        />
      </Link>
      <TabBar />
      {page}
    </div>
  );
};

export default LiveArea;
