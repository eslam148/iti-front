import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Iaddress } from '../Model/iaddress';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private httpOptions = {};
  constructor(private httpclient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
   }

   addUserAddress(address:Iaddress):Observable<Iaddress>{
    return this.httpclient.post<Iaddress>(`${environment.BaseURL}/AddUserAddress`,JSON.stringify(address),this.httpOptions)
   }

}
