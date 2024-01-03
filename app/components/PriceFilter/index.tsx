import React, { useState } from 'react';

import { FaFilter } from 'react-icons/fa';
import { IFilterValues } from '@/interfaces/Filters';
import { Montserrat } from '@next/font/google';
import PriceRange from './PriceRange';
import styles from '@/styles/components/PriceFilter.module.scss';
import useFetchPriceFilter from '@/hooks/useFetchPriceFilter';
import useFilterPrice from '@/hooks/usePriceFilter';

const montserratBold = Montserrat({ weight: '600', subsets: ['latin'] });
const montserrat = Montserrat({ weight: '500', subsets: ['latin'] });

export default function PriceFilter() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const priceFilter = useFilterPrice();
  const data = useFetchPriceFilter();

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <button className={styles.priceFilter__icon}>
        <button
          className={styles.collapseButton}
          onClick={handleCollapseToggle}
          aria-expanded={isCollapsed ? 'false' : 'true'}
          aria-controls='priceFilterList'
        >
          <FaFilter />
        </button>
      </button>
      <div
        className={`${styles.priceFilter} ${
          isCollapsed ? styles.priceFilter__collapsed : ''
        }`}
      >
        <h3
          className={`${styles.priceFilter__title} ${montserratBold.className}`}
        >
          {data?.name}
        </h3>
        <ul className={styles.priceFilter__list}>
          {data?.values.map((value: IFilterValues) => (
            <li key={value.id} className={styles.priceFilter__line}>
              <a
                onClick={() => priceFilter(value.id)}
                className={`${styles.priceFilter__price}  ${montserrat.className}`}
                aria-label={`${value.name}. ${value.results} results`}
              >
                {value.name}&nbsp;&nbsp;
                <span
                  className={`${styles.priceFilter__results}  ${montserrat.className}`}
                >
                  ({value.results})
                </span>
              </a>
            </li>
          ))}
          <li className={styles.priceFilter__line}>
            <PriceRange />
          </li>
        </ul>
      </div>
    </>
  );
}
