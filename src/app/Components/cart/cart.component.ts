import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { IProduct } from './../../Model/IProduct';
import { CartService } from '../../Services/cart.service';
// import {ICreateOrderRequest, IPayPalConfig} from 'ngx-paypal';
import { IOrder } from './../../Model/IOrder';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit,OnChanges {
  productInCart: IProduct[] = [];
  Prices!: number[];
  totalPrice: number = 0;
  Order: IProduct[] = [];
  // public payPalConfig?: IPayPalConfig;
  constructor(private CartService: CartService) {
    this.productInCart = this.CartService.getItems();
    this.calcTotal();

    //   console.log(this.totalPrice);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.Changes();
  }
  Changes() {
    this.Prices = this.productInCart.map((i) => i.price * i.cartQuantity);
    this.totalPrice = this.Prices.reduce((c, p) => p + c);
  }
  ngOnInit(): void {
   this.Changes();
    //this.initConfig();
  }
  order() {
    this.Order = this.productInCart;
    this.CartService.AddOrder(this.Order);
    console.log(this.CartService.GetOrder());
  }

  //----- remove specific item
  removeFromCart(item: IProduct) {
    this.CartService.removeItem(item);
    this.productInCart = this.CartService.getItems();
    this.calcTotal();

  }
  private calcTotal() {
    this.Prices = this.productInCart.map((i) => i.price * i.cartQuantity);
    if (this.Prices.length == 0) this.totalPrice = 0;
    else this.totalPrice = this.Prices.reduce((c, p) => p + c);
  }
  Up(index: number) {
    if (!(this.productInCart[index].cartQuantity >= this.productInCart[index].quantity)) {
      this.productInCart[index].cartQuantity += 1;
    }
         this.Changes();

  }
  Down(index: number) {
     if (!(this.productInCart[index].cartQuantity<=1))
    {
    this.productInCart[index].cartQuantity -= 1;
    }
    else{
      this.removeFromCart(this.productInCart[index]);
    }
     this.Changes();


  }
}











  //  private initConfig(): void {
  //     this.payPalConfig = {
  //       currency: 'USD',
  //       clientId: 'AToDsg4D_1Rdhkp5gEA71rJcqvKLRahIV5DEC2wSVFdAkz6XdYODv2GsHzqx0UbqPCi-A3xLKSVabQX6', // add paypal clientId here
  //       createOrderOnClient: (data) =>
  //         <ICreateOrderRequest>{
  //           intent: 'CAPTURE',
  //           purchase_units: [
  //             {
  //               amount: {
  //                 currency_code: 'USD',
  //                 value: `${this.totalPrice}`,
  //                 breakdown: {
  //                   item_total: {
  //                     currency_code: 'USD',
  //                     value: `12`,
  //                   },
  //                 },
  //               },
  //               items: [
  //                 {
  //                   name: 'The Swag Coder',
  //                   quantity: '1',
  //                   category: 'DIGITAL_GOODS',
  //                   unit_amount: {
  //                     currency_code: 'USD',
  //                     value: `6`,
  //                   },
  //                 },
  //                 {
  //                   name: 'Coder',
  //                   quantity: '1',
  //                   category: 'DIGITAL_GOODS',
  //                   unit_amount: {
  //                     currency_code: 'USD',
  //                     value: `6`,
  //                   },
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       advanced: {
  //         commit: 'true',
  //       },
  //       style: {
  //         label: 'paypal',
  //         layout: 'vertical',

  //         color: 'blue',
  //         shape: 'rect',
  //       },
  //       onApprove: (data, actions) => {
  //         console.log(
  //           'onApprove - transaction was approved, but not authorized',
  //           data,
  //           actions
  //         );
  //         actions.order.get().then((details: any) => {
  //           console.log(
  //             'onApprove - you can get full order details inside onApprove: ',
  //             details
  //           );
  //         });
  //       },
  //       onClientAuthorization: (data) => {
  //         console.log(
  //           'onClientAuthorization - you should probably inform your server about completed transaction at this point',
  //           data
  //         );
  //       },
  //       onCancel: (data, actions) => {
  //         console.log('OnCancel', data, actions);
  //       },
  //       onError: (err) => {
  //         console.log('OnError', err);
  //       },
  //       onClick: (data, actions) => {
  //         console.log('onClick', data, actions);
  //       },
  //     };
  //   }
