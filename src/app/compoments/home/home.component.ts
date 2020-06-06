import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Subscription, Observable, of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/Cart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  img_url: string = "assets/images/blog_1.jpg";
  title = "Home Page";
 
  products: Product [];
  productSubscription: Subscription;
  cartSubscription: Subscription;
  cart: Cart;
  constructor(private productService: ProductService, private cartService: CartService) { 
    let products = this.productService.getAll().snapshotChanges();
    this.productSubscription = products.subscribe(productList => {
      this.products = productList.map(product => {
        let productObj = product.payload.val();
        productObj['key'] = product.payload.key;
        return productObj;
      });
    });
    
  }
  async ngOnInit() {
    this.loadScript();
    this.cartSubscription = (await this.cartService.getCart()).subscribe(cart => {
      //console.log('Cart New',cart);
      this.cart = cart;
    });
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  public loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("home")) {
        scripts[i].remove();
        //isFound = true;
      }
    }

    if (!isFound) {
      var dynamicScripts = ["/assets/js/home.js"];

      for (var i = 0; i < dynamicScripts.length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts[i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('body')[0].appendChild(node);
      }

    }
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
