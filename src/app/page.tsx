import React from 'react';
import { partitions, indexList } from '@/api/home';
import type { ResponseType } from '@/types';
import Header from '@/components/header/Header';
import TabBar from '@/app/home/tab-bar/TabBar';
import Home from '@/app/home/Home';
import styles from './page.module.scss';

const props = {
  tabbar: [],
  list: []
};

const getTabBar = async (): Promise<void> => {
  const { code, data }: ResponseType = await partitions();
  if (code !== 0) {
    return;
  }

  props.tabbar = data ?? [];
};

const getIndexList = async (): Promise<void> => {
  const { code, data }: ResponseType = await indexList({ page: 1 });
  if (code !== 0) {
    return;
  }

  props.list = data.slice?.(0, 20) ?? [];
};

async function Page(): Promise<React.ReactElement> {
  await getTabBar();
  await getIndexList();

  return (
    <div className={styles.page}>
      <Header />
      <TabBar list={props.tabbar} />
      <Home list={props.list} />
    </div>
  );
}

export default Page;
