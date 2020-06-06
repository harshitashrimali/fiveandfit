import { Component, OnInit, Input } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.css']
})
export class QuantitySelectorComponent implements OnInit {

  @Input('product') product;
  @Input('cart') cart;
  
  constructor(private cartService: CartService) { }

  ngOnInit() {
    
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if(this.cart){
      return this.cart.getItemQuantity(this.product.key);
    }else{
      return 0;
    }
  }

}
