import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InventoryComponent } from '../inventory/inventory.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from '../../app/app.routes';
import { DataService } from '../../app/services/data.service';
import { InventoryService } from '../../app/services/inventory.service';

@Component({
  selector: 'app-inventory-products',
  imports: [FormsModule, InventoryComponent, RouterLink, CommonModule],
  templateUrl: './inventory-products.component.html',
  styleUrl: './inventory-products.component.css'
})
export class InventoryProductsComponent implements OnInit {
  search: string = '';
  ismoved = false;
  isshift = false;

  moveImage() {
    this.ismoved = !this.ismoved;

  }

  movetext() {
    this.isshift = !this.isshift;
  }


  constructor(private el: ElementRef,private products:InventoryService) { }
  @HostListener('document:click', ['$event']) onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    console.log('Clicked element:', clickedElement.id);


    if (clickedElement.id != "search-container") {
      if (this.ismoved) {
        this.ismoved = !this.ismoved;
        this.isshift = !this.isshift;
      }

    }

    if (!clickedElement.closest('.dropdown3')) {
      this.showdata = false;
    }

    if (!clickedElement.closest('.dropdown2')) {
      this.showcontent = false;
      this.color = false;
    }

  }

  allitems: any;
  pageditems:any[]=[];
  currentpage:number=1;
  itemsperpage:number=6;
  totalpages: number=3;

 ngOnInit(): void {
     this.products.providedata().subscribe(
      (data)=>{
        this.allitems=data;
        this.retrievedata();
        this.selectedbtn='Amount';
      },
     )
 }

calculatetotalpages():void{
this.totalpages= Number(Math.ceil(this.allitems.plants.length /this.itemsperpage))
}

paginateitems():void{
  const startindex=(this.currentpage-1)*this.itemsperpage;
  const endindex= startindex +this.itemsperpage;
  
  this.pageditems= this.allitems.plants.slice(startindex,endindex);
  console.log("Page:", this.currentpage, "Items:", this.pageditems);
}

gotopage(page:number):void{
  if(page>=1 && page<=this.totalpages){
    this.currentpage=page;
    this.paginateitems();

  }
}


displaydata: any[] = [];
originalData: any[] = [];
retrievedata(): void {
  const storedData = localStorage.getItem('plantdata');
  if (storedData) {
    this.originalData = JSON.parse(storedData);   
    this.displaydata = [...this.originalData];   
    this.calculateTotals();
  }
}



totalRevenue: number = 0;
totalSales: number = 0;
calculateTotals(): void {
  this.totalRevenue = this.displaydata.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
  this.totalSales = this.displaydata.reduce((sum: number, item: any) => sum + (item.sales || 0), 0);
}



applySearch(): void {
  if (this.search && this.search.trim()) {
    this.displaydata = this.originalData.filter((item: any) =>
      item.plants.name.toLowerCase().includes(this.search.toLowerCase()) ||
      item.plants.type.toLowerCase().includes(this.search.toLowerCase())
    );
  } else {
    this.displaydata = [...this.originalData];  
  }

  this.calculateTotals();   
}


filter = [
  { name: "Date of Order ", background: "white" },
  { name: "Date of Delivery ", background: "white" },
]

selectedbutton: string = '';

changecolor(id: string) {
  this.selectedbutton = id;
  this.filter = this.filter.map(item => {
    if (item.name === id) {
      return { ...item, background: '#9EFFCD' };
    } else {
      return { ...item, background: 'white' };
    }
  });
}


showcontent: boolean = false;
color: boolean = false;

visible() {
  this.showcontent = !this.showcontent;
  this.color = !this.color;
  if (this.showcontent) {
    this.showdata = false;
  } }

showdata: boolean = false;

show() {
  this.showdata = !this.showdata;

  
  if (this.showdata) {
    this.showcontent = false;
    this.color = false;
  }
}


selectedvalue: any;
sort = [
  { id: 1, name: "Sales", value: "sales" },
  { id: 2, name: "Amount", value: "amount" },
  { id: 3, name: "Top rated", value: "rate" },
 
];


activeSort: 'asc' | 'dsc' | '' = '';


fromDate: string = '';
toDate: string = '';

applyFilter(): void {
  let filteredItems = [...this.displaydata];

  if (this.fromDate && this.toDate) {
    const from = new Date(this.fromDate + 'T00:00:00');
    const to = new Date(this.toDate + 'T23:59:59');

    filteredItems = filteredItems.filter(item => {
      if (!item.checkoutDate) return false;

      const orderDate = new Date(item.checkoutDate);

      return orderDate >= from && orderDate <= to;
    });
  }

}




amountSort: string = '';
selectedbtn: any;
sorting(sortingOrder: 'asc' | 'dsc'): void {
  if (!this.selectedbtn) return;

  let sorted = [...this.displaydata];

  switch (this.selectedbtn) {
    case 'amount':
      sorted.sort((a, b) => sortingOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount);
      break;
    case 'sales':
      sorted.sort((a, b) => sortingOrder === 'asc' ? a.sales - b.sales : b.sales - a.sales);
      break;
    case 'rate':
      sorted.sort((a, b) => sortingOrder === 'asc'
        ? Number(a.plants.rate || 0) - Number(b.plants.rate || 0)
        : Number(b.plants.rate || 0) - Number(a.plants.rate || 0));
      break;
  }

  this.displaydata = sorted;
  this.activeSort = sortingOrder;

  this.currentpage = 1;
  this.paginateitems();
}


clearSort() {
  this.selectedbtn = 'amount';  
  this.sorting('asc');    
  this.retrievedata();      
}

clearFilters(): void {
  this.fromDate = '';
  this.toDate = '';
  this.selectedbutton = '';
  this.selectedbtn = 'Amount';  
  this.filter = this.filter.map(item => ({ ...item, background: 'white' }));
 
  this.currentpage = 1;
  this.calculatetotalpages();
 
  this.paginateitems();
}

}
