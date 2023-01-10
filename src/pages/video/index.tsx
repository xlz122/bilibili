import React from 'react';
import Image from 'next/image';
import { timeStampToDuration, formatTenThousand } from '@utils/utils';
import { formatDateTime } from '@utils/date';
import { videoDetail } from '@/api/video';
import type { GetServerSidePropsContext } from 'next';
import type { ResponseType } from '@/types';
import Layout from '@components/layout/Layout';
import VideoRecommend from '@/page-component/video/recommend/Recommend';
import VideoComment from '@/page-component/video/comment/Comment';
import styles from './video.module.scss';

type Props = {
  data: {
    pic: string;
    stat: {
      view: number;
      danmaku: number;
    };
    ctime: number;
    duration: number;
    dynamic: string;
    owner: {
      face: string;
      name: string;
    };
  };
};

function Video(props: Props): React.ReactElement {
  return (
    <div className={styles.video}>
      <div className={styles.cover}>
        <Image src={props.data.pic} fill sizes="100%" priority alt="" />
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
          <span className={styles.tipText}>
            {formatTenThousand(props.data.stat.view)}万观看
          </span>
          <span className={styles.tipText}>{props.data.stat.danmaku}弹幕</span>
          <span className={styles.tipText}>
            {formatDateTime(props.data?.ctime, 'MM-dd')}
          </span>
          <span className={styles.tipTime}>
            {timeStampToDuration(props.data.duration)}
          </span>
        </div>
      </div>
      <div className={styles.title}>
        <span className={styles.titleHot}>热门</span>
        <span className={styles.titleText}>{props.data.dynamic}</span>
        <div className={styles.author}>
          <div className={styles.authorInfo}>
            <div className={styles.infoCover}>
              <Image
                src={props.data.owner.face}
                fill
                sizes="100%"
                priority
                alt=""
              />
            </div>
            <span className={styles.infoText}>{props.data.owner.name}</span>
          </div>
          <div className={styles.authorOther}>
            <i className={styles.iconLike}></i>
            <i className={styles.iconCollection}></i>
            <i className={styles.iconShare}></i>
          </div>
        </div>
      </div>
      <div className={styles.relevant}>
        <VideoRecommend />
      </div>
      <div className={styles.comment}>
        <VideoComment />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res: ResponseType<Props> = await videoDetail({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    aid: Number(context.query.aid)
  });

  const props = {
    data: {}
  };

  if (res?.code === 0) {
    props.data = res.data || {};
  }

  return {
    props
  };
}

Video.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Video;
