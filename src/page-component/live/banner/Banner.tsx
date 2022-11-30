import React from 'react';
import Image from 'next/image';
import styles from './banner.module.scss';

type Props = {
  banner: BannerType;
};

export type BannerType = {
  module_info?: {
    title: string;
  };
  list?: {
    pic: string;
  }[];
};

function LiveBanner(props: Props): React.ReactElement {
  return (
    <div className={styles.liveBanner}>
      <Image
        src={(props?.banner?.list && props?.banner?.list[0]?.pic) || ''}
        fill
        sizes="100%"
        priority
        alt=""
      />
    </div>
  );
}

export default LiveBanner;
