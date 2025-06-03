import React from 'react';
import { liveAreaList } from '@/api/live';
import type { ResponseType } from '@/types';
import Header from '@/app/live/header/Header';
import LiveList from './LiveList';

type SearchParams = Promise<{
  parent_area_id: string;
  parent_area_name: string;
}>;

const props = {
  list: []
};

const getLiveList = async ({ parent_area_id }: { parent_area_id: string }) => {
  const { code, data }: ResponseType = await liveAreaList({
    parent_area_id,
    area_id: 0,
    page: 1,
    size: 30
  });
  if (code !== 0) {
    return;
  }

  props.list = data.list ?? [];
};

async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { parent_area_id, parent_area_name } = await searchParams;
  await getLiveList({ parent_area_id });

  return (
    <>
      <Header />
      <LiveList title={parent_area_name} list={props.list} />
    </>
  );
}

export default Page;
