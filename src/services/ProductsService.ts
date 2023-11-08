import { categories } from '../widgets/Categories/categories.data';
import { IProduct } from '../entities/ProductCard/product.interface';
import { ICategory } from '../entities/Category/category.interface';
import { $api } from '../app/api/api';

export class ProductsService {
  static async getProducts() {
    return $api<IProduct[]>('products.json');
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
}
