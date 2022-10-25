import React from 'react';
import styles from './panel.module.scss';

type Props = {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
};

function Panel(props: Props): React.ReactElement {
  return (
    <div className={styles.panel}>
      <div className={styles.title}>
        <div className={styles.titleText}>{props.title}</div>
        <div className={styles.more}>
          <i className={`icon-ranking ${styles.leftIcon}`}></i>
          <div className={styles.moreText}>{props.subTitle}</div>
          <i className={`icon-arrow-right ${styles.rightIcon}`}></i>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default Panel;
