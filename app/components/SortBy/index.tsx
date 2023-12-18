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
    router.push({
      pathname,
      query: { ...router.query, sort: id },
    });
    dispatch(setSortBy(id));
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${styles.container} }  mb-4 flex items-center  justify-end self-center md:flex-col md:items-end md:justify-end`}
    >
      <h4 className={`text-sm sm:text-xs ${montserratBold.className}`}>
        Ordenar por
      </h4>
      <div className='relative inline-block text-left'>
        <div>
          <span className='rounded-md'>
            <button
              type='button'
              className={`${montserratThin.className} inline-flex w-full items-center justify-between bg-transparent px-4 py-2 text-sm leading-5 transition-colors  hover:text-meli-blue focus:outline-none sm:text-xs md:pr-0`}
              onClick={toggleDropdown}
            >
              {
                apiResult?.available_sorts.find((sort) => sort.id === sortBy)
                  ?.name
              }
              <svg
                className='-mr-1 ml-2 h-4 w-4 transform transition-transform '
                aria-hidden='true'
                width='12'
                height='12'
                viewBox='0 0 12 12'
                fill='#3483fa'
                style={{
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <path
                  d='M9.35229 3.70447L6.00004 7.05672L2.64779 3.70447L1.85229 4.49996L6.00004 8.64771L10.1478 4.49996L9.35229 3.70447Z'
                  fill='#3483fa'
                ></path>
              </svg>
            </button>
          </span>
        </div>
        {isOpen && (
          <div className='absolute right-0 w-36 origin-top-right rounded-md shadow-lg'>
            <div className='rounded-md border-b bg-white shadow-sm'>
              {apiResult?.available_sorts.map((sort) => (
                <div key={sort.id} className='flex flex-col border-t-2'>
                  <button
                    onClick={() => handleSortByChange(sort.id)}
                    className={`${
                      sortBy === sort.id
                        ? `rounded  border-l-4 border-l-meli-blue py-2 pl-3  text-left  text-sm font-bold leading-5 text-meli-blue hover:bg-none sm:text-xs ${montserratBold.className}`
                        : `rounded border-l-4 border-l-white py-2 pl-3  text-left  text-sm leading-5 text-gray-700 hover:border-l-meli-lighterblue hover:bg-zinc-100 focus:outline-none sm:text-xs ${montserratThin.className}`
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
