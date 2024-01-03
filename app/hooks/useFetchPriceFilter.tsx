import { useEffect, useState } from 'react';

import { IFilter } from '@/interfaces/Filters';
import { RootState } from '@/storage/store';
import { useSelector } from 'react-redux';

export default function useFetchPriceFilter() {
  const [data, setData] = useState<IFilter | undefined>();
  const apiResult = useSelector((state: RootState) => state.apiResults);

  useEffect(() => {
    const priceFilter = apiResult?.available_filters.find(
      (filter: any) => filter.id === 'price'
    );

    setData(priceFilter as IFilter | undefined);
  }, [apiResult]);

  return data;
}
