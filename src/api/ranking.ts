import axios from '@/utils/axios';
import type { AxiosPromise } from 'axios';

/**
 * @description 排行榜 - 分类
 */
export const rankNav = (): AxiosPromise => {
  return axios.request({
    url: '/ranking/nav',
    method: 'get'
  });
};

/**
 * @description 排行榜 - 分类列表
 * @param { Object } params
 * @param { string } params.rid - 分类id
 */
export const rankRegion = ({ rid }: { rid: string }): AxiosPromise => {
  const params = { rid };

  return axios.request({
    url: '/ranking/region',
    method: 'get',
    params
  });
};
