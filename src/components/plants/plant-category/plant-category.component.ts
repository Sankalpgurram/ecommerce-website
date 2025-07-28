import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { CartService } from '../../../app/services/cart.service';
import { DataService } from '../../../app/services/data.service';
import { NavbarComponent } from '../../navbar/navbar.component';
@Component({
  selector: 'app-plant-category',
  imports: [CommonModule, NavbarComponent,RouterLinkActive],
  templateUrl: './plant-category.component.html',
  styleUrl: './plant-category.component.css'
})
export class PlantCategoryComponent implements OnInit {

  @Input() plants: any
  @Input() filter: any;


  constructor(private cartservice: CartService, private router: Router, private data: DataService) {
  }

  ngOnInit(): void {
    this.updatePagination();
    const savedLikes = localStorage.getItem('likedplants');
    if (savedLikes) {
      this.likedItems = new Set<number>(JSON.parse(savedLikes));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['plants']) {
      this.currentpage = 1;  
      this.updatePagination();
    }
  }


  updatePagination(): void {
    this.totalpages = Math.ceil((this.plants?.length || 0) / this.itemsperpage);
    this.calculatePageNumbers();
    this.paginateitems();
  }


  transferdata(data: any) {
    console.log(data);
    this.cartservice.pushdata(data);
    localStorage.setItem('cart-details', JSON.stringify(data));
  
    this.router.navigate(['/product-info']);
  }

  addtocart(plants: any, event?: any) {
    event?.stopPropagation();
    const cartitems = {
      ...plants,
      quantity: this.count,
      selectedsize: this.size

    };

    this.cartservice.addtocart(cartitems);
    alert(`${plants.name} added to cart!`);

  }
  count: number = 1;
  size: string = 'S';


  allitems: any;
  pageditems: any[] = [];
  currentpage: number = 1;
  itemsperpage: number = 8;
  totalpages: any;


  pageNumbers: number[] = [];

  calculatePageNumbers(): void {
    this.pageNumbers = [];
    for (let i = 1; i <= this.totalpages; i++) {
      this.pageNumbers.push(i);
    }
  }


  calculatetotalpages(): void {
    this.totalpages = Number(Math.ceil(this.allitems.plants.length / this.itemsperpage))
  }

  paginateitems(): void {
    const startindex = (this.currentpage - 1) * this.itemsperpage;
    const endindex = startindex + this.itemsperpage;

    this.pageditems = this.plants.slice(startindex, endindex);


    console.log("Page:", this.currentpage, "Items:", this.pageditems);
  }

  gotopage(page: number): void {
    if (page >= 1 && page <= this.totalpages) {
      this.currentpage = page;
      this.paginateitems();

    }
  }

  // selecteditemindex: number | null = null;
  likedItems = new Set<number>();


  toggle(index: number, event?: any): void {
    event?.stopPropagation();
    if (this.likedItems.has(index)) {
      this.likedItems.delete(index);  
    } else {
      this.likedItems.add(index);  
    }
    localStorage.setItem('likedplants', JSON.stringify(Array.from(this.likedItems)));
  }
  
  nextImagesrc:string = '/assets/pics/like.png';
}
