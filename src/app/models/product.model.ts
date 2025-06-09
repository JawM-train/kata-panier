import { ProductCategory } from './product-category.enum';

export interface Product {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  isImported: boolean;
  category: ProductCategory;
}
