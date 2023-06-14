import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { liveIndex } from '@/api/live';
import type { ResponseType } from '@/types/index';
import type { ListItemType } from '@/page-component/live/group/Group';
import TabBar from '@/page-component/live/tab-bar/TabBar';
import LiveBanner from '@/page-component/live/banner/Banner';
import LiveGroup from '@/page-component/live/group/Group';
import styles from './live.module.scss';

type Props = {
  banner: {
    pic: string;
    link: string;
  }[];
  list: ListItemType[];
};

function Live(props: Props): React.ReactElement {
  return (
    <>
      <LiveBanner list={props.banner} />
      <LiveGroup list={props.list} />
      <div className={styles.operate}>
        <div className={styles.operateItem}>
          <button className={styles.operateItemBtn}>全部直播</button>
        </div>
        <div className={styles.operateItem}>
          <button className={styles.operateItemBtn}>全部分类</button>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(): Promise<{
  props: Props;
  revalidate: number;
}> {
  const res: ResponseType = await liveIndex({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  });

  const props: Props = {
    banner: [],
    list: []
  };

  if (res?.code === 0) {
    props.banner = res?.data?.module_list[0]?.list || [];
    props.list = res?.data?.module_list?.slice(1) || [];
  }

  return {
    props,
    revalidate: 60
  };
}

Live.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <div className={styles.live}>
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

export default Live;
