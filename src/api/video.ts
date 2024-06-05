import axios from '@/utils/axios';
import type { AxiosPromise } from 'axios';

type VideoDetail = {
  aid: string | number;
};

/**
 * @description 视频详情
 * @param { Object } params
 * @param { string | number } params.aid - 视频id
 */
export const videoDetail = ({ aid }: VideoDetail): AxiosPromise => {
  const params = { aid };

  return axios.request({
    url: '/video/detail',
    method: 'get',
    params
  });
};

type VideoPlayurl = {
  aid: string | number;
  cid: number | undefined;
};

/**
 * @description 视频详情 - 播放链接
 * @param { Object } params
 * @param { string | number } params.aid - 视频id
 * @param { number | undefined } params.cid - 视频详情获取
 */
export const videoPlayurl = ({ aid, cid }: VideoPlayurl): AxiosPromise => {
  const params = { aid, cid };

  return axios.request({
    url: '/video/playurl',
    method: 'get',
    params
  });
};

type VideoRecommend = {
  aid: string | number;
};

/**
 * @description 视频详情 - 相关推荐
 * @param { Object } params
 * @param { string | number } params.aid - 视频id
 */
export const videoRecommend = ({ aid }: VideoRecommend): AxiosPromise => {
  const params = { aid };

  return axios.request({
    url: '/video/recommend',
    method: 'get',
    params
  });
};

type VideoComment = {
  aid: string | number;
  page: number;
};

/**
 * @description 视频详情 - 评论
 * @param { Object } params
 * @param { string | number } params.aid - 视频id
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
