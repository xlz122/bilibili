import React from 'react';
import TabBar from './tab-bar/TabBar';
import LiveDetail from './live-detail/LiveDetail';
import styles from './live.module.scss';

function Live(): React.ReactElement {
  return (
    <div className={styles.page}>
      <TabBar />
      <LiveDetail />
    </div>
  );
}

Live.getLayout = function getLayout(page: React.ReactElement) {
  return page;
};

export default Live;
