import React from 'react';
import { liveIndex } from '@/api/live';
import type { ResponseType } from '@/types/index';
import type { BannerType } from './live-banner/LiveBanner';
import type { ListItemType } from './live-group/LiveGroup';
import TabBar from './tab-bar/TabBar';
import LiveBanner from './live-banner/LiveBanner';
import LiveGroup from './live-group/LiveGroup';

type Props = {
  banner: BannerType;
  list: ListItemType[];
};

function Live(props: Props): React.ReactElement {
  return (
    <>
      <TabBar />
      <LiveBanner banner={props.banner} />
      <LiveGroup list={props.list} />
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
    banner: {},
    list: []
  };

  if (res?.code === 0) {
    props.banner = res?.data?.module_list[0] || {};
    props.list = res?.data?.module_list.slice(1) || [];
  }

  return {
    props,
    revalidate: 60
  };
}

Live.getLayout = function getLayout(page: React.ReactElement) {
  return page;
};

export default Live;
