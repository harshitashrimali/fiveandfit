import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[];
  productSubscription: Subscription;
  cartSubscription: Subscription;
  cart: Cart;
  
  constructor(private productService: ProductService, private cartService: CartService) { 
    let products = this.productService.getAll().snapshotChanges();
    this.productSubscription = products.subscribe(productList => {
      this.products = productList.map(product => {
        let productObj = product.payload.val();
        // productObj['key'] = product.payload.key;
        return productObj;
      });
    });
    
  }
async ngOnInit() {
    this.cartSubscription = (await this.cartService.getCart()).subscribe(cart => {
      //console.log('Cart New',cart);
      this.cart = cart;
    });
  }
    addToCart(product) {
      this.cartService.addToCart(product);
    }
  
    getQuantity(productId) {
      if(this.cart){
        return this.cart.getItemQuantity(productId);
      }else{
        return 0;
      }
    }
    
  
    ngOnDestroy() {
      this.productSubscription.unsubscribe();
      this.cartSubscription.unsubscribe();
    }
  }