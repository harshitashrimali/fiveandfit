import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    title: null,
    imageUrl: null,
    price: null,
  
  };
  pageTitle = "Add Product";
  id: string;
  

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { 

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.pageTitle = "Edit Product";
        this.id = params.get('id');
        this.productService.get(this.id).valueChanges().subscribe(product => {
          this.product = product;
        });
      }
    });
  }

  saveproduct(productForm) {
    let product = productForm.value;
    if(this.id){
      // update product
      this.productService.update(this.id, product);
    }else{
      // create product
      this.productService.create(product);
    }
    

    this.router.navigate(['/manage-products']);
  }

}
