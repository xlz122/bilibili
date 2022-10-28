import React from 'react';
import { rankingRegion, rankingArchive } from '@api/home';
import type { GetServerSidePropsContext } from 'next';
import type { ResponseType } from '@/types/index';
import type { VideoItem } from '@/pages/home/video-list/VideoList';
import Layout from '@components/layout/Layout';
import TabBar from '@/pages/home/tab-bar/TabBar';
import Panel from '@/pages/home/panel/Panel';
import VideoList from '@/pages/home/video-list/VideoList';

type Props = {
  region: VideoItem[];
  archive: VideoItem[];
};

function Channel(props: Props): React.ReactElement {
  return (
    <>
      <Panel title="热门推荐">
        <VideoList list={props.region} />
      </Panel>
      <Panel title="最新视频">
        <VideoList list={props.archive} />
      </Panel>
    </>
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
    const region: ResponseType<Props['region']> = await rankingRegion({
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      rid: Number(param[1]) || Number(param[0]),
      day: 7
    });

    props.region = region?.data?.slice(0, 4) || [];

    // 最新视频列表
    const archive: ResponseType = await rankingArchive({
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
      tid: Number(param[1]) || Number(param[0]),
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
    <Layout>
      <TabBar />
      {page}
    </Layout>
  );
};

export default Channel;
