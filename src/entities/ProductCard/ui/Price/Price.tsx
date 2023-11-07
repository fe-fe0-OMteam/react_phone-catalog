import React from 'react';
import classNames from 'classnames';
import styles from './Price.module.scss';

type Props = {
  price: number,
  fullPrice: number,
  isDiscount: boolean,
};

export const Price: React.FC<Props> = ({ price, fullPrice, isDiscount }) => {
  return (
    <div className={styles.wrapper}>
      {isDiscount && (<span className={styles.price}>{`$${price}`}</span>)}
      <span
        className={classNames(styles.price, {
          [styles.discount]: isDiscount,
        })}
      >
        {`$${fullPrice}`}
      </span>
    </div>
  );
};
