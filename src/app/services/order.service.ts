import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Cart } from '../models/Cart';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  placeOrder (cart: Cart, shipping, userId: string){
    return this.db.list('orders').push({
      dateCreated: new Date().getTime(),
      items: cart.items,
      shipping: shipping,
      userId: userId
    });
  }

  getOrdersByUserId(userId) {
    return this.db.list<Order>('orders', ref => ref.orderByChild('userId').equalTo(userId));
  }
}

