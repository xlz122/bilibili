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

/**
 * @description 直播分类
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 */
export const liveArea = ({ baseUrl }: BaseParams): AxiosPromise => {
  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/live/area`,
    method: 'get'
  });
};

type LiveAreaList = BaseParams & {
  parent_area_id: number;
  area_id: number;
  page: number;
  size: number;
};

/**
 * @description 直播分类列表
 * @param { String } [baseUrl] - 接口基础url(服务端渲染)
 * @param { Number } parent_area_id - 分类id
 * @param { Number } area_id - 默认传0
 * @param { Number } page - 页数
 * @param { Number } size - 条数
 */
export const liveAreaList = ({
  baseUrl,
  parent_area_id,
  area_id,
  page,
  size
}: LiveAreaList): AxiosPromise => {
  const params = { parent_area_id, area_id, page, size };

  return axios.request({
    url: `${baseUrl ? baseUrl : '/api'}/live/area/list`,
    method: 'get',
    params
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
