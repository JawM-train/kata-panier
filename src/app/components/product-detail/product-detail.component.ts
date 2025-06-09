import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { ttcPrice } from '../../utils/taxe.util';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  @Input() product!: Product;
  @Output() add = new EventEmitter<number>();

  quantitySelected = 1;
  quantityLeft!: number;

   constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.quantityLeft = this.product.quantity;
  }

  get ttcProductPrice() {
    return ttcPrice(this.product);
  }

 push(): void {
    if (this.quantitySelected <= 0 || this.quantitySelected > this.quantityLeft) {
      return;
    }
    this.cartService.add(this.product, this.quantitySelected);
    this.quantityLeft -= this.quantitySelected;
    this.quantitySelected = 1;
  }
}
