import React from 'react';
import { searchDefault, searchHot } from '@/api/search';
import type { ResponseType } from '@/types';
import Search from './Search';

const props = {
  default: {},
  hot: [],
};

const getSearchDefault = async (): Promise<void> => {
  const res: ResponseType = await searchDefault();
  if (res?.code !== 0) {
    return;
  }

  props.default = res.data ?? {};
};

const getSearchHot = async (): Promise<void> => {
  const res: ResponseType & { list?: never[] } = await searchHot();
  if (res?.code !== 0) {
    return;
  }

  props.hot = res.list?.slice?.(0, 4) ?? [];
};

async function Page(): Promise<React.ReactElement> {
  await getSearchDefault();
  await getSearchHot();

  return <Search {...props} />;
}

export default Page;
