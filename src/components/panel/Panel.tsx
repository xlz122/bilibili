import React from 'react';
import styles from './panel.module.scss';

type Props = {
  title?: string;
  subTitle?: string;
  leftIcon?: boolean;
  moreColor?: string;
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
            color: props.moreColor
          }}
        >
          <i
            className={`icon-ranking ${styles.leftIcon}`}
            style={{ visibility: props.leftIcon ? 'visible' : 'hidden' }}
          ></i>
          <div className={styles.moreText}>{props.subTitle}</div>
          <i
            className={`icon-arrow-right ${styles.rightIcon}`}
            style={{ color: props.moreColor }}
          ></i>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default Panel;
