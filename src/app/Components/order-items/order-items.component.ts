import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {GetOrderItem, OrderItem} from 'src/app/Model/IOrder';
import {OrderService} from '../../Services/order.service'
@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css'],
})
export class OrderItemsComponent {
  OrderId: number = 0;
  items: GetOrderItem[] = [];
  lang: Observable<string>;

  constructor(
    private _Route: ActivatedRoute,
    private OrderService: OrderService,
    private store: Store<{ Language: string }>
  ) {
     this.lang = store.pipe(select('Language'));
    this._Route.paramMap.subscribe((param) => {
      this.OrderId = param.get('id')
        ? (param.get('id') as unknown as number)
        : 0;
    });

    OrderService.getOrderItems(this.OrderId).subscribe((i) => (this.items = i));
  }
}
