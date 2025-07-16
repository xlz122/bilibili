import axios from '@/utils/axios';
import type { AxiosPromise } from 'axios';

/**
 * @description 首页 - 列表
 * @param { Object } params
 * @param { number } params.page - 页数
 */
export const indexList = ({ page }: { page: number }): AxiosPromise => {
  const params = { page };

  return axios.request({
    url: '/index',
    method: 'get',
    params
  });
};

/**
 * @description 分类
 */
export const partitions = (): AxiosPromise => {
  return axios.request({
    url: '/partitions',
    method: 'get'
  });
};

type IndexRegion = {
  rid: string;
  day: number;
};

/**
 * @description 分类 - 热门推荐
 * @param { Object } params
 * @param { string } params.rid - 分类id
 * @param { number } params.day - 天数
 */
export const indexRegion = ({ rid, day }: IndexRegion): AxiosPromise => {
  const params = { rid, day };

  return axios.request({
    url: '/index/region',
    method: 'get',
    params
  });
};

type IndexArchive = {
  rid: string;
  page: number;
};

/**
 * @description 分类 - 最新视频
 * @param { Object } params
 * @param { string } params.rid - 分类id
 * @param { number } params.page - 页数
 */
export const indexArchive = ({ rid, page }: IndexArchive): AxiosPromise => {
  const params = { rid, page };

  return axios.request({
    url: '/index/archive',
    method: 'get',
    params
  });
};
