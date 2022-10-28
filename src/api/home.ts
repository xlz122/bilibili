import axios from '@utils/axios';
import type { AxiosPromise } from 'axios';

type BaseParams = { baseUrl?: string };

/**
 * @description 导航分类
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 */
export const partitions = ({ baseUrl }: BaseParams): AxiosPromise => {
  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/partitions`,
    method: 'get'
  });
};

/**
 * @description 首页列表
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 */
export const ranking = ({ baseUrl }: BaseParams): AxiosPromise => {
  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/ranking`,
    method: 'get'
  });
};

type RankingRegion = BaseParams & {
  rid: number;
  day: number;
};

/**
 * @description 分类 - 热门推荐列表
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { String } rid - 分类id
 * @param { String } day - 天数
 */
export const rankingRegion = ({
  baseUrl,
  rid,
  day
}: RankingRegion): AxiosPromise => {
  const params = { rid, day };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/ranking/region`,
    method: 'get',
    params
  });
};

type RankingArchive = BaseParams & {
  tid: number;
  page: number;
};

/**
 * @description 分类 - 最新视频列表
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { String } tid - 分类id
 * @param { String } page - 页数
 */
export const rankingArchive = ({
  baseUrl,
  tid,
  page
}: RankingArchive): AxiosPromise => {
  const params = { tid, page };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/ranking/archive`,
    method: 'get',
    params
  });
};
