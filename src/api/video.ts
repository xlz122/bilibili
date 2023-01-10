import axios from '@utils/axios';
import type { AxiosPromise } from 'axios';

type BaseParams = { baseUrl?: string };

type VideoDetail = BaseParams & {
  aid: number;
};

/**
 * @description 直播首页
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { Number } aid - 视频id
 */
export const videoDetail = ({ baseUrl, aid }: VideoDetail): AxiosPromise => {
  const params = { aid };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/video/detail`,
    method: 'get',
    params
  });
};
