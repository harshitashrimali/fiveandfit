import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/Product';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  products: Product[];
  productSubscription: Subscription;
  
  constructor(private productService: ProductService) { 
    let products = this.productService.getAll().snapshotChanges();
    this.productSubscription = products.subscribe(productList => {
      this.products = productList.map(product => {
        let productObj = product.payload.val();
        productObj['key'] = product.payload.key;
        return productObj;
      });
      
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

  deleteProduct(productId) {
    if(confirm('Are you sure want to delete?')){
      this.productService.delete(productId);
    }
  }

}
