import React, { FormEvent, useState } from 'react';

import { IFilterValues } from '@/interfaces/Filters';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { Montserrat } from '@next/font/google';
import styles from '@/styles/components/PriceFilter.module.scss';
import useFetchPriceFilter from '@/hooks/useFetchPriceFilter';
import useFilterPrice from '@/hooks/usePriceFilter';

const montserrat = Montserrat({ weight: '500', subsets: ['latin'] });

export default function PriceRange() {
  const [min, setMin] = useState<string | undefined>();
  const [max, setMax] = useState<string | undefined>();
  const priceFilter = useFilterPrice();
  const data = useFetchPriceFilter();

  const findIdForRange = (
    min: number,
    max: number,
    values: IFilterValues[]
  ) => {
    const matchingRanges = values.map((value) => {
      const [rangeMin, rangeMax] = (value.id || '').split('-').map(parseFloat);
      const numericMin = isNaN(rangeMin) ? Number.MIN_SAFE_INTEGER : rangeMin;
      const numericMax = isNaN(rangeMax) ? Number.POSITIVE_INFINITY : rangeMax;

      return { id: value.id, numericMin, numericMax };
    });

    if (!isNaN(max)) {
      const match = matchingRanges.find(({ numericMax }) => max <= numericMax);
      if (match) {
        console.error(`Input max falls within the range:`, match);
        return match.id;
      } else {
        console.error(`Input max does not fall within any range.`);
        return null;
      }
    } else if (!isNaN(min)) {
      const match = matchingRanges.find(({ numericMin }) => min >= numericMin);
      if (match) {
        console.error(`Input min falls within the range:`, match);
        return match.id;
      } else {
        console.error(`Input min does not fall within any range.`);
        return null;
      }
    }
    return null;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const minPrice = min ? parseFloat(min) || 0 : 0;
    const maxPrice = max
      ? parseFloat(max) || Number.MAX_SAFE_INTEGER
      : Number.MAX_SAFE_INTEGER;

    const selectedId = findIdForRange(minPrice, maxPrice, data?.values || []);
    priceFilter(selectedId || '');
  };

  return (
    <form
      className={styles.priceFilter__range}
      onSubmit={handleSubmit}
      aria-label='Price range filter'
    >
      <div className={styles.priceFilter__range}>
        <div
          className={`${styles.priceFilter__wrapper} ${styles.priceFilter__wrapper_left}`}
        >
          <div>
            <input
              id='min'
              name='min'
              type='number'
              placeholder='Mínimo'
              className={`${styles.priceFilter__input} ${montserrat.className}`}
              onChange={(e) => setMin(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.priceFilter__wrapper}>
          <input
            id='max'
            name='max'
            type='number'
            placeholder='Máximo'
            className={`${styles.priceFilter__input} ${montserrat.className}`}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          className={styles.priceFilter__button}
          type='submit'
          aria-label='Apply filter'
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </form>
  );
}
