import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISubCategory } from '../Model/isub-category';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  private httpOptions = {};

  constructor(private httpclient: HttpClient) {
    const item = window.localStorage.getItem('token');
    let token: String = item ? JSON.parse(item) : '';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
  }

  getSubCategory(id: number): Observable<ISubCategory[]> {
    return this.httpclient.get<ISubCategory[]>(
      `${environment.baseURL}/GetSubCategory/${id}`,
      this.httpOptions
    );
  }
}


