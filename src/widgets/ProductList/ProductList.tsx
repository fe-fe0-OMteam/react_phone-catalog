import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import styles from './ProductList.module.scss';
import { EPerPage } from './PerPage.enum';
import { ESortBy } from './SortBy.enum';
import { IProduct } from '../../entities/ProductCard/product.interface';
import { ProductsService } from '../../services/ProductsService';
import { useAppSelector } from '../../app/hooks/useAppSelector';
import { List } from '../../entities/List';
import { ProductCard } from '../../entities/ProductCard/ProductCard';
import { Dropdown } from '../../shared/Dropdown';
import { Pagination } from '../../entities/Pagination';

type Props = {
  category?: string,
};

export const ProductList: React.FC<Props> = ({ category = '' }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const { categories } = useAppSelector(state => state.category);
  const { total } = categories.filter(c => c.name === category)[0];
  const [searchParams, setSearchParams] = useSearchParams();
  const perPage = searchParams.get('perPage') || EPerPage.Sixteen;
  const sortBy = searchParams.get('sortBy') || ESortBy.Newest;

  useEffect(() => {
    ProductsService
      .getProductsByPage(category, sortBy, currentPage,
        Number(perPage) || total)
      .then(setProducts);

    window.scrollTo(0, 0);
  }, [perPage, sortBy, currentPage, location]);
  const lastPage = Math.round(total / (Number(perPage) || total));

  const setPerPage = (value: string) => {
    searchParams.delete('page');
    searchParams.set('perPage', `${value}`);
    setSearchParams(searchParams);
  };

  const setSortBy = (value: string) => {
    searchParams.delete('page');
    searchParams.set('sortBy', `${value}`);
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.dropdowns}>
        <Dropdown label="Sort by" onChange={setSortBy} current={sortBy}>
          {(Object.values(ESortBy) as Array<string>)}
        </Dropdown>

        <Dropdown label="Items on page" onChange={setPerPage} current={perPage}>
          {(Object.values(EPerPage) as Array<string>)}
        </Dropdown>
      </div>

      <List>
        {products.map((prod, i) => (<ProductCard product={prod} key={+i} />))}
      </List>

      <Pagination
        lastPage={lastPage}
        totalCount={total}
        pageSize={+perPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

ProductList.defaultProps = {
  category: '',
};
