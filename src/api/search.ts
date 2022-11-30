import axios from '@utils/axios';
import type { AxiosPromise } from 'axios';

type BaseParams = { baseUrl?: string };

/**
 * @description 默认搜索关键词
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 */
export const searchDefatult = ({ baseUrl }: BaseParams): AxiosPromise => {
  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/search/default`,
    method: 'get'
  });
};

/**
 * @description 热搜列表
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 */
export const searchHot = ({ baseUrl }: BaseParams): AxiosPromise => {
  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/search/hot`,
    method: 'get'
  });
};

type SearchSuggest = BaseParams & {
  keyword: string;
};

/**
 * @description 搜索建议
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { String } keyword - 搜索关键词
 */
export const searchSuggest = ({
  baseUrl,
  keyword
}: SearchSuggest): AxiosPromise => {
  const params = { keyword };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/search/suggest`,
    method: 'get',
    params
  });
};
