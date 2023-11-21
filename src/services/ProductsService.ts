import { categories } from '../widgets/Categories/categories.data';
import { IProduct } from '../entities/ProductCard/product.interface';
import { ICategory } from '../entities/Category/category.interface';
import { $api } from '../app/api/api';

export class ProductsService {
  static async getProducts(category = '') {
    const products = await $api<IProduct[]>('products.json');

    return category
      ? products.filter(product => product.category === category)
      : products;
  }

  static async getCategories(): Promise<ICategory[]> {
    const products = await this.getProducts();

    return categories.map(category => {
      const total = products.filter(product => {
        return product.category === category.name;
      }).length;

      return { ...category, total };
    });
  }

  static async getProductsByHotPrices() {
    const products = await this.getProducts();

    return products.sort((a, b) => {
      if (!a.price || !b.price) {
        return 1;
      }

      return (b.fullPrice - b.price) - (a.fullPrice - a.price);
    });
  }

  static async getBrandNewProducts() {
    const products = await this.getProducts();

    return products.filter(product => !product.price)
      .sort((a, b) => {
        return b.fullPrice - a.fullPrice;
      });
  }

  // eslint-disable-next-line max-len
  static async getProductsByPage(category: string, sortBy: string, page: number, perPage: number) {
    const phones = await this.getProducts(category);
    const sorting = (arr: IProduct[], sort: string) => {
      return arr.sort((a, b) => {
        switch (sort) {
          case 'Cheapest': {
            const compareA = !a.price ? a.fullPrice : a.price;
            const compareB = !b.price ? b.fullPrice : b.price;

            return compareA - compareB;
          }

          case 'Newest': {
            return b.year - a.year;
          }

          case 'Alphabetically': {
            return a.name.localeCompare(b.name);
          }

          default: return 0;
        }
      });
    };

    const sorted = sorting(phones, sortBy);
    const countOfItems = page * perPage;
    const paginationIdxStart = countOfItems - perPage;
    const paginationIdxEnd = countOfItems >= sorted.length
      ? sorted.length : countOfItems;

    return sorted.slice(paginationIdxStart, paginationIdxEnd);
  }
}
