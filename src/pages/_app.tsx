import { useEffect } from 'react';
import store from '@/store/index';
import { Provider } from 'react-redux';
import adapter from '@/utils/adapter';
import type { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import Layout from '@components/layout/Layout';
import '@/styles/global.css';
import '@/styles/font.css';
import '@/styles/not-found.scss';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  // 字体适配
  useEffect(() => {
    adapter();
    window.addEventListener('resize', adapter);

    return () => {
      window.removeEventListener('resize', adapter);
    };
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
