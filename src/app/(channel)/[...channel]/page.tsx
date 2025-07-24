import React from 'react';
import { indexRegion, indexArchive } from '@/api/home';
import type { ResponseType } from '@/types';
import Channel from './Channel';

type Params = Promise<{ channel: string }>;

const props = {
  region: [],
  archive: []
};

const getIndexRegion = async ({ rid }: { rid: string }): Promise<void> => {
  const res: ResponseType = await indexRegion({ rid, day: 7 });
  if (res?.code !== 0) {
    return;
  }

  props.region = res.data?.slice?.(0, 4) ?? [];
};

const getIndexArchive = async ({ rid }: { rid: string }): Promise<void> => {
  const res: ResponseType = await indexArchive({ rid, page: 1 });
  if (res?.code !== 0) {
    return;
  }

  props.archive = res.data?.archives ?? [];
};

async function Page({ params }: { params: Params }) {
  const { channel } = await params;
  await getIndexRegion({ rid: channel[2] ?? channel[1] });
  await getIndexArchive({ rid: channel[2] ?? channel[1] });

  return <Channel region={props.region} archive={props.archive} />;
}

export default Page;
