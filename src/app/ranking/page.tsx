import React from 'react';
import { rankRegion } from '@/api/ranking';
import type { ResponseType } from '@/types';
import Ranking from './Ranking';

type SearchParams = Promise<{ rid: string }>;

const props = {
  list: [],
};

const getRankRegion = async ({ rid }: { rid: string }): Promise<void> => {
  const res: ResponseType = await rankRegion({ rid });
  if (res?.code !== 0) {
    return;
  }

  props.list = res.data?.list ?? [];
};

async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { rid } = await searchParams;
  await getRankRegion({ rid });

  return <Ranking list={props.list} />;
}

export default Page;
