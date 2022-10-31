import React from 'react';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';

type Props = {
  children: React.ReactNode;
};

function Layout(props: Props): React.ReactElement {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}

export default Layout;
