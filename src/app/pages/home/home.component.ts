import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CategoryComponent } from '../../../components/category/category.component';
import { ProductsComponent } from '../../../components/products/products.component';
import { AboutComponent } from '../../../components/about/about.component';
import { NeedComponent } from '../../../components/need/need.component';
import { BlogComponent } from '../../../components/blog/blog.component';
import { DiscountComponent } from '../../../components/discount/discount.component';
import { HomeComponentComponent } from '../../../components/home/home.component';
import { FileLoaderService } from '../../services/file-loader.service';
import { LoginpageComponent } from '../../../components/loginpage/loginpage.component';
import { ProductService } from '../../services/product.service';
import { DataService } from '../../services/data.service';
import { InventoryComponent } from '../../../components/inventory/inventory.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../components/footer/footer.component';
 
@Component({
  selector: 'app-home-component',
  imports: [RouterLink, HomeComponentComponent, CategoryComponent, ProductsComponent, DiscountComponent,
    AboutComponent, NeedComponent, BlogComponent, LoginpageComponent, InventoryComponent, NavbarComponent,NavbarComponent,CommonModule,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  jsonData: any;
  error: string = '';
message:string='';

receiveMessage(message:string){
  this.message= message;
}


  list=[
    {name:"Indoor Plants ",url:"assets/pics/Group 5.jpg"},
    {name:"Outdoor Plants",url:"assets/pics/image.jpg" },
    {name:"Pots and Accesories",url:"assets/pics/img.jpg" },
    {name:"Gift & Combos",url:"assets/pics/plant.jpg" },
    {name:"Seeds",url:"assets/pics/Group 7.jpg" }
  ];
  
  shopbycategory:any;
  topseller:any;
  needhelp:any;
  blogs:any;
  isAdmin: boolean = false;
  constructor(private dataservice: DataService) {}

   ngOnInit(): void {
       this.dataservice.Getdata().subscribe(
        (data) => {
          this.shopbycategory=data.shopbycategory;
          this.topseller= data.topseller;
          this.needhelp = data.needhelp;
          this.blogs = data.blogs;
        },
       )

       const login = JSON.parse(localStorage.getItem('login') || '{}');
   
       if (login.username == 'admin') {
         this.isAdmin = true;
       }
   }

  

   
}