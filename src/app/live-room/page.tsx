import React from 'react';
import { liveInfo } from '@/api/live';
import type { ResponseType } from '@/types/index';
import LiveRoom from './LiveRoom';

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

async function Page({ searchParams }: { searchParams: { roomid: string } }) {
  await getLiveInfo({ roomid: searchParams.roomid });

  return <LiveRoom data={props.data} />;
}

export default Page;
