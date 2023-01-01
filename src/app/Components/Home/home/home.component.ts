import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Model/IProduct';
import { ProductService } from 'src/app/Services/product.service';
import { CartService } from 'src/app/Services/cart.service';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productList: IProduct[] = [];
  bestSellerList: IProduct[] = [];
  DiscountedProducts: IProduct[] = [];
  image: string[] = [];
  count$: Observable<number>;
  lang: Observable<string>;
  constructor(
    private produtService: ProductService,
    private CartService: CartService,
    private store: Store<{ Cart: number, Language: string }>
  ) {
    this.count$ = store.pipe(select('Cart'));
     this.lang = store.pipe(select('Language'));
  }

  ngOnInit(): void {
    this.produtService.getNewproducts().subscribe((p) => {
      this.productList = p;
    });
    this.produtService
      .getBestSellerproducts()
      .subscribe((p) => (this.bestSellerList = p));
    this.produtService
      .GetDescountedProducts()
      .subscribe((p) => (this.DiscountedProducts = p));
  }

  addToCart(item: IProduct) {
    //  this.store.dispatch(increment());
    this.CartService.addToCart(item); //add items in cart
  }
}
