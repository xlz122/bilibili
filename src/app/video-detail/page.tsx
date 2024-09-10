import React from 'react';
import {
  videoDetail,
  videoPlayurl,
  videoRecommend,
  videoComment
} from '@/api/video';
import type { ResponseType } from '@/types/index';
import Header from '@/components/header/Header';
import VideoPlayer from './player/Player';
import VideoDetail from './VideoDetail';
import VideoRecommend from './recommend/Recommend';
import VideoComment from './comment/Comment';

const props = {
  detail: {
    cid: undefined
  },
  url: '',
  recommend: [],
  comment: {
    replies: [],
    count: 0
  }
};

const getVideoDetail = async ({ aid }: { aid: string }): Promise<void> => {
  const { code, data }: ResponseType = await videoDetail({ aid });
  if (code !== 0) {
    return;
  }

  props.detail = data ?? {};
};

const getVideoPlayurl = async ({ aid }: { aid: string }): Promise<void> => {
  const { code, data }: ResponseType = await videoPlayurl({
    aid,
    cid: props.detail.cid
  });
  if (code !== 0) {
    return;
  }

  props.url = data.durl?.[0]?.url ?? '';
};

const getVideoRecommend = async ({ aid }: { aid: string }): Promise<void> => {
  const { code, data }: ResponseType = await videoRecommend({ aid });
  if (code !== 0) {
    return;
  }

  props.recommend = data.slice?.(0, 4) ?? [];
};

const getVideoComment = async ({ aid }: { aid: string }): Promise<void> => {
  const { code, data }: ResponseType = await videoComment({ aid, page: 1 });
  if (code !== 0) {
    return;
  }

  props.comment.count = data.page?.count ?? 0;
  props.comment.replies = data.replies ?? [];
};

async function Page({ searchParams }: { searchParams: { aid: string } }) {
  await getVideoDetail({ aid: searchParams.aid });
  await getVideoPlayurl({ aid: searchParams.aid });
  await getVideoRecommend({ aid: searchParams.aid });
  await getVideoComment({ aid: searchParams.aid });

  return (
    <>
      <Header />
      <VideoPlayer url={props.url} detail={props.detail} />
      <VideoDetail detail={props.detail} />
      <VideoRecommend list={props.recommend} />
      <VideoComment list={props.comment.replies} count={props.comment.count} />
    </>
  );
}

export default Page;
