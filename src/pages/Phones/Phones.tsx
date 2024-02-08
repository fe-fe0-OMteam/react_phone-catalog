import React, { useEffect } from 'react';
import { PageLayout } from '../../shared/PageLayout';
import { ProductList } from '../../widgets/ProductList';
import { useAppSelector } from '../../app/hooks/useAppSelector';
import styles from './Phones.module.scss';
import { Breadcrumbs } from '../../shared/Breadcrumbs';
import { useAppDispatch } from '../../app/hooks/useAppDispatch';
import { ProductsService } from '../../services/ProductsService';
import { setCategories } from '../../entities/Category/reducers/categorySlice';
import { NoResults } from '../../widgets/NoResults';

export const Phones: React.FC = () => {
  const { categories } = useAppSelector(state => state.category);
  const { total, name } = categories.filter(c => c.name === 'phones')[0];
  const { searchedValue, searchedProducts }
    = useAppSelector(state => state.search);
  const dispatch = useAppDispatch();

  useEffect(() => {
    ProductsService.getCategories()
      .then(c => dispatch(setCategories(c)));
  }, []);

  return (
    <PageLayout>
      {searchedValue ? (<span className={styles.span}>{`${searchedProducts.length} results`}</span>)
        : (
          <>
            <Breadcrumbs />
            <div className={styles.pageDetails}>
              <h1>Mobile phones</h1>
              {
                total ? <span className={styles.span}>{`${total} models`}</span>
                  : <NoResults name="phones" />
              }
            </div>
          </>
        )}
      {!!total && <ProductList category={name} />}
    </PageLayout>
  );
};
