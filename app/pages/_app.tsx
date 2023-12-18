import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import React from 'react';
import RootLayout from './layout';
import SEO from '@/components/SEO';
import store from '@/storage/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO />
      <Provider store={store}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </Provider>
    </>
  );
}
