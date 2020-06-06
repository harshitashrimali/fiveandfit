import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { take, map } from 'rxjs/operators';
import { CartItem } from '../models/CartItem';
import { Cart } from '../models/Cart';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class CartService {

  constructor(private db: AngularFireDatabase) { }

  async getCartId() {
    let cartId = localStorage.getItem('cartId');
    
    if(!cartId){
      let createCartResult = await this.db.list('carts').push({
        dateCreated: new Date().getTime()
      });
      cartId =  createCartResult.key;
      localStorage.setItem('cartId', cartId);
    }

    return cartId;
  }

  async addToCart(product) {
    let cartId = await this.getCartId();

    // Now we have cartId definitiely
    let result = this.db.object('carts/'+cartId+'/items/'+product.key);
    result.valueChanges().pipe(take(1)).subscribe(item => {
        let qty = 1;
        if(item){
          qty = (item as CartItem).quantity + 1;
        }
        let productId = product.key;
          this.db.object('carts/'+cartId+'/items/'+productId).update({
            product: {
              title: product.title,
              imageUrl: product.imageUrl,
              price: product.price
            },
            quantity: qty
        });
    });
  }

  async removeFromCart(product) {
    let cartId = await this.getCartId();

    // Now we have cartId definitiely
    let result = this.db.object('carts/'+cartId+'/items/'+product.key);
    result.valueChanges().pipe(take(1)).subscribe((item: CartItem) => {
        let currentQty = item.quantity;
        let newQty = currentQty - 1;
        if(newQty > 0){
          // update quantity in database
          let productId = product.key;
          this.db.object('carts/'+cartId+'/items/'+productId).update({
            product: {
              title: product.title,
              imageUrl: product.imageUrl,
              price: product.price
            },
            quantity: newQty
        });
        }else{
          //now quantity is zero so remove cart item
          let productId = product.key;
          this.db.object('carts/'+cartId+'/items/'+productId).remove();
        }
        
    });
  }

  async getQuantity(productId): Promise<AngularFireObject<CartItem>> {
    let cartId = await this.getCartId();
    return this.db.object('carts/'+cartId+'/items/'+productId);
  }

  async getCart(): Promise<Observable<Cart>> {
    let cartId = await this.getCartId();
    return this.db.object('carts/'+cartId).valueChanges().pipe(
      map((cart: Cart) => {
        if(cart){
          return new Cart(cart.dateCreated, cart.items);
        }
      })
    );
  }
  // We are not using this as this approach returns plain/JSON object
  async getCartOld() {
    let cartId = await this.getCartId();
    return this.db.object('carts/'+cartId);
  }

  async removeCartItem(cartItemId) {
    let cartId = await this.getCartId();
    this.db.object('carts/'+cartId+'/items/'+cartItemId).remove();
  }

  async removeCart() {
    let cartId = await this.getCartId();
    this.db.object('carts/'+cartId).remove();
  }
}
