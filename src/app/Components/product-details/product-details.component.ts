import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import { IProduct } from 'src/app/Model/IProduct';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;
  lang: Observable<string>;

  constructor(
    private productservice: ProductService,
    private activateRoute: ActivatedRoute,
    private cartService: CartService,
    private store: Store<{ Language: string }>
  ) {
      this.lang = store.pipe(select('Language'));
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paramMap) => {
      let prdID = paramMap.get('no') ? Number(paramMap.get('no')) : 1;
      console.log(prdID);
      this.productservice.GetProductByID(prdID).subscribe((data) => {
        this.product = data;
        console.log(this.product);
      });
    });
  }

  ratingcount = 0;
  totalrating = 0;

  Finalrating: any;

  ratingcontrol = new FormControl(0);
  GetRating(Id: any) {
    let totalrating = +(this.ratingcontrol?.value || 0);
    this.productservice.addRating(+Id, totalrating).subscribe();
  }
  addToCart(item: IProduct) {
    //  this.store.dispatch(increment());
    if (!this.cartService.itemInCart(item)) {
      item.quantity = 1;
      this.cartService.addToCart(item); //add items in cart
    }
  }
}
