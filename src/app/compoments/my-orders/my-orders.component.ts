import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/Order';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
    this.orders$ = this.authService.user$.pipe(
      switchMap(user => {
        return this.orderService.getOrdersByUserId(user.uid).valueChanges();
      })
    );
  }

}

