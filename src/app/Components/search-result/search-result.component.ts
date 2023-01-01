import { HttpClient } from '@angular/common/http';
import { IProduct } from './../../Model/IProduct';
import { ProductService } from './../../Services/product.service';
import { Component, OnDestroy, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './../../Services/cart.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent
  implements OnInit, OnDestroy, AfterViewInit, OnChanges
{
  products: IProduct[] = [];
  filterdProducts: IProduct[] = [];
  searchstring: string = '';
  lang: Observable<string>;

  constructor(
    private ProductService: ProductService,
    private _Route: ActivatedRoute,
    private CartService: CartService,
    private router: Router,
    private store: Store<{ Language: string }>
  ) {
      this.lang = store.pipe(select('Language'));

    this._Route.paramMap.subscribe((param) => {
      this.searchstring = param.get('ser') ? (param.get('ser') as string) : '';
      console.log(this.searchstring);
      this.ProductService.getAllProducts().subscribe((products) => {
        this.filterdProducts = this.products = products;
        //this.filterdProducts.filter((product) => product.name.startsWith(this.searchstring))
        console.log(this.filterdProducts);
        this.search();
      });

      console.log(this.products);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    //this.search()
  }
  ngAfterViewInit(): void {
    //console.log(this.products)
    //location.reload();
  }

  ngOnInit(): void {}
  addToCart(item: IProduct) {
    if (!this.CartService.itemInCart(item)) {
      item.quantity = 1;
      this.CartService.addToCart(item); //add items in cart
    }
  }
  search(): void {
    console.log(this.searchstring);
    if (this.searchstring) {
      console.log(this.products);
      this.filterdProducts = this.products.filter(
        (p) =>
          p.name
            .toLocaleLowerCase()
            .includes(this.searchstring.toLocaleLowerCase()) ||
          p.category
            .toLocaleLowerCase()
            .includes(this.searchstring.toLocaleLowerCase())
      );
      console.log(this.filterdProducts);
    } else {
      console.log('false');
      this.router.navigate(['/searching']);
      this.filterdProducts = this.products;
    }
    // location.reload();
  }
  ngOnDestroy(): void {
    // this.subscribe.unsubscribe();
  }
  ratingcount = 0;
  // Finalrating: any;

  ratingcontrol = new FormControl(0);

  // GetRating(count:number,rate:number):number {
  //   let Finalrating = +(rate / count).toFixed(2);
  //   console.log(Finalrating);
  //   return Finalrating;
  // }
}
