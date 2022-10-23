import axios from '@utils/axios';
import type { AxiosPromise } from 'axios';

type List = { baseUrl?: string };

/**
 * @description 轮播图
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 */
export const banner = ({ baseUrl }: List): AxiosPromise => {
  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/round-sowing`,
    method: 'get'
  });
};
