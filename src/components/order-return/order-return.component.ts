import { CommonModule, JsonPipe } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../app/services/cart.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-order-return',
  imports: [FormsModule,CommonModule,NavbarComponent],
  templateUrl: './order-return.component.html',
  styleUrl: './order-return.component.css'
})
export class OrderReturnComponent implements OnInit {
  search: string = '';
  ismoved = false;
  isshift = false;

  moveImage() {
    this.ismoved = !this.ismoved;  
  
  }

   movetext() {
    this.isshift = !this.isshift; 
   }


  constructor(private el: ElementRef,private cartservice:CartService) {}
  @HostListener('document:click',['$event']) onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
     
    console.log('Clicked element:', clickedElement.id);


    if(clickedElement.id != "search-container")
      { if(this.ismoved){
        this.ismoved = !this.ismoved;
        this.isshift = !this.isshift;
      }
       
    }

  }

cartitems: any[]=[];
totalprice: number = 0;

 
 
ngOnInit(): void {
     
    this.totalprice=this.cartservice.getprice();
    this.retrievedata();
}

retrievedata(): void{
 const storedData = localStorage.getItem('orders');
 if(storedData){
  this.cartitems = JSON.parse(storedData);
  console.log("data:",this.cartitems);
 }
}

// displaydata: any[] = [];
// retrievedata(): void {
//   const storedData = localStorage.getItem('orderplaced');
//   if (storedData) {
//     this.displaydata = JSON.parse(storedData);
    
//   }
// }

gettotal(): number{
  return this.cartitems.reduce((total,item)=> total + (item.quantity*item.price),0);
}

totalitems(): number{
  return this.cartitems.reduce((total,item)=> total+item.quantity, 0 );
}

addtoOrders(plants: any) {
}

}
