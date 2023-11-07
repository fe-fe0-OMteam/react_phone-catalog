import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from './product.interface';
import { Price } from './ui/Price';
import { Attribute } from './ui/Attribute';
import { AddCartButton } from './ui/AddCartButton';
import { AddFavouritesButton } from './ui/AddFavouritesButton';
import styles from './ProductCard.module.scss';

type Props = {
  product: IProduct,
  isDiscount: boolean,
};

export const ProductCard: React.FC<Props> = ({
  product: {
    itemId,
    category,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    image,
  },
  isDiscount,
}) => {
  const attributes = useMemo(() => {
    return {
      Screen: screen,
      Capacity: capacity,
      RAM: ram,
    };
  }, [screen, capacity, ram]);

  return (
    <div className={styles.wrapper}>
      <Link to={`/${category}/${itemId}`}>
        <div className={styles.image}>
          <img src={`_new/${image}`} alt={name} />
        </div>
        <h3 className={styles.title}>{name}</h3>
      </Link>
      <Price
        price={price}
        fullPrice={fullPrice}
        isDiscount={isDiscount}
      />
      <div className={styles.attributes}>
        {Object.entries(attributes).map(([key, value]) => (
          <Attribute key={key} name={key} value={value} />
        ))}
      </div>
      <div className={styles.actions}>
        <AddCartButton />
        <AddFavouritesButton />
      </div>
    </div>
  );
};
