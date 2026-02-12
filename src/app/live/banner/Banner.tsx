'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './banner.module.scss';

type Props = {
  list: { pic: string; link: string }[];
};

function LiveBanner(props: Props): React.ReactElement {
  return (
    <div className={styles.liveBanner}>
      <Swiper
        className={styles.swiper}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {props.list?.map?.((item, index) => {
          if (!item.pic) return null;

          return (
            <SwiperSlide key={index}>
              <Link href={item.link}>
                <Image src={item.pic} fill priority sizes="50%" alt="" />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style jsx global>
        {`
          .swiper-pagination {
            left: inherit !important;
            right: 10px;
            bottom: 10px !important;
            text-align: right;
          }

          .swiper-pagination-bullet {
            width: 12px !important;
            height: 12px !important;
            margin-inline: 4px !important;
            background-color: #FFFFFF;
            opacity: 1;
          }

          .swiper-pagination-bullet-active {
            background-color: #FB7299;
          }
        `}
      </style>
    </div>
  );
}

export default LiveBanner;
