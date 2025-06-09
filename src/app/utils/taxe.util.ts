import { Product } from '../models/product.model';
import { ProductCategory } from '../models/product-category.enum';

function taxToApplyByProduct(product: Product): number {
  switch (product.category) {
    case ProductCategory.Food:
    case ProductCategory.Medecine: return 0;
    case ProductCategory.Books: return 10;
    default: return 20;
  }
}

function roundUpToFiveCents(amount: number): number {
  return Math.ceil(amount * 20) / 20;
}

export function computeTaxe(product: Product): number {
  const rate = taxToApplyByProduct(product) + (product.isImported ? 5 : 0);
  if (rate === 0) { return 0; }
  return roundUpToFiveCents(product.price * rate / 100);
}

export function ttcPrice(product: Product): number {
  return product.price + computeTaxe(product);
}
