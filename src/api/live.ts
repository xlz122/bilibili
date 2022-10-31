import axios from '@utils/axios';
import type { AxiosPromise } from 'axios';

type BaseParams = { baseUrl?: string };

/**
 * @description 直播首页
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 */
export const liveIndex = ({ baseUrl }: BaseParams): AxiosPromise => {
  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/live/index`,
    method: 'get'
  });
};
