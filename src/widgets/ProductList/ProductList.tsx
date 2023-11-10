import React, { useEffect, useState } from 'react';
import { List } from '../../entities/List/List';
import { ProductCard } from '../../entities/ProductCard/ProductCard';
import { IProduct } from '../../entities/ProductCard/product.interface';
import { ProductsService } from '../../services/ProductsService';

type Props = {
  category?: string,
};

export const ProductList: React.FC<Props> = ({ category = '' }) => {
  const [phones, setPhones] = useState<IProduct[]>([]);
  // const [] = useState();
  // const [] = useState();
  // const [] = useState();

  useEffect(() => {
    ProductsService.getProductsByPage(category, 'year', 1, 16)
      .then(setPhones);
  }, []);

  return (
    <List>
      {
        phones.map(phone => (
          <ProductCard product={phone} />
        ))
      }
    </List>
  );
};

ProductList.defaultProps = {
  category: '',
};
