import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '@components/layout/Layout';
import styles from './video.module.scss';

function Video(): React.ReactElement {
  const router = useRouter();

  const { aid } = router.query;
  console.log(aid);

  return (
    <div className={styles.video}>
      <div className={styles.cover}>
        <Image
          src={'https://i2.hdslb.com/bfs/archive/3ff7edd0ed71384040615ca35d6ee74fc04a4a88.jpg@480w_270h_1c'}
          fill
          sizes="100%"
          priority
          alt=""
        />
        <div className={styles.coverIconPlay}>
          <Image
            src={'/images/video/icon-play.png'}
            fill
            sizes="100%"
            priority
            alt=""
          />
        </div>
        <div className={styles.coverTip}>
          <span className={styles.tipText}>242.8万观看</span>
          <span className={styles.tipText}>4007弹幕</span>
          <span className={styles.tipText}>01-04</span>
          <span className={styles.tipTime}>04:19</span>
        </div>
      </div>
    </div>
  );
}

Video.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Video;
