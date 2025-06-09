import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  categorySelected = 'ALL';

  constructor(private productService: ProductService, public cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(productsList => {
      this.products = productsList;
      this.categories = [...new Set(productsList.map(product => product.category))];
      this.filter();
    });
  }

  filter() {
    this.filteredProducts = this.categorySelected === 'ALL' ?
    this.products : this.products.filter(p => p.category === this.categorySelected);
  }

  add(product: Product, quantity: number) {
    this.cartService.add(product, quantity);
  }
}
