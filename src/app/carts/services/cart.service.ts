import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) {  }
  getAllCarts(param?: any) {
    let params = new HttpParams();
    if (param?.start) {
      params = params.append('startdate', param.start);
    }
    if (param?.end) {
      params = params.append('enddate', param.end);
    }
    return this.http.get(environment.baseApi + 'carts', { params });
  }

  deleteCart(id:number){
    return this.http.delete(environment.baseApi + 'carts/'+id);
  }
}
