import React from 'react';
import styles from './panel.module.scss';

type Props = {
  title?: string;
  subTitle?: string;
  subIcon?: boolean;
  subColor?: string;
  children?: React.ReactNode;
};

function Panel(props: Props): React.ReactElement {
  return (
    <div className={styles.panel}>
      <div className={styles.title}>
        <div className={styles.titleText}>{props.title}</div>
        <div
          className={styles.more}
          style={{
            visibility: props.subTitle ? 'visible' : 'hidden',
            color: props.subColor
          }}
        >
          <i
            className={`icon-ranking ${styles.subIcon}`}
            style={{ visibility: props.subIcon ? 'visible' : 'hidden' }}
          ></i>
          <div className={styles.moreText}>{props.subTitle}</div>
          <i
            className={`icon-arrow-right ${styles.moreIcon}`}
            style={{ color: props.subColor }}
          ></i>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default Panel;
