import React from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { ProductList } from '../../widgets/ProductList';

export const Phones: React.FC = () => {

  return (
    <PageLayout>
      <h1>Mobile phones</h1>
      <span>{`${0} models`}</span>
      <ProductList category="phones" />
    </PageLayout>
  );
};
