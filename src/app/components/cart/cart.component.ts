import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { computeTaxe, ttcPrice } from '../../utils/taxe.util';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  readonly cartItems$ = this.cartService.cartItems$;

  readonly totalTaxes$ = this.cartItems$.pipe(
    map(items =>
      items.reduce((acc, cartItem) => acc + this.itemTaxe(cartItem) * cartItem.quantity, 0))
  );

  readonly ttcTotal$ = this.cartItems$.pipe(
    map(items =>
      items.reduce((acc, cartItem) => acc + this.ttcItemPrice(cartItem) * cartItem.quantity, 0))
  );

  constructor(public cartService: CartService) {}

  itemTaxe(cartItem: CartItem)   {
    return computeTaxe(cartItem.product);
  }

  htItemPrice(cartItem: CartItem) {
    return cartItem.product.price;
  }
  
  ttcItemPrice(cartItem: CartItem) {
    return ttcPrice(cartItem.product);
  }

  remove(productId: number): void {
    this.cartService.remove(productId);
  }
}
