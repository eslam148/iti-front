import { Component } from '@angular/core';
import {IOrderDetails} from 'src/app/Model/IOrder';
import {OrderService} from '../../Services/order.service'
@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css'],
})
export class ShowOrdersComponent {
  orderDetials: IOrderDetails[]=[];
  constructor(private OrderService: OrderService) {
    //  window.location.reload();
    const item = window.localStorage.getItem('user');
     let user = item ? JSON.parse(item) : [];
    OrderService.getOrderDetalis(user.id).subscribe((od) => {this.orderDetials = od
      console.log(od);
    });
  }
}
