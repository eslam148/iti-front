import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileToUpload, IProduct } from '../Model/IProduct';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpOptions = {};

  constructor(private httpclient: HttpClient,private router:Router) {
    const item = window.localStorage.getItem('token');
    let token: String = item ? JSON.parse(item) : '';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
  }
  GetProductByCategory(CatId: number): Observable<IProduct[]> {
    return this.httpclient.get<IProduct[]>(
      `${environment.baseURL}/ShowProductByCategory/${CatId}`,
      this.httpOptions
    );
  }
  GetProductByID(Id: number): Observable<IProduct> {
    return this.httpclient.get<IProduct>(
      `${environment.baseURL}/GetProductById/${Id}`,
      this.httpOptions
    );
  }
  getProdBySubCatId(sub_id: number): Observable<IProduct[]> {
    return this.httpclient.get<IProduct[]>(
      `${environment.baseURL}/ShowProductBySubCat/${sub_id}`,
      this.httpOptions
    );
  }

  getProdBySubCatIdAndPrice(
    sub_id: number,
    min_pr: number,
    max_pr: number
  ): Observable<IProduct[]> {
    return this.httpclient.get<IProduct[]>(
      `${environment.baseURL}/GetProductByCatAndPrice/${sub_id}&${min_pr}&${max_pr}`,
      this.httpOptions
    );
  }

  getAllProducts(): Observable<IProduct[]> {
    return this.httpclient.get<IProduct[]>(
      `${environment.baseURL}/GetProducts`,
      this.httpOptions
    );
  }
  GetDescountedProducts(): Observable<IProduct[]> {
    return this.httpclient.get<IProduct[]>(
      `${environment.baseURL}/GetDescountedProducts`,
      this.httpOptions
    );
  }

  getNewproducts(): Observable<IProduct[]> {
    return this.httpclient.get<IProduct[]>(
      `${environment.BaseURL}/GetNewProducts`,
      this.httpOptions
    );
  }

  getBestSellerproducts(): Observable<IProduct[]> {
    return this.httpclient.get<IProduct[]>(
      `${environment.BaseURL}/GetBestSeller`,
      this.httpOptions
    );
  }
  addNewProduct(theFile: IProduct): Observable<IProduct> {
    return this.httpclient
      .post<IProduct>(
        'http://eslam1998-001-site1.gtempurl.com/MVC/AddProduct', //http://localhost:5291/MVC/AddProduct',
        theFile,
        this.httpOptions
      ).pipe(
        map((userResponse) => {
           setTimeout(() => {}, 2000);
          this.router.navigate(['/SellerProduct']);
        }),
        catchError((error) => {
          setTimeout(()=>{},2000)
                    this.router.navigate(['/SellerProduct']);

          return of(error);
        })
      );
  }

  getSellerproducts(SellerId: string): Observable<IProduct[]> {
    // console.log(SellerId);
    return this.httpclient.get<IProduct[]>(
      `${environment.BaseURL}/GetSellerProduct/${SellerId}`,
      this.httpOptions
    );
  }
  addRating(Id: number, Rate: number): Observable<any> {
    return this.httpclient.post<any>(
      `${environment.BaseURL}/Rating/${Id}/${Rate}`,
      this.httpOptions
    );
  }

  getDiscount(): Observable<any> {
    return this.httpclient.get<IProduct[]>(
      `${environment.BaseURL}/GetDiscounts`,
      this.httpOptions
    );
  }

  Edit(EditProduct:IProduct,id:number): Observable<IProduct> {
    EditProduct.no = id;
    console.log(id);
     return this.httpclient.post<IProduct>(
       `${environment.BaseURL}/EditProduct`,
       EditProduct,
       this.httpOptions
     );
  }
}
