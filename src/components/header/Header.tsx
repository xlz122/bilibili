import React from 'react';
import Link from 'next/link';
import Logo from './logo/Logo';
import Avatar from './avatar/Avatar';
import styles from './header.module.scss';

function Header(): React.ReactElement {
  return (
    <div className={styles.header}>
      <Link className={styles.logo} href="/">
        <Logo />
      </Link>
      <div className={styles.other}>
        <Link className={styles.search} href="/search">
          <i className="icon-search" />
        </Link>
        <Link className={styles.avatar} href="/space">
          <Avatar />
        </Link>
      </div>
    </div>
  );
}

export default Header;
