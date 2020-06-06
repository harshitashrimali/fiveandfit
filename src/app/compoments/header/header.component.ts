import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { DbUser } from 'src/app/models/DbUser';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/Cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$: Observable<firebase.User>;
  dbUser$: Observable<DbUser>;
  cart$: Observable<Cart>;
  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { }

  async ngOnInit() {
    this.user$ = this.authService.user$;
    this.dbUser$ = this.authService.dbUser$;
    this.cart$ = await this.cartService.getCart();
   // this.dbUser$ = this.authService.getDatabaseUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}