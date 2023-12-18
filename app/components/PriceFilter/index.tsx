import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaFilter } from "react-icons/fa";
import { IFilter } from "@/interfaces/Filters";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Montserrat } from "@next/font/google";
import { RootState } from "@/storage/store";
import { setPriceFilter } from "@/storage/slices/priceFilterSlice";
import styles from "@/styles/components/PriceFilter.module.scss";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

const montserratBold = Montserrat({ weight: "600", subsets: ["latin"] });
const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

export default function PriceFilter() {
  const [data, setData] = useState<IFilter | undefined>();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const apiResult = useSelector((state: RootState) => state.apiResults);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleFilterChange = (id: string) => {
    router.push({
      pathname,
      query: { ...router.query, price: id },
    });
    dispatch(setPriceFilter(id));
  };

  useEffect(() => {
    const filter = apiResult.available_filters.find(
      (filter: any) => filter.id === "price"
    );

    setData(filter as IFilter | undefined);
  }, [apiResult]);

  return (
    <>
      <button className={styles.priceFilter__icon}>
        <button
          className={styles.collapseButton}
          onClick={handleCollapseToggle}
          aria-expanded={isCollapsed ? "false" : "true"}
          aria-controls="priceFilterList"
        >
          <FaFilter />
        </button>
      </button>
      <div
        className={`${styles.priceFilter} ${
          isCollapsed ? styles.priceFilter__collapsed : ""
        }`}
      >
        <h3
          className={`${styles.priceFilter__title} ${montserratBold.className}`}
        >
          {data?.name}
        </h3>
        <ul className={styles.priceFilter__list}>
          {data?.values.map(
            (value: { id: string; name: string; results: number }) => (
              <li key={value.id} className={styles.priceFilter__line}>
                <a
                  onClick={() => handleFilterChange(value.id)}
                  className={`${styles.priceFilter__name}  ${montserrat.className}`}
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
            )
          )}
          <li className={styles.priceFilter__line}>
            <form
              className={styles.priceFilter__range}
              onSubmit={handleSubmit}
              aria-label="Price range filter"
            >
              <div className={styles.priceFilter__range}>
                <div
                  className={`${styles.priceFilter__wrapper} ${styles.priceFilter__wrapper_left}`}
                >
                  <div>
                    <input
                      id="max"
                      name="max"
                      type="number"
                      placeholder="Mínimo"
                      className={`${styles.priceFilter__input} ${montserrat.className}`}
                    />
                  </div>
                </div>
                <div className={styles.priceFilter__wrapper}>
                  <input
                    id="max"
                    name="max"
                    type="number"
                    placeholder="Máximo"
                    className={`${styles.priceFilter__input} ${montserrat.className}`}
                  />
                </div>
              </div>
              <div>
                <button
                  className={styles.priceFilter__button}
                  type="submit"
                  aria-label="Apply filter"
                >
                  <MdOutlineArrowForwardIos />
                </button>
              </div>
            </form>
          </li>
        </ul>
      </div>
    </>
  );
}
