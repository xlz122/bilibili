import React from 'react';
import { liveAreaList } from '@/api/live';
import type { ResponseType } from '@/types/index';
import Header from '@/app/live/header/Header';
import LiveList from './LiveList';

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

async function Page({
  searchParams
}: {
  searchParams: { parent_area_id: string; parent_area_name: string };
}) {
  await getLiveList({ parent_area_id: searchParams.parent_area_id });

  return (
    <>
      <Header />
      <LiveList title={searchParams.parent_area_name} list={props.list} />
    </>
  );
}

export default Page;
