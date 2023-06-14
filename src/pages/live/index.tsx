import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { formatTenThousand } from '@utils/utils';
import { liveIndex } from '@/api/live';
import type { ResponseType } from '@/types/index';
import TabBar from '@/page-component/live/tab-bar/TabBar';
import LiveBanner from '@/page-component/live/banner/Banner';
import LivePanel from '@/page-component/live/panel/Panel';
import styles from './live.module.scss';

type Props = {
  banner: {
    pic: string;
    link: string;
  }[];
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

  // 跳转直播详情
  const jumpLiveDetail = (roomid: number): void => {
    router.push({
      pathname: '/live-room',
      query: { roomid: roomid }
    });
  };

  // 跳转直播分类列表
  const jumpLiveAreaList = ({ id, name }: { id: number; name: string }) => {
    router.push({
      pathname: '/live/list',
      query: {
        parent_area_id: id,
        parent_area_name: name
      }
    });
  };

  // 跳转直播分类
  const jumpLiveArea = (): void => {
    router.push({ pathname: '/live/area' });
  };

  const RenderGroup = ({ item }: { item: GroupItemType }) => (
    <LivePanel
      title={item.module_info.title}
      subTitle="进来看看"
      onMore={() => {
        jumpLiveAreaList({
          id: item.module_info.area_v2_parent_id,
          name: item.module_info.title
        });
      }}
    >
      <div className={styles.list}>
        {item?.list?.map((i, ind) => {
          return <RenderItem key={ind} item={i} />;
        })}
      </div>
    </LivePanel>
  );

  const RenderItem = ({ item }: { item: ItemType }) => (
    <div className={styles.item} onClick={() => jumpLiveDetail(item.roomid)}>
      <div className={styles.itemCover}>
        <Image
          className={styles.itemImage}
          src={item?.cover || ''}
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
              src={'/images/live/live-eye.png'}
              alt=""
            />
            <span className={styles.countText}>
              {formatTenThousand(item?.watched_show?.num)}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.itemTitle}>{item.title}</div>
    </div>
  );

  return (
    <div className={styles.liveMain}>
      <LiveBanner list={props.banner} />
      {props.list?.map((item, index) => {
        // 第一项不展示
        if (index === 0) {
          return null;
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
    </div>
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
