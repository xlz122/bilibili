import React from 'react';
import { rankRegion } from '@/api/ranking';
import type { ResponseType } from '@/types/index';
import Ranking from './Ranking';

const props = {
  list: []
};

const getRankRegion = async ({ rid }: { rid: string }): Promise<void> => {
  const { code, data }: ResponseType = await rankRegion({ rid });
  if (code !== 0) {
    return;
  }

  props.list = data.list ?? [];
};

async function Page({ searchParams }: { searchParams: { rid: string } }) {
  await getRankRegion({ rid: searchParams.rid });

  return <Ranking list={props.list} />;
}

export default Page;
