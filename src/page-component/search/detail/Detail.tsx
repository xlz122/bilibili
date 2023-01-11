import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
  video: {
    result: VideoItemType[];
  };
  fanju: {
    result: FanjuItemType[];
  };
  up: {
    result: UpItemType[];
  };
  movie: {
    result: MovieItemType[];
  };
};

function SearchDetail(): React.ReactElement {
  const router = useRouter();

  const [tab, setTab] = useState({
    list: [
      {
        title: '综合',
        type: 'video',
        children: [
          { title: '默认排序', type: 'totalrank' },
          { title: '播放多', type: 'click' },
          { title: '新发布', type: 'pubdate' },
          { title: '弹幕多', type: 'dm' }
        ]
      },
      { title: '番剧', type: 'media_bangumi' },
      { title: 'UP主', type: 'bili_user' },
      { title: '影视', type: 'media_ft' }
    ],
    index: 0,
    orderIndex: 0,
    type: 'video',
    order: 'totalrank'
  });

  const tabChange = (index: number, type: string): void => {
    setTab({ ...tab, type, index, orderIndex: 0, order: 'totalrank' });
  };

  const orderChange = (index: number, type: string): void => {
    setTab({ ...tab, order: type, orderIndex: index });
  };

  const [detail, setDetail] = useState<Partial<Detail>>({});
  const [noData, setNoData] = useState(false);

  // 获取搜索详情
  const getSearchDetail = () => {
    setNoData(false);

    searchType({
      keyword: String(router.query.keyword),
      search_type: tab.type,
      order: tab.order,
      page: 1,
      size: 10
    })
      .then((res: ResponseType) => {
        if (res.code === 0) {
          // 无数据
          if (!res.data.result || res.data.result.length === 0) {
            setNoData(true);
          }

          // 综合
          if (tab.type === 'video') {
            setDetail({ video: res.data });
          }
          // 番剧
          if (tab.type === 'media_bangumi') {
            setDetail({ fanju: res.data });
          }
          // up
          if (tab.type === 'bili_user') {
            setDetail({ up: res.data });
          }
          // 影视
          if (tab.type === 'media_ft') {
            setDetail({ movie: res.data });
          }
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getSearchDetail();
  }, [tab.type, tab.order]);

  return (
    <div className={styles.searchDetail}>
      <ul className={styles.tab}>
        {tab?.list?.map((item, index) => {
          return (
            <li
              className={`${styles.tabItem} ${
                tab.index === index ? styles.tabActiveItem : ''
              }`}
              key={index}
              onClick={() => tabChange(index, item.type)}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
      <ul className={styles.orderTab}>
        {tab?.list[tab.index]?.children?.map((item, index) => {
          return (
            <li
              className={`${styles.orderItem} ${
                tab.orderIndex === index ? styles.orderActiveItem : ''
              }`}
              key={index}
              onClick={() => orderChange(index, item.type)}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
      {tab.type === 'video' && <Video list={detail.video?.result || []} />}
      {tab.type === 'media_bangumi' && (
        <Fanju list={detail.fanju?.result || []} />
      )}
      {tab.type === 'bili_user' && <Up list={detail.up?.result || []} />}
      {tab.type === 'media_ft' && <Movie list={detail.movie?.result || []} />}
      {noData && (
        <div className={styles.notFound}>
          <Image
            className={styles.notFoundImage}
            width={239}
            height={149}
            src={'/images/search/not-found.png'}
            alt=""
          />
          <p className={styles.notFoundText}>什么都没有找到啊 T_T</p>
        </div>
      )}
    </div>
  );
}

export default SearchDetail;
