import axios from '@/utils/axios';
import type { AxiosPromise } from 'axios';

type BaseParams = { baseUrl?: string };

/**
 * @description 分类导航
 * @param { Object } params
 * @param { string } [params.baseUrl] - 接口基础url(服务端渲染)
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
 * @param { Object } params
 * @param { string } [params.baseUrl] - 接口基础url(服务端渲染)
 * @param { number } params.page - 页数
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
 * @param { Object } params
 * @param { string } [params.baseUrl] - 接口基础url(服务端渲染)
 * @param { number } params.rid - 分类id
 * @param { number } params.day - 天数
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
  rid: number;
  page: number;
};

/**
 * @description 分类 - 最新视频列表
 * @param { Object } params
 * @param { string } [params.baseUrl] - 接口基础url(服务端渲染)
 * @param { number } params.rid - 分类id
 * @param { number } params.page - 页数
 */
export const indexArchive = ({
  baseUrl,
  rid,
  page
}: IndexArchive): AxiosPromise => {
  const params = { rid, page };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/index/archive`,
    method: 'get',
    params
  });
};
