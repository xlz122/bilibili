import React from 'react';
import { liveInfo } from '@/api/live';
import type { ResponseType } from '@/types';
import LiveRoom from './LiveRoom';

type SearchParams = Promise<{ roomid: string }>;

const props = {
  data: {}
};

const getLiveInfo = async ({ roomid }: { roomid: string }): Promise<void> => {
  const { code, data }: ResponseType = await liveInfo({ roomid });
  if (code !== 0) {
    return;
  }

  props.data = data ?? {};
};

async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { roomid } = await searchParams;
  await getLiveInfo({ roomid });

  return <LiveRoom data={props.data} />;
}

export default Page;
