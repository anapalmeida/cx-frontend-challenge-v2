import { setPriceFilter } from '@/storage/slices/priceFilterSlice';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

export default function useFilterPrice() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handlePriceFilterChange = (id: string) => {
    router.push({
      pathname,
      query: { ...router.query, price: id },
    });
    dispatch(setPriceFilter(id));
  };

  return handlePriceFilterChange;
}
