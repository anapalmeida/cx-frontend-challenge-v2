import React, { ReactNode } from 'react';

import Header from '@/components/Header';
import styles from '@/styles/Layout.module.scss';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <Header />
      <main className={styles.container}>{children}</main>
    </>
  );
}
