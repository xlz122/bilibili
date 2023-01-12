import axios from '@utils/axios';
import type { AxiosPromise } from 'axios';

type BaseParams = { baseUrl?: string };

type VideoDetail = BaseParams & {
  aid: number;
};

/**
 * @description 视频详情
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { Number } aid - 视频id
 */
export const videoDetail = ({ baseUrl, aid }: VideoDetail): AxiosPromise => {
  const params = { aid };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/video/detail`,
    method: 'get',
    params
  });
};

type VideoPlayurl = BaseParams & {
  aid: number;
  cid: number;
};

/**
 * @description 视频详情 - 播放链接
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { Number } aid - 视频id
 * @param { Number } cid - 视频详情获取
 */
export const videoPlayurl = ({
  baseUrl,
  aid,
  cid
}: VideoPlayurl): AxiosPromise => {
  const params = { aid, cid };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/video/playurl`,
    method: 'get',
    params
  });
};

type VideoRecommend = BaseParams & {
  aid: number;
};

/**
 * @description 视频详情 - 相关推荐
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { Number } aid - 视频id
 */
export const videoRecommend = ({
  baseUrl,
  aid
}: VideoRecommend): AxiosPromise => {
  const params = { aid };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/video/recommend`,
    method: 'get',
    params
  });
};

type VideoComment = BaseParams & {
  aid: number;
  page: number;
};

/**
 * @description 视频详情 - 评论
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { Number } aid - 视频id
 * @param { Number } page - 页数
 */
export const videoComment = ({
  baseUrl,
  aid,
  page
}: VideoComment): AxiosPromise => {
  const params = { aid, page };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/video/comment`,
    method: 'get',
    params
  });
};
