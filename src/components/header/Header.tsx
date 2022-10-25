import type { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Logo from '@/components/header/logo/Logo';
import Avatar from '@/components/header/avatar/Avatar';
import styles from './header.module.scss';

function Header(): ReactElement {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.other}>
        <div
          className={styles.search}
          onClick={() => router.push({ pathname: '/search' })}
        >
          <i className="icon-search" />
        </div>
        <div className={styles.avatar}>
          <Avatar />
        </div>
      </div>
    </div>
  );
}

export default Header;
