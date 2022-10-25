import axios from '@utils/axios';
import type { AxiosPromise } from 'axios';

type BaseParams = { baseUrl?: string };

/**
 * @description 轮播图
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 */
export const banner = ({ baseUrl }: BaseParams): AxiosPromise => {
  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/round-sowing`,
    method: 'get'
  });
};

/**
 * @description 首页 - 分类
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 */
export const partitions = ({ baseUrl }: BaseParams): AxiosPromise => {
  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/partitions`,
    method: 'get'
  });
};

/**
 * @description 首页 - 列表
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 */
export const ranking = ({ baseUrl }: BaseParams): AxiosPromise => {
  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/ranking/0`,
    method: 'get'
  });
};

// type RankingRegion = {
//   rId: number;
//   day: number;
// } & BaseParams;

// /**
//  * @description 导航分类
//  * @param { String } [baseUrl] - 接口基础url(服务端渲染)
//  * @param { String } rId - 接口基础url(服务端渲染)
//  * @param { String } day - 天数
//  */
// export const rankingRegion = ({ baseUrl }: RankingRegion): AxiosPromise => {
//   return axios.request({
//     url: `${baseUrl ? baseUrl : '/api'}/ranking/region`,
//     method: 'get'
//   });
// };
