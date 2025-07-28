import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CartService } from '../../../app/services/cart.service';

@Component({
  selector: 'app-seedcategory',
  imports: [CommonModule],
  templateUrl: './seedcategory.component.html',
  styleUrl: './seedcategory.component.css'
})
export class SeedcategoryComponent implements OnInit, OnChanges {

  @Input() filter: any;
  @Input() seeds: any
  @Output() pageditemscount = new EventEmitter<number>();
  constructor(private cartservice: CartService) { }

  ngOnInit(): void {
    this.updatePagination();
  }


  transferdata(data: any) {
    console.log(this.seeds)
    this.cartservice.pushdata(data);
  }

  addtocart(seeds: any, event?: any) {
    event?.stopPropagation();
    const cartitems = {
      ...seeds,
      quantity: this.count,


    };
    this.cartservice.addtocart(cartitems);
    alert(`${seeds.name} added to cart!`);
  }

  count: number = 1;




  ngOnChanges(changes: SimpleChanges): void {
    if (changes['seeds'] && this.seeds) {
      this.updatePagination();
      this.currentpage = 1;  
    }
  }


  updatePagination(): void {
    this.totalpages = Math.ceil((this.seeds?.length || 0) / this.itemsperpage);
    this.calculatePageNumbers();
    this.paginateitems();
  }


  pageNumbers: number[] = [];

  calculatePageNumbers(): void {
    this.pageNumbers = [];
    for (let i = 1; i <= this.totalpages; i++) {
      this.pageNumbers.push(i);
    }
  }


  pageditems: any[] = [];
  currentpage: number = 1;
  itemsperpage: number = 8;
  totalpages: any;





  paginateitems(): void {

    const startindex = (this.currentpage - 1) * this.itemsperpage;
    const endindex = startindex + this.itemsperpage;
    this.pageditems = this.seeds.slice(startindex, endindex);
    this.pageditemscount.emit(this.pageditems.length);
  }


  gotopage(page: number): void {
    if (page >= 1 && page <= this.totalpages) {
      this.currentpage = page;
      this.paginateitems();

    }
  }

  selecteditemindex: number | null = null;

  toggle(index:number,event?:any): void {
    event?.stopPropagation();
    this.selecteditemindex = this.selecteditemindex === index ? null : index;
  }
  nextImagesrc:string = '/assets/pics/like.png';

}