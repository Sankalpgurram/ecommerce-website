import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../app/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule,FormsModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

profile=[
  {icon:"/assets/pics/Vector (1).png",name:"My Orders",arrow:"/assets/pics/Icon (7).png",link:"/myorders"},
  {icon:"/assets/pics/Icon (8).png",name:"Wishlist", arrow:"/assets/pics/Icon (7).png"},
  {icon:"/assets/pics/Vector (2).png",name:"Support", arrow:"/assets/pics/Icon (7).png"},
  {icon:"/assets/pics/Icon (9).png",name:"Logout", arrow:"/assets/pics/Icon (7).png",link:"/login"},
]


userdata: any = {};
constructor(private cartService: CartService) {}

ngOnInit(): void {
  this.retrievedata();
  this.cartService.cartCount$.subscribe(
    count => {
    this.cartCount = count;
}
) }


retrievedata(): void {
  const storedData = localStorage.getItem('login');
  if (storedData) {
    this.userdata = JSON.parse(storedData);
  }
}
cartCount: number = 0;
 

}
