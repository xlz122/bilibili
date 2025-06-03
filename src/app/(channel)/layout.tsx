import { partitions } from '@/api/home';
import type { ResponseType } from '@/types';
import Header from '@/components/header/Header';
import TabBar from '@/app/home/tab-bar/TabBar';
import styles from './layout.module.scss';

const props = {
  tabbar: []
};

const getTabBar = async (): Promise<void> => {
  const { code, data }: ResponseType = await partitions();
  if (code !== 0) {
    return;
  }

  props.tabbar = data ?? [];
};

async function Layout({ children }: { children: React.ReactNode }) {
  await getTabBar();

  return (
    <div className={styles.layout}>
      <Header />
      <TabBar list={props.tabbar} />
      {children}
    </div>
  );
}

export default Layout;
