import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })

export class CartService {
  private cartItemsSubject$ = new BehaviorSubject<CartItem[]>([]);
  readonly cartItems$ = this.cartItemsSubject$.asObservable();
  readonly totalQuantity$ = this.cartItems$.pipe(
    map(items => items.reduce((acc, item) => acc + item.quantity, 0))
  );

  get currentCartItems(): CartItem[] { return this.cartItemsSubject$.value; }

  add(product: Product, productQuantity: number): void {
    if (productQuantity <= 0) { return; }
    const currentItems = [...this.currentCartItems];
    const found = currentItems.find(cartItem => cartItem.product.id === product.id);
    if (found) {
      found.quantity += productQuantity;
    } else {
      currentItems.push({ product, quantity: productQuantity });
    }
    this.cartItemsSubject$.next(currentItems);
  }

  remove(productId: number): void {
  const items = this.cartItemsSubject$.getValue() .filter(ci => ci.product.id !== productId);
  this.cartItemsSubject$.next(items);
}

}
