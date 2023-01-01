import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ICategory} from 'src/app/Model/icategory';
import {IDiscount} from 'src/app/Model/IDiscount';
import {ISubCategory} from 'src/app/Model/isub-category';
import {CategoryService} from 'src/app/Services/category.service';
import {ProductService} from 'src/app/Services/product.service';
import { SubCategoryService } from 'src/app/Services/sub-category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  productFormGroup: FormGroup;
  categoryList: ICategory[] = [];
  subCategoryList: ISubCategory[] = [];
  Discounts: IDiscount[] = [];
  productID!: number;
  lang: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private SubCategoryService: SubCategoryService,
    private route: ActivatedRoute,
    private store: Store<{ Language: string }>
  ) {
    this.lang = store.pipe(select('Language'));

    this.productFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      nameAr: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      description: ['', [Validators.required]],
      descriptionAr: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      discountID: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
    this.categoryService.getCategories().subscribe((c) => {
      this.categoryList = c;
    });
    this.productService.getDiscount().subscribe((d) => (this.Discounts = d));

    this.route.paramMap.subscribe((paramMap) => {
      this.productID = paramMap.get('id') ? Number(paramMap.get('id')) : 0;
      if (this.productID <= 0) {
        router.navigate(['/SellerProduct']);
      }
    });
  }

  get category() {
    return this.productFormGroup.get('category');
  }
  get name() {
    return this.productFormGroup.get('name');
  }
  get nameAr() {
    return this.productFormGroup.get('nameAr');
  }
  get price() {
    return this.productFormGroup.get('price');
  }
  get quantity() {
    return this.productFormGroup.get('quantity');
  }
  get description() {
    return this.productFormGroup.get('description');
  }
  get descriptionAr() {
    return this.productFormGroup.get('descriptionAr');
  }
  get subCategory() {
    return this.productFormGroup.get('subCategory');
  }
  get discountID() {
    return this.productFormGroup.get('discountID');
  }

  Edit() {
    console.log('Edit');
    this.productService
      .Edit(this.productFormGroup.value, this.productID)
      .subscribe(o=>this.router.navigate(['/SellerProduct']));
  }

  GetSubcat(CatId: number) {
    this.SubCategoryService.getSubCategory(CatId).subscribe(
      (sub) => (this.subCategoryList = sub)
    );
  }
  loadUserInfo() {
    const item = window.localStorage.getItem('user');

    return item ? JSON.parse(item) : [];
  }
}
