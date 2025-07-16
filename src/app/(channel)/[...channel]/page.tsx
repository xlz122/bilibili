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
  const { code, data }: ResponseType = await indexRegion({ rid, day: 7 });
  if (code !== 0) {
    return;
  }

  props.region = data.slice?.(0, 4) ?? [];
};

const getIndexArchive = async ({ rid }: { rid: string }): Promise<void> => {
  const { code, data }: ResponseType = await indexArchive({ rid, page: 1 });
  if (code !== 0) {
    return;
  }

  props.archive = data.archives ?? [];
};

async function Page({ params }: { params: Params }) {
  const { channel } = await params;
  await getIndexRegion({ rid: channel[2] ?? channel[1] });
  await getIndexArchive({ rid: channel[2] ?? channel[1] });

  return <Channel region={props.region} archive={props.archive} />;
}

export default Page;
