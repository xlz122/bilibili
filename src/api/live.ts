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

type LiveInfo = BaseParams & {
  roomid: number;
};

/**
 * @description 直播 - 房间信息
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { Number } roomid - 直播ID
 */
export const liveInfo = ({ baseUrl, roomid }: LiveInfo): AxiosPromise => {
  const params = { roomid };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/live/info`,
    method: 'get',
    params
  });
};
