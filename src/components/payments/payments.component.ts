import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { InventoryComponent } from '../inventory/inventory.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../app/services/inventory.service';

@Component({
  selector: 'app-payments',
  imports: [InventoryComponent, FormsModule, CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {
  search: string = '';
  ismoved = false;
  isshift = false;
  paymentTemp: any[] = [];

  moveImage() {
    this.ismoved = !this.ismoved;

  }

  movetext() {
    this.isshift = !this.isshift;
  }


  constructor(private el: ElementRef, private page: InventoryService) { }
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

  payment: any[] = [];
  selecteditemindex: number | null = null;

  ngOnInit(): void {
    //this.updatePagination();
    const data = localStorage.getItem('checkoutdetails');
    if (data) {
      this.payment = JSON.parse(data);
      this.paymentTemp = [...this.payment];
      this.updatePagination()
      this.selectedbtn = 'Amount';
      this.showDivA = true;
    }
  }

  // if (this.selectedbutton === 'Amount' && this.amountSortOrder) {
  //   filteredItems.sort((a, b) => {
  //     return this.amountSortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
  //   });
  // }

  toggle(index: number): void {
    this.selecteditemindex = this.selecteditemindex === index ? null : index;
    console.log("image clicked");
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

  allitems: any;
  pageditems: any[] = [];
  currentpage: number = 1;
  itemsperpage: number = 10;
  totalpages: number = 0;



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


  //   sortByPrice(order: string) {

  //     if (order === 'lowToHigh') {
  //       this.payment.sort((a: any, b: any) => a.amount - b.amount);
  //       this.paginateitems();
  //     } else if (order === 'highToLow') {
  //       this.payment.sort((a: any, b: any) => b.amount - a.amount);
  //       this.paginateitems();
  //     }

  // }

  // onSortChange(event: Event) {
  //   const value = (event.target as HTMLSelectElement).value;
  //   this.sortByPrice(value);
  // }


 applySearch(): void {
  
  this.payment = [...this.paymentTemp];

  if (this.search && this.search.trim()) {
    const searchText = this.search.toLowerCase();

    this.payment = this.payment.filter((item: any) =>
      item.name?.toLowerCase().includes(searchText) ||
      item.id?.toLowerCase().includes(searchText) ||
      item.payment?.toLowerCase().includes(searchText) ||
      item.checkoutDate?.toLowerCase().includes(searchText)
    );
  }

  this.currentpage = 1;
  this.updatePagination();
}

  nextImagesrc: string = '/assets/pics/blueye.png';

  filter = [
    { name: "Date of Payment", background: "white", value: 'date' },
    { name: "Payment Method", background: "white" },
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


  showDivA: boolean = true;

  activeFilter: string = '';

  toggleDivs(filterType: string): void {
    this.activeFilter = filterType;

    if (filterType === 'Date of Payment') {
      this.showDivA = true;
    } else if (filterType === 'Payment Method') {
      this.showDivA = false;
    }
  }

  selectedPaymentMethod: string = 'date';

  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
  }


  visible() {
    this.showcontent = !this.showcontent;
    this.color = !this.color;
    if (this.showcontent) {
      this.showdata = false;
    }
  }

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

    { id: 1, name: "Amount", value: "Amount" },
  ];


  activeSort: 'asc' | 'dsc' | '' = '';


  fromDate: string = '';
  toDate: string = '';

  applyFilter(): void {
    let filteredItems = [...this.paymentTemp];


    if (this.fromDate && this.toDate) {
      const from = new Date(this.fromDate + 'T00:00:00');
      const to = new Date(this.toDate + 'T23:59:59');

      filteredItems = filteredItems.filter(item => {
        if (!item.checkoutDate) return false;
        const orderDate = new Date(item.checkoutDate);
        return orderDate >= from && orderDate <= to;
      });
    }


    if (this.selectedPaymentMethod) {
      filteredItems = filteredItems.filter(item =>
        item.payment?.toLowerCase() === this.selectedPaymentMethod.toLowerCase()
      );
    }

    this.payment = filteredItems;
    this.currentpage = 1;
    this.updatePagination();
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
    }
  
    this.payment = sorted;
    this.currentpage = 1;
    this.paginateitems();
  }
  


  clearSort() {
    this.selectedbtn = 'Amount';
    this.payment = [...this.paymentTemp];
    this.updatePagination();
    this.showdata = false;
    this.activeSort = ''; 
  }


  clearFilters(): void {
    this.fromDate = '';
    this.toDate = '';
    this.selectedbutton = '';
    this.selectedbtn = 'Amount';
    this.selectedPaymentMethod = '';
    this.filter = this.filter.map(item => ({ ...item, background: 'white' }));
    this.payment = [...this.paymentTemp];
    this.currentpage = 1;
    this.updatePagination();
  }


  paymentmethod = [
    { name: "Card" },
    { name: "Wallet" },
    { name: "Bank Transfer" },
    { name: "UPI" }
  ]

}
