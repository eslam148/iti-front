import { CategoryService } from './../../../Services/category.service';
import { ICategory } from './../../../Model/icategory';
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';
import { CartService } from '../../../Services/cart.service';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {IUserInfo, loginState} from 'src/app/Model/IUserLogIn';
import {languageAR, languageEN} from 'src/app/ReduxStore/actions/CartAction';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnChanges {
  loggedIn!: loginState;
  categories: ICategory[] = [];
  serchstd: string = '';
  CartCount: number = 0;
  count$: Observable<number>;
  userInfo!: IUserInfo;
  lang: Observable<string>;

  constructor(
    public translate: TranslateService,
    private CategoryService: CategoryService,
    private router: Router,
    private AuthService: AuthService,
    private CartService: CartService,
    private store: Store<{ Cart: number; Language: string }>
  ) {
    this.count$ = store.pipe(select('Cart'));
    this.lang = store.pipe(select('Language'));
  }
  ngOnChanges(): void {
    this.CartService.event.subscribe((c) => (this.CartCount = c));
    const item = window.localStorage.getItem('user');
    if (item) this.userInfo = this.loadUserInfo();
    this.check();
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    const item = window.localStorage.getItem('user');
    if (item) this.userInfo = this.loadUserInfo();
    this.AuthService.flag.subscribe((f: loginState) => (this.loggedIn = f));
    this.CategoryService.getCategories().subscribe((cat) => {
      this.categories = cat; //, console.log(this.categories);
    });
    console.log(this.translate.currentLang);
  }
  search(s: string) {
    this.router.navigate(['/searching', s]);
  }
  check() {
    //this.authService.loggedIn();
    this.AuthService.flag.subscribe((f) => (this.loggedIn = f));
    this.AuthService.logout().subscribe();
    this.router.navigate(['/home']);
  }
  loadUserInfo() {
    const item = window.localStorage.getItem('user');
    return item ? JSON.parse(item) : [];
  }
  changeLanguage(lang:string){
    if(lang=='ar'){
      this.store.dispatch(languageAR());
      this.translate.use('ar');
      localStorage.setItem('lang','ar');

    }
    else if(lang=='en'){
      localStorage.setItem('lang', 'en');
      this.store.dispatch(languageEN());
      this.translate.use('en');

    }
  }
}
