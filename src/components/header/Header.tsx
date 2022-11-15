import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Logo from '@/components/header/logo/Logo';
import Avatar from '@/components/header/avatar/Avatar';
import styles from './header.module.scss';

function Header(): React.ReactElement {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <Link className={styles.logo} href="/">
        <Logo />
      </Link>
      <div className={styles.other}>
        <div
          className={styles.search}
          onClick={() => router.push({ pathname: '/search' })}
        >
          <i className="icon-search" />
        </div>
        <div
          className={styles.avatar}
          onClick={() => router.push({ pathname: '/space' })}
        >
          <Avatar />
        </div>
      </div>
    </div>
  );
}

export default Header;
