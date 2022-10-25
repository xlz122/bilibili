import React, { useState } from 'react';
import { ranking } from '@api/home';
import type { ResponseType } from '@/types/index';
import type { VideoItem } from '@/components/video-list/VideoList';
import TabBar from '@components/tab-bar/TabBar';
import VideoList from '@components/video-list/VideoList';

type Props = {
  list: VideoItem[];
};

type TabType = {
  tid: number;
  subTid: number;
};

function Index(props: Props): React.ReactElement {
  const [tab, setTab] = useState<TabType>({
    tid: 0,
    subTid: 1
  });

  const tabChange = ({ tid, subTid }: TabType): void => {
    setTab({ ...tab, tid, subTid });
  };

  return (
    <>
      <TabBar tid={tab.tid} subTid={tab.subTid} tabChange={tabChange} />
      <VideoList list={props.list} />
    </>
  );
}

export async function getStaticProps() {
  const res: ResponseType<{ list: VideoItem[] }> = await ranking({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  });

  const props: Props = {
    list: []
  };

  if (res?.code === '1') {
    props.list = res?.data?.list || [];
  }

  return {
    props,
    revalidate: 10
  };
}

export default Index;
