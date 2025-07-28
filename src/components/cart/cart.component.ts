import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from '../../app/services/cart.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,NavbarComponent,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

cartitems: any[]=[];
totalprice: number = 0;

// @HostListener('document:click', ['$event']) onClick(event: MouseEvent) {
//   const clickedElement = event.target as HTMLElement;

//   console.log('Clicked element:', clickedElement.id);

 
//   if (!clickedElement.closest('.error')) {
//     this.showerror=false;
//   } 
// }

constructor(private cartservice:CartService) {
  //this.calculatedValue = this.gettotal();
}

ngOnInit(): void {
    this.cartitems=this.cartservice.getcartitems();
  
    this.totalprice=this.cartservice.getprice();
    const couponFlag = localStorage.getItem('couponApplied');
    const couponDiscount = localStorage.getItem('couponDiscount');
  
    if (couponFlag === 'true' && couponDiscount) {
      this.couponApplied = true;
      this.couponDiscount = parseInt(couponDiscount, 10);
    }
    this.calculatetotals();
}



removeitem(index: number): void {
  this.cartservice.removeitem(index);
  this.cartitems = this.cartservice.getcartitems();
  this.calculatetotals();
}


 

  count: number = 1;

  increase(index: any): void {
    this.cartitems[index].quantity ++;
    this.saveUpdatedCart();
    this.calculatetotals();
  }
  showerror: boolean =false;
  decrease(index: number): void {
    if (this.cartitems[index].quantity > 1) {
      this.cartitems[index].quantity--;
      this.saveUpdatedCart();
      this.calculatetotals();
    } else {
      this.showerror = true;
  
  
      setTimeout(() => {
        this.showerror = false;
      }, 5000);
    }
  }
  
  
  saveUpdatedCart(): void {
    localStorage.setItem('cartitems',JSON.stringify(this.cartitems))};

cartvalue = [
  {name:'Items', amount:'4'},
  {name:'Total MRP', amount:''},
  {name:' Discount on MRP', amount:''},
  {name:' Taxes', amount:''},
  {name:' Shipping', amount:'Free'},
]

potsize=[
  {size:'S'},
  {size:'M'},
  {size:'L'},
]
 

// gettotal(): number{
//   let total = this.cartitems.reduce((total,item)=> total + (item.quantity*Number(item.price)),0);
//   return total;
// }

// totalitems(): number{
//   return this.cartitems.reduce((total,item)=> total+item.quantity, 0 );
// }

couponApplied: boolean = false;
couponDiscount: number = 0;
totalSavings: number = 0;
couponMessage: string = '';
readonly minCartValue: number = 1000;
readonly discountValue: number = 100;


 
addtoOrders() {
 
    // let orderDetails = JSON.stringify(this.cartitems);
     const totalvalue = this.gettotal();
     

}

 
 
  totalitems: number = 0;
  totalMRP: number = 0;
  tax: number = 0;
  totalamount: number = 0;

// calculatetotals(): void {
//   this.totalitems = this.cartitems.reduce((total,item)=> total+item.quantity, 0 );
//   this.totalMRP = this.cartitems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   this.tax = Math.round(this.totalMRP * 0.10);
//   this.totalamount = this.totalMRP + this.tax;
// }

gettotal(): number {
  const grossTotal = this.totalMRP + this.tax;
  return grossTotal - (this.couponApplied ? this.discountValue : 0);
}


calculatetotals(): void {
  this.totalitems = this.cartitems.reduce((total, item) => total + item.quantity, 0);
  this.totalMRP = this.cartitems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  this.tax = Math.round(this.totalMRP * 0.10);

  const grossTotal = this.totalMRP + this.tax;

  if (this.couponApplied && grossTotal < this.minCartValue) {
    this.couponApplied = false;
    this.couponDiscount = 0;
    this.totalSavings = 0;
    this.couponMessage = '';
  }

  this.totalSavings = this.couponApplied ? this.discountValue : 0;
  this.totalamount = grossTotal - this.totalSavings;
}

applyCoupon(): void {
  const grossTotal = this.totalMRP + this.tax;

  if (grossTotal >= this.minCartValue && !this.couponApplied) {
    this.couponApplied = true;
    this.couponDiscount = this.discountValue;
    this.totalamount = grossTotal - this.couponDiscount;
    this.totalSavings = this.couponDiscount;
    this.couponMessage = 'Coupon Applied';

   
    localStorage.setItem('couponApplied', 'true');
    localStorage.setItem('couponDiscount', this.couponDiscount.toString());
  } else if (grossTotal < this.minCartValue) {
    const remaining = this.minCartValue - grossTotal;
    this.couponMessage = `Shop for ₹${remaining} more to apply this coupon.`;

    setTimeout(() => {
      this.couponMessage = '';
    }, 2000);
  }
}

removeCoupon(): void {
  this.couponApplied = false;
  this.couponDiscount = 0;
  localStorage.removeItem('couponApplied');
  localStorage.removeItem('couponDiscount');
  this.calculatetotals();
  this.couponMessage = '';
  setTimeout(() => {
    this.couponMessage = '';
  }, 2000);
}


}


