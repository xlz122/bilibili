import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { formatTenThousand } from '@utils/utils';
import { liveAreaList } from '@/api/live';
import type { GetServerSidePropsContext } from 'next';
import type { ResponseType } from '@/types/index';
import TabBar from '@/page-component/live/tab-bar/TabBar';
import styles from './live-list.module.scss';

type Props = {
  title: string;
  list: ItemType[];
};

type ItemType = {
  parent_name: string;
  roomid: number;
  title: string;
  cover: string;
  uname: string;
  watched_show: {
    num: number;
  };
};

function LiveList(props: Props): React.ReactElement {
  const router = useRouter();

  // 跳转直播详情
  const jumpLiveDetail = (roomid: number): void => {
    router.push({
      pathname: '/live-room',
      query: { roomid: roomid }
    });
  };

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
    <div className={styles.liveListMain}>
      <h5 className={styles.title}>{props.title}</h5>
      <div className={styles.list}>
        {props.list?.map((item, index) => {
          return <RenderItem key={index} item={item} />;
        })}
        {props?.list?.length < 30 && (
          <button className={styles.noMore}>没有更多直播间了</button>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res: ResponseType = await liveAreaList({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    parent_area_id: Number(context.query.parent_area_id),
    area_id: 0,
    page: 1,
    size: 30
  });

  const props: Props = {
    title: '',
    list: []
  };

  if (res?.code === 0) {
    props.title = String(context.query.parent_area_name);
    props.list = res?.data?.list || [];
  }

  return {
    props
  };
}

LiveList.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <div className={styles.liveList}>
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

export default LiveList;
