import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];
  private data: any[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    const storedCart = localStorage.getItem('cart');
    this.items = storedCart ? JSON.parse(storedCart) : [];
    this.updateCartCount();
  }


  addtocart(product: any) {
    this.items.push(product);
    this.saveCart();
    this.updateCartCount();
  }

  // addtocart(product: any): string {
  //   const existingItem = this.items.find(item => item.id === product.id);
  
  //   if (existingItem) {
  //     const totalQty = existingItem.quantity + product.quantity;
  
  //     if (totalQty > product.plants.quantity) {
  //       return 'Quantity exceeds available stock';
  //     } else {
  //       existingItem.quantity = totalQty;
  //     }
  //   } else {
  //     if (product.quantity > product.plants.quantity) {
  //       return 'Quantity exceeds available stock';
  //     }
  //     this.items.push(product);
  //   }
  
  //   this.saveCart();
  //   this.updateCartCount();
  //   return 'Added successfully';
  // }
  
  getcartitems(): any[] {
    return this.items;
  }

  getprice(): number {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartCount();
  }

  removeitem(index: number): void {
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
      this.updateCartCount();
    }
   
  }


  getdata(): any[] {
    console.log(this.data)
    return this.data;
  }

  pushdata(data: any) {
    this.data = [];
    this.data.push(data);
  }

  updateCartCount(): void {
    const cart = this.getcartitems();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    this.cartCountSubject.next(count);
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

}
