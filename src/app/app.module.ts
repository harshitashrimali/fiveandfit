import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './compoments/header/header.component';
import { FooterComponent } from './compoments/footer/footer.component';
import { HomeComponent } from './compoments/home/home.component';
import { AboutComponent } from './compoments/about/about.component';
import { ShopComponent } from './compoments/shop/shop.component';
import { CartComponent } from './compoments/cart/cart.component';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './compoments/contact/contact.component';
import { LoginComponent } from './compoments/login/login.component';
import { RegisterComponent } from './compoments/register/register.component';
import { CheckoutComponent } from './compoments/checkout/checkout.component';
import { ThankyouComponent } from './compoments/thankyou/thankyou.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { QuantitySelectorComponent } from './compoments/quantity-selector/quantity-selector.component';
import { ProductFormComponent } from './compoments/product-form/product-form.component';
import { ManageProductsComponent } from './compoments/manage-products/manage-products.component';
import { WishlistComponent } from './compoments/wishlist/wishlist.component'; 
import { LoginGuardService } from './services/login-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { MyOrdersComponent } from './compoments/my-orders/my-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ShopComponent,
    CartComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    CheckoutComponent,
    ThankyouComponent,
    QuantitySelectorComponent,
    ProductFormComponent,
    ManageProductsComponent,
    WishlistComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'about',
        component:AboutComponent
      },
      {
         path:'shop',
         component:ShopComponent
      },
      {
        path:'contact',
        component:ContactComponent
      },
      {
        path:'login',
        component:LoginComponent,
        canActivate: [LoginGuardService]
      },
      {
        path:'register',
        component:RegisterComponent,
        canActivate: [LoginGuardService]
      },
      {
        path:'cart',
        component:CartComponent
      },
      {
        path : 'checkout',
        component:CheckoutComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'thankyou',
        component:ThankyouComponent
      },
      {
        path:'product-form',
        component:ProductFormComponent,
        canActivate: [AuthGuardService,AdminAuthGuardService]
      },
      {
        path: 'manage-products',
        component : ManageProductsComponent
      },
      {
        path: 'wishlist',
        component: WishlistComponent
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuardService]
      },

     
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
