import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { InventoryComponent } from '../inventory/inventory.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService } from '../../app/services/inventory.service';

@Component({
  selector: 'app-orders',
  imports: [InventoryComponent, CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  search: string = '';
  ismoved = false;
  isshift = false;

  moveImage() {
    this.ismoved = !this.ismoved;

  }

  movetext() {
    this.isshift = !this.isshift;
  }


  constructor(private el: ElementRef, private order: InventoryService) {

  }
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

  

  applySearch(): void {
    let filteredItems = [...this.allitems.customer];
  
    if (this.search && this.search.trim()) {
      filteredItems = filteredItems.filter((item: any) =>
        item.name.toLowerCase().includes(this.search.toLowerCase()) ||
        item.id.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  
    this.payment = filteredItems;  
    this.totalpages = Math.ceil(this.payment.length / this.itemsperpage);
    this.currentpage = 1;
    this.calculatePageNumbers();
    this.paginateitems();
  }
  


  header: any;
  customer: any;

 
 
  

  ngOnInit(): void {

    this.order.fetch().subscribe((data) => {
      this.allitems = {};
      this.allitems.header = data.header;
   
      const storedData = localStorage.getItem('checkoutdetails');
      this.allitems.customer = storedData ? JSON.parse(storedData) : [];
      this.payment = [...this.allitems.customer]; 
      this.calculatetotalpages();
      this.updatePagination();
      this.paginateitems();
      this.selectedbtn = 'Amount'
    });
  }

  
  calculatetotalpages(): void {
    this.totalpages = Number(Math.ceil(this.allitems.customer.length / this.itemsperpage))
  }


  updatePagination(): void {
    this.totalpages = Math.ceil((this.payment.length || 0) / this.itemsperpage);
    this.calculatePageNumbers();
    this.paginateitems();
  }

  count: number = 1;

  pageNumbers: number[] = [];

  calculatePageNumbers(): void {
    this.pageNumbers = [];
    for (let i = 1; i <= this.totalpages; i++) {
      this.pageNumbers.push(i);
    }
  }
  payment: any[] = [];  
allitems:any;
  pageditems: any[] = [];
  currentpage: number = 1;
  itemsperpage: number = 10;
  totalpages: number=0;


  paginateitems(): void {
    const startindex = (this.currentpage - 1) * this.itemsperpage;
    const endindex = startindex + this.itemsperpage;
    this.pageditems = this.payment.slice(startindex, endindex);

  }
  
  

  gotopage(page: number): void {
    if (page >= 1 && page <= this.totalpages) {
      this.currentpage = page;
      this.paginateitems();

    }
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


  selecteditemindex: number | null = null;

  toggle(index: number): void {
    this.selecteditemindex = this.selecteditemindex === index ? null : index;
    console.log("image clicked");
  }


  selectedvalue: any;
  sort = [
    { id: 1, name: "Order ID", value: "Order ID" },
    { id: 2, name: "Customer name", value: "Customer name" },
    { id: 3, name: "Total Items", value: "Total Items" },
    { id: 4, name: "Amount", value: "Amount" },
  ];

  
  activeSort: 'asc' | 'dsc' | '' = '';


  fromDate: string = '';
  toDate: string = '';
  
  applyFilter(): void {
    let filteredItems = [...this.allitems.customer];
  
    if (this.fromDate && this.toDate) {
      const from = new Date(this.fromDate + 'T00:00:00');
      const to = new Date(this.toDate + 'T23:59:59');
  
      filteredItems = filteredItems.filter(item => {
        if (!item.checkoutDate) return false;
  
        const orderDate = new Date(item.checkoutDate);
        return orderDate >= from && orderDate <= to;
      });
    }
  
    this.payment = filteredItems;   
    this.totalpages = Math.ceil(this.payment.length / this.itemsperpage);
    this.currentpage = 1;
    this.calculatePageNumbers();
    this.paginateitems();
  }
  
  
  
  amountSort: string = '';
  selectedbtn: any;
  sorting(sortingOrder: 'asc' | 'dsc'): void {
    if (!this.selectedbtn) return;
    this.activeSort = sortingOrder;
 
    let sorted = [...this.payment];
  
    switch (this.selectedbtn) {
      case 'Amount':
        sorted.sort((a, b) => sortingOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount);
        break;
      case 'Total Items':
        sorted.sort((a, b) => sortingOrder === 'asc' ? a.totalitems - b.totalitems : b.totalitems - a.totalitems);
        break;
      case 'Customer name':
        sorted.sort((a, b) => sortingOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        break;
      case 'Order ID':
        sorted.sort((a, b) => {
          const aID = parseInt(a.id?.split('#')[1], 10);
          const bID = parseInt(b.id?.split('#')[1], 10);
          return sortingOrder === 'asc' ? aID - bID : bID - aID;
        });
        break;
    }
    
    this.payment = sorted;
    this.currentpage = 1;
    this.paginateitems();
  }
  

  clearSort(): void {
    this.selectedbtn = 'Amount';  
    this.showdata = false;  
  
    this.activeSort = ''; 
    this.payment = [...this.allitems.customer];
  
    this.currentpage = 1;
    this.calculatetotalpages();
    this.calculatePageNumbers();
    this.paginateitems();
  }
  

  clearFilters(): void {
    this.fromDate = '';
    this.toDate = '';
    this.selectedbutton = '';
    this.selectedbtn = 'Amount';  
    this.filter = this.filter.map(item => ({ ...item, background: 'white' }));
    this.payment = [...this.allitems.customer];
    this.currentpage = 1;
    this.calculatetotalpages();
    this.calculatePageNumbers();
    this.paginateitems();
  }
  
  
  nextImagesrc: string = '/assets/pics/blueye.png';

  setSort(field: string): void {
    this.selectedbtn = field;
  
    if (this.activeSort) {
      this.sorting(this.activeSort);  
    }
  }
  
}
