import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { searchType } from '@/api/search';
import type { ResponseType } from '@/types';
import type { VideoItemType } from './video/Video';
import type { FanjuItemType } from './fanju/Fanju';
import type { UpItemType } from './up/Up';
import type { MovieItemType } from './movie/Movie';
import Video from './video/Video';
import Fanju from './fanju/Fanju';
import Up from './up/Up';
import Movie from './movie/Movie';
import styles from './detail.module.scss';

type Detail = {
  video: { result: VideoItemType[] };
  fanju: { result: FanjuItemType[] };
  up: { result: UpItemType[] };
  movie: { result: MovieItemType[] };
};

function SearchDetail(): React.ReactElement {
  const keyword = useSearchParams().get('keyword') ?? '';

  const [tab, setTab] = useState({
    list: [
      {
        title: '综合',
        type: 'video',
        children: [
          { title: '默认排序', type: 'totalrank' },
          { title: '播放多', type: 'click' },
          { title: '新发布', type: 'pubdate' },
          { title: '弹幕多', type: 'dm' },
        ],
      },
      { title: '番剧', type: 'media_bangumi' },
      { title: 'UP主', type: 'bili_user' },
      { title: '影视', type: 'media_ft' },
    ],
    type: 'video',
    typeIndex: 0,
    order: 'totalrank',
    orderIndex: 0,
  });

  const handleTabChange = (type: string, index: number) => {
    setTab({ ...tab, type, typeIndex: index, order: 'totalrank', orderIndex: 0 });
  };

  const handleOrderChange = (type: string, index: number) => {
    setTab({ ...tab, order: type, orderIndex: index });
  };

  const [detail, setDetail] = useState<Partial<Detail>>({});
  const [empty, setEmpty] = useState(false);

  // 获取搜索详情
  const getSearchDetail = async () => {
    const res: ResponseType = await searchType({
      keyword: keyword,
      search_type: tab.type,
      order: tab.order,
      page: 1,
      size: 10,
    });
    if (res?.code !== 0) {
      return;
    }
    if (!res.data?.result || res.data?.result?.length === 0) {
      setEmpty(true);
      return;
    }

    // 综合
    if (tab.type === 'video') {
      setDetail({ video: res.data ?? {} });
    }
    // 番剧
    if (tab.type === 'media_bangumi') {
      setDetail({ fanju: res.data ?? {} });
    }
    // up
    if (tab.type === 'bili_user') {
      setDetail({ up: res.data ?? {} });
    }
    // 影视
    if (tab.type === 'media_ft') {
      setDetail({ movie: res.data ?? {} });
    }
    setEmpty(false);
  };

  useEffect(() => {
    getSearchDetail();
  }, [tab.type, tab.order]);

  return (
    <div className={styles.searchDetail}>
      <ul className={styles.tab}>
        {tab.list?.map?.((item, index) => {
          return (
            <li
              className={`${tab.typeIndex === index ? styles.tabActiveItem : styles.tabItem}`}
              key={index}
              onClick={() => handleTabChange(item.type, index)}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
      <ul className={styles.orderTab}>
        {tab.list?.[tab.typeIndex]?.children?.map?.((item, index) => {
          return (
            <li
              className={`${tab.orderIndex === index ? styles.orderActiveItem : styles.orderItem}`}
              key={index}
              onClick={() => handleOrderChange(item.type, index)}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
      {tab.type === 'video' && <Video list={detail.video?.result ?? []} />}
      {tab.type === 'media_bangumi' && <Fanju list={detail.fanju?.result ?? []} />}
      {tab.type === 'bili_user' && <Up list={detail.up?.result ?? []} />}
      {tab.type === 'media_ft' && <Movie list={detail.movie?.result ?? []} />}
      {empty && (
        <div className={styles.emity}>
          <div className={styles.emityIcon}>
            <Image src="/images/search/emity.png" fill priority sizes="50%" alt="" />
          </div>
          <p className={styles.emityText}>什么都没有找到啊 T_T</p>
        </div>
      )}
    </div>
  );
}

export default SearchDetail;
