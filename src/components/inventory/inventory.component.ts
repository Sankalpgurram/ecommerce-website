import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InventoryProductsComponent } from '../inventory-products/inventory-products.component';

@Component({
  selector: 'app-inventory',
  imports: [RouterLink,CommonModule,RouterLinkActive],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {

buttons=[
  {name:"Dashboard",link:"/dashboard",pic:"/assets/pics/dasboard.png"},
  {name:"Products",link:"/inventory-products",pic:"/assets/pics/product.png"},
  {name:"Customers",link:"/customer",pic:"/assets/pics/customer.png"},
  {name:"Orders and Returns",link:"/orders",pic:"/assets/pics/orders.png"},
  {name:"Promotions & Banners ",link:"/promotions",pic:"/assets/pics/promotion.png"},
  {name:"Payments",link:'/payments',pic:"/assets/pics/payment.png"},
  // {name:"Settings",link:''},


]

}
