import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ranking, rankingRegion, rankingArchive } from '@api/home';
import type { ResponseType } from '@/types/index';
import type { TabChangeParams } from '@/components/tab-bar/TabBar';
import type { VideoItem } from '@/components/video-list/VideoList';
import TabBar from '@components/tab-bar/TabBar';
import Panel from '@components/panel/Panel';
import VideoList from '@components/video-list/VideoList';

function Index(): React.ReactElement {
  const router = useRouter();

  const [tab, setTab] = useState<TabChangeParams>({
    index: 0,
    subIndex: 0,
    rid: 0
  });

  const tabChange = ({ index, subIndex, rid }: TabChangeParams): void => {
    setTab({ index, subIndex, rid });
  };

  const [list, setList] = useState<{ [key: string]: VideoItem[] }>({
    index: [],
    region: [],
    archive: []
  });

  // 首页列表
  const getRanking = () => {
    ranking({})
      .then((res: ResponseType<{ list: VideoItem[] }>) => {
        if (res?.code === 0) {
          if (!res.data?.list) {
            return false;
          }

          setList({ ...list, index: res?.data?.list });
        }
      })
      .catch(() => ({}));
  };

  // 热门推荐列表
  const getRankingRegion = () => {
    rankingRegion({
      rid: tab.rid,
      day: 7
    })
      .then((res: ResponseType<VideoItem[]>) => {
        if (res?.code === 0) {
          if (!res.data) {
            return false;
          }

          setList(state => {
            return { ...state, region: res?.data?.slice(0, 4) || [] };
          });
        }
      })
      .catch(() => ({}));
  };

  // 最新视频列表
  const getRankingArchive = () => {
    rankingArchive({
      tid: tab.rid,
      page: 1
    })
      .then((res: ResponseType<{ archives: VideoItem[] }>) => {
        if (res?.code === 0) {
          if (!res.data?.archives) {
            return false;
          }

          setList(state => ({ ...state, archive: res?.data?.archives || [] }));
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    if (tab.rid === 0) {
      getRanking();
      return;
    }

    // -1为直播
    if (tab.rid === -1) {
      router.push({ pathname: '/live' });
      return;
    }

    getRankingRegion();
    getRankingArchive();
  }, [tab.rid]);

  return (
    <>
      <TabBar index={tab.index} subIndex={tab.subIndex} tabChange={tabChange} />
      {/* 首页 */}
      {tab.index === 0 && <VideoList list={list.index} />}
      {/* 分类 - 推荐 */}
      {tab.index !== 0 && tab.subIndex === 0 && (
        <Panel title="热门推荐" leftIcon subTitle="排行榜" moreColor="#ffa726">
          <VideoList list={list.region} />
        </Panel>
      )}
      {tab.index !== 0 && tab.subIndex === 0 && (
        <Panel title="最新视频" subTitle="查看更多" moreColor="#999">
          <VideoList list={list.archive} />
        </Panel>
      )}
      {/* 分类 - 其余子项 */}
      {tab.index !== 0 && tab.subIndex !== 0 && (
        <Panel title="热门推荐">
          <VideoList list={list.region} />
        </Panel>
      )}
      {tab.index !== 0 && tab.subIndex !== 0 && (
        <Panel title="最新视频">
          <VideoList list={list.archive} />
        </Panel>
      )}
    </>
  );
}

export default Index;
