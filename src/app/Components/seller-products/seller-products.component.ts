import { Component } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {IProduct} from 'src/app/Model/IProduct';
import {ProductService} from '../../Services/product.service'
@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css'],
})
export class SellerProductsComponent {
  products: IProduct[] = [];
  lang: Observable<string>;

  constructor(
    private ProductService: ProductService,
    public translate: TranslateService,
    private store: Store<{ Language: string }>
  ) {
    this.lang = store.pipe(select('Language'));
    console.log(this.lang);
    const item = window.localStorage.getItem('user');
    let user = item ? JSON.parse(item) : [];
    // console.log(user);

    ProductService.getSellerproducts(user.id).subscribe((p) => {
      this.products = p;
      // console.log(p);
    });
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      // do something
     event.lang;
    });
  }
}
