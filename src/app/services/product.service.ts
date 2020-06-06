import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Product } from '../models/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
 

  constructor(private db: AngularFireDatabase) { }
  
  create(product) {
    this.db.list('products').push(product);
  }

  getAll(): AngularFireList<Product> {
    return this.db.list('products');
  }

  delete(productId) {
    this.db.object('products/'+productId).remove();
  }

  update(productId, product) {
    this.db.object('products/'+productId).update(product);
  }

  get(productId): AngularFireObject<Product> {
    return this.db.object('products/'+productId);
  }
 
}
