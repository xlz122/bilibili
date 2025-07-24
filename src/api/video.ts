import axios from '@/utils/axios';
import type { AxiosPromise } from 'axios';

/**
 * @description 视频详情
 * @param { Object } params
 * @param { string } params.aid - 视频id
 */
export const videoDetail = ({ aid }: { aid: string }): AxiosPromise => {
  const params = { aid };

  return axios.request({
    url: '/video/detail',
    method: 'get',
    params
  });
};

type VideoPlayurl = {
  aid: string;
  cid: number | undefined;
};

/**
 * @description 视频详情 - 播放链接
 * @param { Object } params
 * @param { string } params.aid - 视频id
 * @param { number | undefined } params.cid - 来自视频详情
 */
export const videoPlayurl = ({ aid, cid }: VideoPlayurl): AxiosPromise => {
  const params = { aid, cid };

  return axios.request({
    url: '/video/playurl',
    method: 'get',
    params
  });
};

/**
 * @description 视频详情 - 相关推荐
 * @param { Object } params
 * @param { string } params.aid - 视频id
 */
export const videoRecommend = ({ aid }: { aid: string }): AxiosPromise => {
  const params = { aid };

  return axios.request({
    url: '/video/recommend',
    method: 'get',
    params
  });
};

type VideoComment = {
  aid: string;
  page: number;
};

/**
 * @description 视频详情 - 评论
 * @param { Object } params
 * @param { string } params.aid - 视频id
 * @param { number } params.page - 页数
 */
export const videoComment = ({ aid, page }: VideoComment): AxiosPromise => {
  const params = { aid, page };

  return axios.request({
    url: '/video/comment',
    method: 'get',
    params
  });
};
