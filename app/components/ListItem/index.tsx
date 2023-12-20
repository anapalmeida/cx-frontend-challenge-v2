import { HiOutlineTruck } from 'react-icons/hi';
import { IProduct } from '@/interfaces/Products';
import Image from 'next/image';
import { Montserrat } from '@next/font/google';
import React from 'react';
import formatCurrencyARS from '@/utils/formatCurrency';
import styles from '@/styles/components/ListItem.module.scss';

const montserrat = Montserrat({ weight: '500', subsets: ['latin'] });

interface ListItemProps {
  props: IProduct;
}

export default function ListItem({ props }: ListItemProps) {
  return (
    <article className={styles.card} aria-label={props.title}>
      <Image
        src={props.picture}
        alt={props.title}
        width={150}
        height={150}
        className={styles.card__image}
      />
      <div className={`${styles.card__textBlock} ${montserrat.className}`}>
        <div className={styles.card__priceBlock}>
          <h3 className={`${styles.card__price} ${montserrat.className}`}>
            {formatCurrencyARS(parseFloat(props.price.amount))}
          </h3>
          {props.free_shipping && (
            <i className={styles.card__freeShipping} aria-label='Free Shipping'>
              <HiOutlineTruck size='10px' />
            </i>
          )}
        </div>
        <p className={`${styles.card__title} ${montserrat.className}`}>
          {props.title}
        </p>
        {props.installments.quantity > 0 && props.installments.amount && (
          <span
            className={`${styles.card__amount} ${styles.montserrat}`}
            aria-label={`En ${
              props.installments.quantity
            } cuotas de ${formatCurrencyARS(props.installments.amount)}`}
          >
            En {props.installments.quantity} cuotas de{' '}
            {formatCurrencyARS(props.installments.amount)}
          </span>
        )}
      </div>
      <span className={`${styles.card__city} ${montserrat.className}`}>
        {props.address?.city_name
          .toLowerCase()
          .split(' ')
          .map((s: any) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')}
      </span>
    </article>
  );
}
