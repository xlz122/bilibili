import React from 'react';
import Image from 'next/image';
import styles from './panel.module.scss';

type Props = {
  title?: string;
  subTitle?: string;
  onMore: () => void;
  children?: React.ReactNode;
};

function Panel(props: Props): React.ReactElement {
  return (
    <div className={styles.panel}>
      <div className={styles.title}>
        <div className={styles.titleText}>{props.title}</div>
        <div
          className={styles.more}
          onClick={props.onMore}
          style={{ visibility: props.subTitle ? 'visible' : 'hidden' }}
        >
          <div className={styles.moreText}>{props.subTitle}</div>
          <Image
            className={styles.moreIcon}
            width={16}
            height={16}
            src={'/images/live/live-right-arrow.png'}
            alt=""
          />
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default Panel;
