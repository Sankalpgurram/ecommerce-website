import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../../app/services/cart.service';
import { DataService } from '../../../app/services/data.service';


@Component({
  selector: 'app-potscategory',
  imports: [CommonModule],
  templateUrl: './potscategory.component.html',
  styleUrl: './potscategory.component.css'
})
export class PotscategoryComponent implements OnInit, OnChanges
 {
   

  @Input() pots: any
  @Input() filter: any;
  constructor(private cartservice: CartService, public dataservice: DataService) { }

  ngOnInit(): void {
    this.updatePagination();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pots'] && this.pots) {
      this.currentpage = 1;  
      this.updatePagination();
    }
  }

 

  updatePagination(): void {
    this.totalpages = Math.ceil((this.pots?.length || 0) / this.itemsperpage);
    this.calculatePageNumbers();
    this.paginateitems();
  }

  transferdata(data: any) {
   
    this.cartservice.pushdata(data);

  }

  addtocart(pots: any, event?: any) {
    event?.stopPropagation();
    const cartitems = {
      ...pots,
      quantity: this.count,


    };

    this.cartservice.addtocart(cartitems);
    alert(`${pots.name} added to cart!`);

  }
  count: number = 1;

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
  totalpages: number=0;





  paginateitems(): void {
    
    const startindex = (this.currentpage - 1) * this.itemsperpage;
    const endindex = startindex + this.itemsperpage;
    this.pageditems = this.pots.slice(startindex, endindex);
  }
  

  gotopage(page: number): void {
    if (page >= 1 && page <= this.totalpages) {
      this.currentpage = page;
      this.paginateitems();

    }
  }





}
