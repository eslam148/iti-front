import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { ICategory } from 'src/app/Model/icategory';
import { FileToUpload, IProduct } from 'src/app/Model/IProduct';
import { Router } from '@angular/router';
import {IUserInfo} from 'src/app/Model/IUserLogIn';
import { SubCategoryService } from 'src/app/Services/sub-category.service';
import {ISubCategory} from 'src/app/Model/isub-category';
import {IDiscount} from 'src/app/Model/IDiscount';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, OnChanges {
  categoryList: ICategory[] = [];
  subCategoryList: ISubCategory[] = [];
  newPrd: IProduct = {} as IProduct;
  prdList: IProduct[] = [];
  lang: Observable<string>;

  //for uploud image
  UploadImage: boolean = false;
  theFile: any[] = [];
  files: FileToUpload[] = [];
  Discounts: IDiscount[] = [];
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private SubCategoryService: SubCategoryService,
    private store: Store<{ Language: string }>
  ) {
          this.lang = store.pipe(select('Language'));

  }
  ngOnChanges(): void {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((c) => {
      this.categoryList = c;
    });
    this.productService.getDiscount().subscribe((d) => {
      console.log(d)
      this.Discounts = d});
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
  InsertNewProduct() {
    this.newPrd.files = this.files;
    let userInfo: IUserInfo = this.loadUserInfo();
    this.newPrd.sellerId = userInfo.id;
    console.log(this.newPrd.quantity);
    this.productService.addNewProduct(this.newPrd).subscribe((p) => {
      console.log(p);
      this.router.navigate(['/SellerProduct']);
    });
    setTimeout(() => {
      this.router.navigate(['/SellerProduct']);
    }, 2000);
  }
  onFileChange(event: any) {
    this.theFile = [];
    if (event.target.files) {
      for (let img of event.target.files) this.theFile.push(img);
    }
  }
  uploadFile(): void {
    for (let img of this.theFile) {
      console.log(img);
      this.readAndUploadFile(img);
    }
    this.UploadImage = true;
  }
  private readAndUploadFile(theFile: any) {
    let file: FileToUpload = {
      fileName: '',
      fileAsBase64: '',
    };

    // Set File Information
    file.fileName = theFile.name;

    // Use FileReader() object to get file to upload
    // NOTE: FileReader only works with newer browsers
    let reader!: FileReader;
    reader = new FileReader();

    // Setup onload event for reader
    reader.onload = () => {
      // Store base64 encoded representation of file
      file.fileAsBase64 = reader.result!.toString();
      console.log(file.fileAsBase64);

      this.files.push(file);
    };

    // Read the file
    reader.readAsDataURL(theFile);
  }
}
