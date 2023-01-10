import React, { useState } from 'react';
import Image from 'next/image';
import styles from './detail.module.scss';

function SearchDetail(): React.ReactElement {
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
      { title: '番剧', type: 'media_ft' },
      { title: 'UP主', type: 'media_bangumi' },
      { title: '影视', type: 'bili_user' }
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
    </div>
  );
}

export default SearchDetail;
