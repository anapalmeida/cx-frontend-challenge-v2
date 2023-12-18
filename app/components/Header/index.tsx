import Navbar from '../Navbar';
import React from 'react';
import styles from '@/styles/components/Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header} aria-label='Main Navigation'>
      <Navbar />
    </header>
  );
}
