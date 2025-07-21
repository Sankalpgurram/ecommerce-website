import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  //inventory-products
  private link1='/assets/data/inventory-products.json';
  constructor(private http:HttpClient ) {}
  providedata():Observable<any>{
    return this.http.get(this.link1)
  }

  //customerpage
  private url='/assets/data/customer.json';
  getdata():Observable<any>{
    return this.http.get(this.url);
  }

  //orderspage
  private link='/assets/data/orders.json';
  fetch():Observable<any>{
    return this.http.get(this.link);
  }

  //promotions
  private path='/assets/data/promotions.json';
  fetchdata():Observable<any>{
    return this.http.get(this.path);
  }

  //payments
  private src='/assets/data/payments.json';
  Getdata():Observable<any>{
    return this.http.get(this.src);
  }

}
