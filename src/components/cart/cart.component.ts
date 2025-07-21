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
}



removeitem(index: number): void {
  this.cartservice.removeitem(index);
  this.cartitems = this.cartservice.getcartitems();
}


 

  count: number = 1;

  increase(index: any): void {
    this.cartitems[index].quantity ++;
    this.saveUpdatedCart();
  
  }
  showerror: boolean =false;
  decrease(index: number): void {
    if (this.cartitems[index].quantity > 1) {
      this.cartitems[index].quantity--;
      this.saveUpdatedCart();
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
 

gettotal(): number{
  let total = this.cartitems.reduce((total,item)=> total + (item.quantity*Number(item.price)),0);
  return total;
}

totalitems(): number{
  return this.cartitems.reduce((total,item)=> total+item.quantity, 0 );
}


 
addtoOrders() {
 
    // let orderDetails = JSON.stringify(this.cartitems);
     const totalvalue = this.gettotal();
     

}

}


