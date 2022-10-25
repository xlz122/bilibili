import { useEffect } from 'react';
import { NextPage } from 'next';
import store from '@/store/index';
import { Provider } from 'react-redux';
import adapter from '@/utils/adapter';
import type { AppProps } from 'next/app';
import Layout from '@components/layout/Layout';
import '@/styles/global.css';
import '@/styles/font.css';
import '@/styles/not-found.scss';

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps
}: AppPropsWithLayout): React.ReactElement {
  // 字体适配
  useEffect(() => {
    adapter();
    window.addEventListener('resize', adapter);

    return () => {
      window.removeEventListener('resize', adapter);
    };
  }, []);

  // 渲染布局
  const RenderLayout = () => {
    if (Component.getLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  return (
    <Provider store={store}>
      <RenderLayout />
    </Provider>
  );
}

export default MyApp;
