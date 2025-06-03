import axios from '@/utils/axios';
import type { AxiosPromise } from 'axios';

/**
 * @description 搜索 - 默认关键词
 */
export const searchDefault = (): AxiosPromise => {
  return axios.request({
    url: '/search/default',
    method: 'get'
  });
};

/**
 * @description 搜索 - 热搜
 */
export const searchHot = (): AxiosPromise => {
  return axios.request({
    url: '/search/hot',
    method: 'get'
  });
};

/**
 * @description 搜索 - 搜索建议
 * @param { Object } params
 * @param { string } params.keyword - 关键词
 */
export const searchSuggest = ({
  keyword
}: {
  keyword: string;
}): AxiosPromise => {
  const params = { keyword };

  return axios.request({
    url: '/search/suggest',
    method: 'get',
    params
  });
};

type SearchType = {
  keyword: string;
  search_type: string;
  order: string;
  page: number;
  size: number;
};

/**
 * @description 搜索 - 搜索详情
 * @param { Object } params
 * @param { string } params.keyword - 搜索关键词
 * @param { string } params.search_type - 搜索类型(综合/番剧/UP主/影视)
 * @param { string } params.order - 排序方式(默认排序/播放多/新发布/弹幕多)
 * @param { number } params.page - 页数
 * @param { number } params.size - 条数
 */
export const searchType = ({
  keyword,
  search_type,
  order,
  page,
  size
}: SearchType): AxiosPromise => {
  const params = { keyword, search_type, order, page, size };

  return axios.request({
    url: '/search/type',
    method: 'get',
    params
  });
};
