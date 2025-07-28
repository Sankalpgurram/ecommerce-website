import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductInfoComponent } from '../product-info/product-info.component';
import { CartService } from '../../app/services/cart.service';
import { count } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-products',
  imports: [FormsModule, CommonModule,RouterModule,ProductInfoComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
// cards =[
//   {type:"Indoor Plant",name:"Monstera deliciosa",amount:499,isfavrouite:false,rating:4.8,url:"/assets/pics/home.jpg "},
//   {type:"Indoor Plant",name:"Monstera deliciosa",amount:499,isfavrouite:false,rating:4.8,url:"/assets/pics/product2.jpg"},
//   {type:"Indoor Plant",name:"Monstera deliciosa",amount:499,isfavrouite:false,rating:4.8,url:" /assets/pics/product3.jpg"},
//   {type:"Indoor Plant",name:"Monstera deliciosa",amount:499,isfavrouite:false,rating:4.8,url:" /assets/pics/product4.jpg"},
// ]

 @Input() topseller:any

constructor(private cartservice:CartService,private router:Router) {}
likedItems: boolean[] = [];

ngOnInit(): void {
    this.retrievedata();
    this.initializeLikes();
}



initializeLikes(): void {
  const storedLikes = localStorage.getItem('homelikes');
  if (storedLikes) {
    this.likedItems = JSON.parse(storedLikes);
  } else {
    this.likedItems = this.topseller.map(() => false);
  }
}

display: any[]=[];
  retrievedata(): void{
    const productData = localStorage.getItem('plant');
    if(productData){
     this.display = JSON.parse(productData);
     console.log("data:",this.display);
    }
   }

   transferdata(data: any) {
     
    console.log(data);
    this.cartservice.pushdata(data);
    localStorage.setItem('cart-details', JSON.stringify(data));
  
    this.router.navigate(['/product-info']);
  }

 addtocart(plants: any,event?:any) {
  event?.stopPropagation();
  const cartitems = {
    ...plants, 
    quantity: this.count,
    selectedsize:this.size
    
  };
  

  this.cartservice.addtocart(cartitems);
   alert(`${plants.name} added to cart!`);

}
count:number=1;
size:string='S';
selecteditemindex: number | null = null;

toggle(index: number, event?: any): void {
  event?.stopPropagation();
  this.likedItems[index] = !this.likedItems[index];
  localStorage.setItem('homelikes', JSON.stringify(this.likedItems));
}

nextImagesrc:string = '/assets/pics/like.png';
}
