import React from 'react';
import { useRouter } from 'next/router';
import { useStore } from 'react-redux';
import Image from 'next/image';
import { formatTenThousand } from '@utils/utils';
import { indexRegion, indexArchive } from '@api/home';
import type { GetServerSidePropsContext } from 'next';
import type { ResponseType } from '@/types/index';
import Layout from '@components/layout/Layout';
import TabBar from '@/page-component/index/tab-bar/TabBar';
import Panel from '@/page-component/index/panel/Panel';
import styles from './channel.module.scss';

type Props = {
  region: ItemType[];
  archive: ItemType[];
};

type ItemType = {
  aid: number;
  pic?: string;
  play: number;
  video_review: number;
  title?: string;
  stat?: {
    danmaku?: number;
    view?: number;
  };
};

function Channel(props: Props): React.ReactElement {
  const router = useRouter();
  const store = useStore();

  // 跳转视频详情
  const jumpVideoDetail = (item: ItemType): void => {
    router.push({
      pathname: '/video',
      query: { aid: item.aid }
    });

    store.dispatch({
      type: 'routine/setViewHistory',
      payload: {
        aid: item.aid,
        pic: item.pic,
        title: item.title,
        createTime: new Date().getTime() / 1000
      }
    });
  };

  const RenderItem = ({ item }: { item: ItemType }) => {
    return (
      <li className={styles.item} onClick={() => jumpVideoDetail(item)}>
        <div className={styles.itemCover}>
          <Image
            className={styles.itemImage}
            src={item?.pic || ''}
            fill
            sizes="50%"
            priority
            alt=""
          />
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <i className={`icon-play-count ${styles.itemIcon}`}></i>
              <span className={styles.itemText}>
                {formatTenThousand(item.play)}
              </span>
            </div>
            <div className={styles.infoItem}>
              <i className={`icon-barrage-count ${styles.itemIcon}`}></i>
              <span className={styles.itemText}>
                {formatTenThousand(item.video_review)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.itemTitle}>{item?.title}</div>
      </li>
    );
  };

  const RenderArchiveItem = ({ item }: { item: ItemType }) => {
    return (
      <li className={styles.item} onClick={() => jumpVideoDetail(item)}>
        <div className={styles.itemCover}>
          <Image
            className={styles.itemImage}
            src={item?.pic || ''}
            fill
            sizes="50%"
            priority
            alt=""
          />
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <i className={`icon-play-count ${styles.itemIcon}`}></i>
              <span className={styles.itemText}>
                {item?.stat?.view && formatTenThousand(item?.stat?.view)}
              </span>
            </div>
            <div className={styles.infoItem}>
              <i className={`icon-barrage-count ${styles.itemIcon}`}></i>
              <span className={styles.itemText}>
                {item?.stat?.danmaku && formatTenThousand(item?.stat?.danmaku)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.itemTitle}>{item?.title}</div>
      </li>
    );
  };

  return (
    <div className={styles.channelMain}>
      <Panel title="热门推荐">
        <ul className={styles.list}>
          {props?.region?.map((item, index) => {
            return <RenderItem key={index} item={item} />;
          })}
        </ul>
      </Panel>
      <Panel title="最新视频">
        <ul className={styles.list}>
          {props?.archive?.map((item, index) => {
            return <RenderArchiveItem key={index} item={item} />;
          })}
        </ul>
      </Panel>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const param = context.query.param || [];

  const props: Props = {
    region: [],
    archive: []
  };

  try {
    // 热门推荐列表
    const region: ResponseType<Props['region']> = await indexRegion({
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      rid: Number(param[1]) || Number(param[0]),
      day: 7
    });

    props.region = region?.data?.slice(0, 4) || [];

    // 最新视频列表
    const archive: ResponseType = await indexArchive({
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      rid: Number(param[1]) || Number(param[0]),
      page: 1
    });

    props.archive = archive?.data?.archives || [];
  } catch {
    return {
      notFound: true
    };
  }

  return {
    props
  };
}

Channel.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <div className={styles.channel}>
      <Layout>
        <TabBar />
        {page}
      </Layout>
    </div>
  );
};

export default Channel;
