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

type SearchType = BaseParams & {
  keyword: string;
  search_type: string;
  order?: string;
  page: number;
  size: number;
};

/**
 * @description 搜索详情
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { String } keyword - 搜索关键词
 * @param { String } search_type - 搜索类型(综合/番剧/UP主/影视)
 * @param { String } order - 排序方式(默认排序/播放多/新发布/弹幕多)
 * @param { Number } page - 页数
 * @param { Number } size - 条数
 */
export const searchType = ({
  baseUrl,
  keyword,
  search_type,
  order,
  page,
  size
}: SearchType): AxiosPromise => {
  const params = { keyword, search_type, order, page, size };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/search/type`,
    method: 'get',
    params
  });
};
