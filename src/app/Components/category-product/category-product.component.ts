import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import { IProduct } from 'src/app/Model/IProduct';
import { ISubCategory } from 'src/app/Model/isub-category';
import {CartService} from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';
import { SubCategoryService } from 'src/app/Services/sub-category.service';

@Component({
  selector: 'app-category-product',
  templateUrl: './category-product.component.html',
  styleUrls: ['./category-product.component.css'],
})
export class CategoryProductComponent implements OnChanges, OnInit {
  subList: ISubCategory[] = [];
  products: IProduct[] = [];
  prodList: IProduct[] = [];
  subCatID!: number;
  min!: number;
  max!: number;
  lang: Observable<string>;

  constructor(
    private ProductService: ProductService,
    private activeroute: ActivatedRoute,
    @Inject(CartService) private CartService: CartService,
    private sub_serviece: SubCategoryService,
    private rout: ActivatedRoute,
    private prod_service: ProductService,
    private store: Store<{Language: string }>
  ) {
      this.lang = store.pipe(select('Language'));
    // this.activeroute.paramMap.subscribe((paramMap) => {
    //   let CatID = paramMap.get('id') ? Number(paramMap.get('id')) : 1;
    //   console.log(CatID);
    //   this.ProductService.GetProductByCategory(CatID).subscribe((data) => {
    //     this.products = data;
    //     console.log(this.products);
    //   });
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.rout.paramMap.subscribe((paramMap) => {
      let currentCatID = paramMap.get('id') ? Number(paramMap.get('id')) : 1;
      this.sub_serviece.getSubCategory(currentCatID).subscribe((subCat) => {
        this.subList = [];
        for (let sub of subCat) {
          this.subList.push(sub);
        }

        //console.log(this.subList);
      });
      this.ProductService.GetProductByCategory(currentCatID).subscribe(
        (data) => {
          // this.products = data;
          this.prodList = [];
          for (let pro of data) {
            this.prodList.push(pro);
          }
          console.log(this.prodList);
        }
      );
    });

    this.rout.paramMap.subscribe((paramMap) => {
      this.subCatID = paramMap.get('sub_id')
        ? Number(paramMap.get('sub_id'))
        : 1;
      this.prod_service.getProdBySubCatId(this.subCatID).subscribe((prod) => {
        this.prodList = [];
        for (let p of prod) {
          this.prodList.push(p);
        }
        //console.log(this.prodList);
      });
    });
  }

  FilterByPrice() {
    this.prod_service
      .getProdBySubCatIdAndPrice(this.subCatID, this.min, this.max)
      .subscribe((prod) => {
        this.prodList = [];
        for (let p of prod) {
          this.prodList.push(p);
        }
      });
    /* console.log(this.min);
    console.log(this.max); */
  }
  addToCart(item: IProduct) {
    if (!this.CartService.itemInCart(item)) {
      item.quantity = 1;
      this.CartService.addToCart(item); //add items in cart
    }
  }
}






