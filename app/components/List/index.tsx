import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { IFilter } from '@/interfaces/Filters';
import ListItem from '../ListItem';
import NotFound from '../NotFound';
import PriceFilter from '../PriceFilter';
import { RootState } from '@/storage/store';
import SortBy from '../SortBy';
import styles from '@/styles/components/List.module.scss';

export default function List() {
  const apiResult = useSelector(
    (state: RootState) => state.apiResults,
    shallowEqual,
  );
  const [filter, setFilter] = useState<IFilter>();

  useEffect(() => {
    const filter = apiResult.available_filters.find(
      (filter: any) => filter.id === 'price',
    );

    setFilter(filter as IFilter | undefined);
  }, [apiResult]);

  const renderListItems = () => {
    if (!apiResult?.results || apiResult?.results.length === 0) {
      return (
        <NotFound
          message="Nenhum produto foi encontrado"
          aria-label="No products found"
        />
      );
    } else {
      return (
        <div className={styles.container} aria-label="Product List">
          <SortBy aria-label="Sort Options" />
          <article
            className={styles.container__article}
            aria-label="Price Filter"
          >
            {filter && <PriceFilter />}
          </article>
          <div className={styles.container__list} aria-label="Product List">
            {apiResult?.results.map(product => (
              <ListItem key={product.id} props={product} />
            ))}
          </div>
        </div>
      );
    }
  };

  return <>{renderListItems()}</>;
}
