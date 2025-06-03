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
  list: {
    pic: string;
    link: string;
  }[];
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
                <Image src={item.pic} fill sizes="50%" priority alt="" />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style jsx global>
        {`
          .swiper-pagination {
            left: inherit !important;
            right: 5px;
            bottom: 5px !important;
            text-align: right;
          }

          .swiper-pagination-bullet {
            width: 6px !important;
            height: 6px !important;
            margin-inline: 2px !important;
            background-color: #ffffff;
            opacity: 1;
          }

          .swiper-pagination-bullet-active {
            background-color: #fb7299;
          }
        `}
      </style>
    </div>
  );
}

export default LiveBanner;
