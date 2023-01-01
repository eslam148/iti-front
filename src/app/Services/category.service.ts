import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ICategory } from '../Model/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
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
  getCategories(): Observable<ICategory[]> {
    // return this.HttpClient.get<ICategory[]>(`${environment.urlCategories}/category`)
    return this.httpclient.get<ICategory[]>(`${environment.BaseURL}/category`,this.httpOptions);
  }
}
