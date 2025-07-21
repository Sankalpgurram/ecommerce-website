import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //plants
private jsonURL= '/assets/data/plants.json';
  constructor(private http: HttpClient) { }
  fetchData(): Observable<any>{
    return this.http.get(this.jsonURL);
  }

//pots
 private json= '/assets/data/pots.json';
  
  fetch(): Observable<any>{
    return this.http.get(this.json);
  }

//seeds
  private jsonurl= '/assets/data/seeds.json';
  getdata(): Observable<any>{
    return this.http.get(this.jsonurl);
  }



  //home
  private jsonlink= '/assets/data/home.json';
  Getdata():Observable<any>{
    return this.http.get(this.jsonlink);
  }


//aboutpage
private link = '/assets/data/aboutpage.json';
derive():Observable<any> {
  return this.http.get(this.link);
}

//discount
private Link = ' /assets/data/discount.json';
derivedata():Observable<any>{
  return this.http.get(this.Link);
}


//info-page
private path = '/assets/data/product-info.json';
receivedata():Observable<any>{
  return this.http.get(this.path);
}


// //inventory-products
// private link1='/assets/data/inventory-products.json';
// providedata():Observable<any>{
//   return this.http.get(this.link1);
// }
}


