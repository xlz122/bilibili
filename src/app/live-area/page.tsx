import React from 'react';
import { liveArea } from '@/api/live';
import type { ResponseType } from '@/types';
import Header from '@/app/live/header/Header';
import LiveArea from './LiveArea';
import styles from './page.module.scss';

const props = {
  list: []
};

const getLiveArea = async (): Promise<void> => {
  const { code, data }: ResponseType = await liveArea();
  if (code !== 0) {
    return;
  }

  props.list = data ?? [];
};

async function Page(): Promise<React.ReactElement> {
  await getLiveArea();

  return (
    <div className={styles.page}>
      <Header />
      <LiveArea list={props.list} />
    </div>
  );
}

export default Page;
