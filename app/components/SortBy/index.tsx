import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Montserrat } from '@next/font/google';
import { RootState } from '@/storage/store';
import { setSortBy } from '@/storage/slices/sortBySlice';
import styles from '@/styles/components/SortBy.module.scss';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

const montserratBold = Montserrat({ weight: '600', subsets: ['latin'] });
const montserratThin = Montserrat({ weight: '400', subsets: ['latin'] });

export default function SortBy() {
  const sortBy = useSelector((state: RootState) => state.sortBy.sortBy);
  const apiResult = useSelector((state: RootState) => state.apiResults);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleSortByChange = (id: string) => {
    if (sortBy) {
      const { query } = router;

      router.replace({
        pathname: router.pathname,
        query: { ...query, sort: id },
      });
    } else {
      router.push(`${pathname}&sort=${id}`);
    }
    dispatch(setSortBy(id));
    router.push(`${pathname}&sort=${id}`);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${styles.container} flex  md:flex-col md:justify-end md:items-end  items-center self-center justify-end mb-4 }`}
    >
      <h4 className={`text-sm sm:text-xs ${montserratBold.className}`}>
        Ordenar por
      </h4>
      <div className="relative inline-block text-left">
        <div>
          <span className="rounded-md">
            <button
              type="button"
              className={`${montserratThin.className} inline-flex justify-between items-center w-full px-4 md:pr-0 py-2 bg-transparent text-sm sm:text-xs  leading-5 focus:outline-none hover:text-meli-blue transition-colors`}
              onClick={toggleDropdown}
            >
              {
                apiResult?.available_sorts.find(sort => sort.id === sortBy)
                  ?.name
              }
              <svg
                className="-mr-1 ml-2 h-4 w-4 transition-transform transform "
                aria-hidden="true"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="#3483fa"
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <path
                  d="M9.35229 3.70447L6.00004 7.05672L2.64779 3.70447L1.85229 4.49996L6.00004 8.64771L10.1478 4.49996L9.35229 3.70447Z"
                  fill="#3483fa"
                ></path>
              </svg>
            </button>
          </span>
        </div>
        {isOpen && (
          <div className="origin-top-right absolute right-0 w-36 rounded-md shadow-lg">
            <div className="rounded-md bg-white shadow-sm border-b">
              {apiResult?.available_sorts.map(sort => (
                <div key={sort.id} className="flex flex-col border-t-2">
                  <button
                    onClick={() => handleSortByChange(sort.id)}
                    className={`${
                      sortBy === sort.id
                        ? `rounded  text-sm sm:text-xs border-l-meli-blue border-l-4  text-left  pl-3 py-2 leading-5 text-meli-blue font-bold hover:bg-none ${montserratBold.className}`
                        : `rounded text-sm sm:text-xs border-l-white hover:border-l-meli-lighterblue  border-l-4  text-left pl-3 py-2 leading-5 text-gray-700 hover:bg-zinc-100 focus:outline-none ${montserratThin.className}`
                    }`}
                  >
                    {sort.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
