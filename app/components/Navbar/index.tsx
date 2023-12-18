import Image from 'next/image';
import React from 'react';
import SearchBar from '../SearchBar';
import { clearResults } from '@/storage/slices/apiResultsSlice';
import styles from '@/styles/components/Navbar.module.scss';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClearProducts = () => {
    router.push('/');
    dispatch(clearResults());
  };

  return (
    <nav className={styles.navbar}>
      <Image
        src='/images/logo_ml.png'
        alt='Logo Mercado Livre'
        width={40}
        height={30}
        onClick={handleClearProducts}
      />
      <SearchBar />
    </nav>
  );
}
