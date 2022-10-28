import React from 'react';
import { ranking } from '@api/home';
import type { ResponseType } from '@/types/index';
import type { VideoItem } from '@/pages/home/video-list/VideoList';
import Layout from '@components/layout/Layout';
import TabBar from '@/pages/home/tab-bar/TabBar';
import VideoList from '@/pages/home/video-list/VideoList';

type Props = {
  list: VideoItem[];
};

function Index(props: Props): React.ReactElement {
  return <VideoList list={props.list} />;
}

export async function getServerSideProps(): Promise<{ props: Props }> {
  const res: ResponseType<{ list: Props['list'] }> = await ranking({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  });

  const props: Props = {
    list: []
  };

  if (res.code === 0) {
    props.list = res?.data?.list?.slice(0, 20) || [];
  }

  return {
    props
  };
}

Index.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout>
      <TabBar />
      {page}
    </Layout>
  );
};

export default Index;
