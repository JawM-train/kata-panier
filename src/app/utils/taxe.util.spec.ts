import { computeTaxe, ttcPrice } from './taxe.util';
import { ProductCategory } from '../models/product-category.enum';
import { Product } from '../models/product.model';

describe('taxe.util', () => {

  const productTest = (overrides: Partial<Product> = {}): Product => ({
    id: 1,
    productName: 'testProduct',
    price: 10,
    quantity: 1,
    isImported: false,
    category: ProductCategory.Other,
    ...overrides,
  });

   it('une taxe de 10% est appliqué sur les livres non importés', () => {
    const book = productTest({
      category: ProductCategory.Books,
      price: 12.49,
    });
    expect(computeTaxe(book)).toBeCloseTo(1.25);
    expect(ttcPrice(book)).toBeCloseTo(13.74, 2);
  });

  it('une taxe de 15% est appliqué sur les livres importés', () => {
    const importedBook = productTest({
      category: ProductCategory.Books,
      price: 12.49,
      isImported: true,
    });
    expect(computeTaxe(importedBook)).toBeCloseTo(1.90);
    expect(ttcPrice(importedBook)).toBeCloseTo(14.39, 2);
  });

  it('les produits alimentaires non importés ne sont pas taxé', () => {
    const food = productTest({ category: ProductCategory.Food });
    expect(computeTaxe(food)).toBe(0);
    expect(ttcPrice(food)).toBeCloseTo(10);
  });

  it('les produits alimentaires importés sont taxé à 5%', () => {
    const importedFood = productTest({
      category: ProductCategory.Food,
      isImported: true,
    });
    expect(computeTaxe(importedFood)).toBeCloseTo(0.50);
    expect(ttcPrice(importedFood)).toBeCloseTo(10.50);
  });

  it('une taxe de 20% est appliqué sur les produits autres', () => {
    const other = productTest({
      category: ProductCategory.Other,
      price: 18.99,
    });
    expect(computeTaxe(other)).toBeCloseTo(3.80);
    expect(ttcPrice(other)).toBeCloseTo(22.79, 2);
  });

});