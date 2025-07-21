import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  SimilarProductsComponent } from './similar-products/similar-products.component';
import { Router } from '@angular/router';
import { DataService } from '../../app/services/data.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../app/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-product-info',
  imports: [CommonModule, SimilarProductsComponent, NavbarComponent, SimilarProductsComponent],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css'
})
export class ProductInfoComponent implements OnInit {

  activeTab: string = 'description';

  
setActiveTab(tabName: string) {
  this.activeTab = tabName;
}

  plants: any;
  description: any;
  info: any;
  review: any;
  rating: any;
  feedback: any;
  id: any;
  data: any;

  constructor(private dataservice: DataService, private cartservice: CartService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    // this.data = this.cartservice.getdata();
    let data = JSON.parse(localStorage.getItem('cart-details')||"{}");
    console.log(data);
    this.plants = data.plants;
    this.description = data.description;
    this.info = data.info;
    this.review = data.review;
    this.rating = data.rating;
    this.feedback = data.feedback;
    this.id = data.id;


  }
  addtocart(plants: any) {
    const cartitems = {
      ...plants,
      selectedsize: this.selectedsize,
      selectedmaterial: this.selectedmaterial,
      selectedcolor: this.selectedcolor,
      quantity: this.count

    };

    this.cartservice.addtocart(cartitems);
    alert(`${plants.name} added to cart!`);

  }
  count: number = 1;

  increase(): void {
    this.count++;
  }

  decrease(): void {
    if (this.count > 1) {
      this.count--;
    }
  }



  // background: string='white';
  // backgroundcolor1: string = 'white';
  // backgroundcolor2: string = 'white';
  // backgroundcolor3: string = 'white';
  // backgroundcolor4: string = 'white';
  // changecolor(size: string) {
  //   if (size == 'S') {
  //     this.backgroundcolor1 = this.backgroundcolor1 === 'white' ? '#9EFFCD' : 'white';
  //     this.backgroundcolor2 = this.backgroundcolor1 === '#9EFFCD' ? 'white' : 'white';
  //     this.backgroundcolor3 = this.backgroundcolor1 === '#9EFFCD' ? 'white' : 'white';


  //   }
  //   else if (size == 'M') {
  //     this.backgroundcolor1 = this.backgroundcolor2 === '#9EFFCD' ? 'white' : 'white';
  //     this.backgroundcolor2 = this.backgroundcolor2 === 'white' ? '#9EFFCD' : 'white';
  //     this.backgroundcolor3 = this.backgroundcolor2 === '#9EFFCD' ? 'white' : 'white';

  //   }
  //   else if (size == 'L') {
  //     this.backgroundcolor1 = this.backgroundcolor3 === '#9EFFCD' ? 'white' : 'white';
  //     this.backgroundcolor2 = this.backgroundcolor3 === '#9EFFCD' ? 'white' : 'white';
  //     this.backgroundcolor3 = this.backgroundcolor3 === 'white' ? '#9EFFCD' : 'white';

  //   }



  // }
  // background1: string= 'white';
  // background2: string= 'white';
  // background3: string= 'white';
  // background4: string= 'white';
  //   // isclicked: boolean = false;
  //   // togglecolor(): void {
  //   //   this.isclicked = !this.isclicked;
  //   // }


  //    togglecolor(size: string) {
  //      if (size == 'A') {
  //        this.background1 = this.background1 === 'white' ? '#9EFFCD' : 'white';
  //        this.background2 = this.background1 === '#9EFFCD' ? 'white' : 'white';
  //       this.background3 = this.background1 === '#9EFFCD' ? 'white' : 'white';
  //       this.background4 = this.background1 === '#9EFFCD' ? 'white' : 'white';
  //    }
  //     else if (size == 'B') {
  //        this.background1 = this.background2 === '#9EFFCD' ? 'white' : 'white';
  //        this.background2 = this.background2 === 'white' ? '#9EFFCD' : 'white';
  //       this.background3 = this.background2 === '#9EFFCD' ? 'white' : 'white';
  //       this.background4 = this.background2 === '#9EFFCD' ? 'white' : 'white';
  //     }
  //     else if (size == 'C') {
  //       this.background1 = this.background3 === '#9EFFCD' ? 'white' : 'white';
  //       this.background2 = this.background3 === '#9EFFCD' ? 'white' : 'white';
  //       this.background3 = this.background3 === 'white' ? '#9EFFCD' : 'white';
  //       this.background4 = this.background3 === '#9EFFCD' ? 'white' : 'white';
  //     }

  //     else if (size == 'D') {
  //      this.background1 = this.background4 === '#9EFFCD' ? 'white' : 'white';
  //       this.background2 = this.background4 === '#9EFFCD' ? 'white' : 'white';
  //       this.background3 = this.background4 === '#9EFFCD' ? 'white' : 'white';
  //       this.background4 = this.background4 === 'white' ? '#9EFFCD' : 'white';
  //     }



  //    }

 

  potColors = [
    { id: 'Q', classBorder: 'btn-border1', classColor: 'btn-color1', border: '2px solid white' },
    { id: 'W', classBorder: 'btn-border2', classColor: 'btn-color2', border: '2px solid white' },
    { id: 'E', classBorder: 'btn-border3', classColor: 'btn-color3', border: '2px solid white' }
  ];

  changeBorder(id: string) {
    this.selectedcolor = id;
    this.potColors = this.potColors.map(item => {
      if (item.id === id) {
        return { ...item, border: '2px solid #62E6A2' };
      } else {
        return { ...item, border: '2px solid white' };
      }
    });
  }




  potsize = [
    { id: 'S', classcolor: 'backgroundcolor1', background: 'white' },
    { id: 'M', classcolor: 'backgroundcolor2', background: 'white' },
    { id: 'L', classcolor: 'backgroundcolor3', background: 'white' }
  ];


  changesize(id: string) {
    this.selectedsize = id;
    this.potsize = this.potsize.map(item => {
      if (item.id === id) {
        return { ...item, background: '#9EFFCD' };
      } else {
        return { ...item, background: 'white' };
      }
    });
  }

  potmaterial = [
    { id: 'Ceramic', classcolor: 'backgroundcolor1', background: 'white' },
    { id: 'plastic', classcolor: 'backgroundcolor2', background: 'white' },
    { id: 'wood', classcolor: 'backgroundcolor3', background: 'white' },
    { id: 'metal', classcolor: 'backgroundcolor4', background: 'white' }
  ]

  changematerial(id: string) {
    this.selectedmaterial = id;
    this.potmaterial = this.potmaterial.map(item => {
      if (item.id === id) {
        return { ...item, background: '#9EFFCD' };
      } else {
        return { ...item, background: 'white' };
      }
    });
  }
 
  selectedsize: string = '';
  selectedmaterial: string = '';
  selectedcolor: string = '';

}

