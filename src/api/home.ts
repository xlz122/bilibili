import axios from '@utils/axios';
import type { AxiosPromise } from 'axios';

type BaseParams = { baseUrl?: string };

/**
 * @description 分类导航
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 */
export const partitions = ({ baseUrl }: BaseParams): AxiosPromise => {
  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/partitions`,
    method: 'get'
  });
};

type Index = BaseParams & {
  page: number;
};

/**
 * @description 首页列表
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { Number } page - 页数
 */
export const indexList = ({ baseUrl, page }: Index): AxiosPromise => {
  const params = { page };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/index`,
    method: 'get',
    params
  });
};

type IndexRegion = BaseParams & {
  rid: number;
  day: number;
};

/**
 * @description 分类 - 热门推荐列表
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { Number } rid - 分类id
 * @param { Number } day - 天数
 */
export const indexRegion = ({
  baseUrl,
  rid,
  day
}: IndexRegion): AxiosPromise => {
  const params = { rid, day };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/index/region`,
    method: 'get',
    params
  });
};

type IndexArchive = BaseParams & {
  tid: number;
  page: number;
};

/**
 * @description 分类 - 最新视频列表
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { Number } tid - 分类id
 * @param { Number } page - 页数
 */
export const indexArchive = ({
  baseUrl,
  tid,
  page
}: IndexArchive): AxiosPromise => {
  const params = { tid, page };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/index/archive`,
    method: 'get',
    params
  });
};
