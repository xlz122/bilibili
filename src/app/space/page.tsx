import React from 'react';
import Header from '@/components/header/Header';
import Space from './Space';
import styles from './page.module.scss';

async function Page(): Promise<React.ReactElement> {
  return (
    <div className={styles.page}>
      <Header />
      <Space />
    </div>
  );
}

export default Page;
