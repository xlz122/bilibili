import axios from '@/utils/axios';
import type { AxiosPromise } from 'axios';

/**
 * @description 直播 - 首页
 */
export const liveIndex = (): AxiosPromise => {
  return axios.request({
    url: '/live/index',
    method: 'get'
  });
};

/**
 * @description 直播 - 分类
 */
export const liveArea = (): AxiosPromise => {
  return axios.request({
    url: '/live/area',
    method: 'get'
  });
};

type LiveAreaList = {
  parent_area_id: string;
  area_id: number;
  page: number;
  size: number;
};

/**
 * @description 直播 - 分类列表
 * @param { Object } params
 * @param { string } params.parent_area_id - 分类id
 * @param { number } params.area_id - 默认传0
 * @param { number } params.page - 页数
 * @param { number } params.size - 条数
 */
export const liveAreaList = ({
  parent_area_id,
  area_id,
  page,
  size
}: LiveAreaList): AxiosPromise => {
  const params = { parent_area_id, area_id, page, size };

  return axios.request({
    url: '/live/area/list',
    method: 'get',
    params
  });
};

/**
 * @description 直播 - 房间信息
 * @param { Object } params
 * @param { string } params.roomid - 直播间id
 */
export const liveInfo = ({ roomid }: { roomid: string }): AxiosPromise => {
  const params = { roomid };

  return axios.request({
    url: '/live/info',
    method: 'get',
    params
  });
};
