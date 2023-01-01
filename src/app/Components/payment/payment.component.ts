import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {on} from 'events';
// import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';
import {IOrder, IOrderDetails, OrderItem} from 'src/app/Model/IOrder';
import {IProduct} from 'src/app/Model/IProduct';
import { CartService } from '../../Services/cart.service';
import { OrderService } from '../../Services/order.service';
import { loadScript } from '@paypal/paypal-js';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {reset} from 'src/app/ReduxStore/actions/CartAction';
declare var paypal: {
  Buttons: (arg0: {
    // Order is created on the server and the order id is returned
    createOrder: (data: any,actions: any) => Promise<any>;
    // Finalize the transaction on the server after payer approval
    onApprove: (data: any,actions: any) => Promise<void>;
  }) => {(): any; new(): any; render: {(arg0: string): void; new(): any;};};
};
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  Order: IProduct[] = [];
  totalPrice: number = 0;
  OrderDB: OrderItem[] = [];
  @ViewChild("paypal",{static: true}) paypalElement! :ElementRef
    count$: Observable<number>;

  // public payPalConfig?: IPayPalConfig;
  constructor(
    public translate: TranslateService,
    private CartService: CartService,
    private OrderService: OrderService,
    private router: Router,
     private store: Store<{ Cart: number }>
  ) {
     this.count$ = store.pipe(select('Cart'));
  this.Order = this.CartService.GetOrder();
  this.Order.forEach((o) => {
    this.totalPrice += +o.price * +o.cartQuantity;
  });

  }
  ngOnInit(): void {
    loadScript({
      'client-id':
        'Add3qpW--O8SZR7nqRwpObfIeVOI4x8uIqfsuxOgpykF7uAsA2zVPhtZfe3JKWioswj_k0r4LILR5dB7',
       // intent : 'authorize',
    })
      .then((paypal: any) => {
        paypal
          .Buttons({
            // Sets up the transaction when a payment button is clicked
            createOrder: (data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: `${this.totalPrice}`, // Can also reference a variable or function
                    },
                  },
                ],
              });
            },
            // Finalize the transaction after payer approval
            onApprove: (data: any, actions: any) => {
              let total:number = 0;
              return actions.order.capture().then( (orderData: any) => {
                  const item = window.localStorage.getItem('user');
                  let user = item ? JSON.parse(item) : [];
                // Successful capture! For dev/demo purposes:
                //total = +orderData.purchase_units.;
                console.log(
                  'Capture result',
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                alert(
                  `Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`
                );
                console.log(transaction);
                  let or: IOrderDetails = {
                    user_id: user.id,
                    total: transaction.amount.value,
                    payment_id: 1,
                    progress: 0,
                  };
                     var orderDetials!: IOrderDetails;
                     this.OrderService.addOrderDitalis(or).subscribe((od) => {
                       orderDetials = od;
                        console.log(od);
                         this.Order.forEach((o) => {
                           this.OrderDB.push(<OrderItem>{
                             order_Details_id: od.id,
                             product_id: o.no,
                             quantity: o.cartQuantity,
                           });
                         });
                          this.OrderService.addOrderitems(
                            this.OrderDB
                          ).subscribe((i) => {
                            localStorage.removeItem('cart_items');
                            localStorage.removeItem('cartCount');
                            this.store.dispatch(reset());
                            setTimeout(() => {},2000)
                             this.router.navigate(['/order']);

                          });
                     });



                // When ready to go live, remove the alert and show a success message within this page. For example:
                // const element = document.getElementById('paypal-button-container');
                // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                // Or go to another URL:  actions.redirect('thank_you.html');
              });




          }})
          .render(this.paypalElement.nativeElement)
          .catch((error: any) => {
            console.error('failed to render the PayPal Buttons', error);
          });
      })
      .catch((error) => {
        console.error('failed to load the PayPal JS SDK script', error);
      });


    // this.initConfig();
  }

  // private initConfig(): void {
  //   this.payPalConfig = {
  //     currency: 'USD',
  //     clientId:
  //       'AToDsg4D_1Rdhkp5gEA71rJcqvKLRahIV5DEC2wSVFdAkz6XdYODv2GsHzqx0UbqPCi-A3xLKSVabQX6', // add paypal clientId here
  //     createOrderOnClient: (data) =>
  //       <ICreateOrderRequest>{
  //         intent: 'CAPTURE',
  //         purchase_units: [
  //           {
  //             amount: {
  //               currency_code: 'USD',
  //               value: `${this.totalPrice}`,
  //               breakdown: {
  //                 item_total: {
  //                   currency_code: 'USD',
  //                   value: `${this.totalPrice}`,
  //                 },
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     advanced: {
  //       commit: 'true',
  //     },
  //     style: {
  //       label: 'paypal',
  //       layout: 'vertical',
  //       color: 'blue',
  //       shape: 'rect',
  //     },
  //     onApprove: (data, actions) => {
  //       console.log(
  //         'onApprove - transaction was approved, but not authorized',
  //         data,
  //         actions
  //       );
  //       actions.order.get().then((details: any) => {
  //         console.log(
  //           'onApprove - you can get full order details inside onApprove: ',
  //           details
  //         );
  //       });
  //     },
  //     onClientAuthorization: (data) => {
  //       console.log(
  //         'onClientAuthorization - you should probably inform your server about completed transaction at this point',
  //         data
  //       );

  //     },
  //     onCancel: (data, actions) => {
  //       console.log('OnCancel', data, actions);
  //     },
  //     onError: (err) => {
  //       console.log('OnError', err);
  //     },
  //     onClick: (data, actions) => {
  //       console.log('onClick', data, actions);
  //     },
  //   };
  // }
}
