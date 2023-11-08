import React, { useEffect, useState } from 'react';
import { IProduct } from '../../entities/ProductCard/product.interface';
import { ProductsService } from '../../services/ProductsService';
import { ProductsCarousel } from '../ProductsCarousel/ProductsCarousel';

export const HotPricesCarousel: React.FC = () => {
  const [hotPrices, setHotPrices] = useState<IProduct[]>([]);

  useEffect(() => {
    ProductsService.getProductsByHotPrices()
      .then(setHotPrices);
  }, []);

  return (
    <ProductsCarousel title="Hot prices" products={hotPrices} />
  );
};
