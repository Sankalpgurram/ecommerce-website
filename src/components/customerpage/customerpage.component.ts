import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { InventoryComponent } from '../inventory/inventory.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InventoryService } from '../../app/services/inventory.service';

@Component({
  selector: 'app-customerpage',
  imports: [InventoryComponent, RouterLink, FormsModule, CommonModule],
  templateUrl: './customerpage.component.html',
  styleUrl: './customerpage.component.css'
})
export class CustomerpageComponent implements OnInit {
  search: string = '';
  ismoved = false;
  isshift = false;

  moveImage() {
    this.ismoved = !this.ismoved;

  }

  movetext() {
    this.isshift = !this.isshift;
  }


  constructor(private el: ElementRef, private customers: InventoryService) { }
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

  header: any;
  customer: any;



  allitems: any;
  pageditems: any[] = [];
  currentpage: number = 1;
  itemsperpage: number = 10;
  totalpages: number = 3;

  ngOnInit(): void {
    this.customers.getdata().subscribe((data) => {
      this.allitems = data;
      this.retrievedata();
      console.log("Display Users Length:", this.displayusers.length);
      this.calculatetotalpages();
      this.paginateitems();
      this.selectedbtn = 'Amount';
    });
  }



  calculatetotalpages(): void {

    this.totalpages = Math.ceil(this.displayusers.length / this.itemsperpage);
  }


  paginateitems(): void {
    const startindex = (this.currentpage - 1) * this.itemsperpage;
    const endindex = startindex + this.itemsperpage;
    this.pageditems = this.displayusers.slice(startindex, endindex);

  }


  gotopage(page: number): void {
    if (page >= 1 && page <= this.totalpages) {
      this.currentpage = page;
      this.paginateitems();
    }
  }


  displayusers: any[] = [];
  retrievedata(): void {
    const storedData = localStorage.getItem('users');
    const orders = JSON.parse(localStorage.getItem('checkoutdetails') || '[]');

    if (storedData) {
      const users = JSON.parse(storedData);


      this.displayusers = users.map((user: any) => {
        const userOrders = orders.filter((order: any) => order.username === user.username);


        const lastOrder = userOrders.reduce((latest: any, current: any) => {
          return new Date(current.date) > new Date(latest?.date || 0) ? current : latest;
        }, null);

        return {
          ...user,
          lastOrderDate: lastOrder ? lastOrder.date : null,
          paymentMethod: lastOrder ? lastOrder.payment : null
        };
      });
    }
  }
  selecteditemindex: number | null = null;

  toggle(index: number): void {
    this.selecteditemindex = this.selecteditemindex === index ? null : index;
  }




  nextImagesrc: string = '/assets/pics/blueye.png';



  filter = [
    { name: "Signup Date ", background: "white" },

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
    { id: 1, name: "Total Orders", value: "Total Orders" },
    { id: 2, name: "Customer Name", value: "Customer Name" },
    { id: 3, name: "Total Spend", value: "Total Spend" },

  ];

  selectedbtn: any;
  sorting(sortingOrder: 'asc' | 'dsc'): void {
    if (!this.selectedbtn || !this.displayusers?.length) return;
    const key =
      this.selectedbtn === 'Total Orders'
        ? 'ordercount'
        : this.selectedbtn === 'Customer Name'
          ? 'username'
          : this.selectedbtn === 'Total Spend'
            ? 'totalspend'
            : '';

    if (!key) return;



    const sorted = [...this.displayusers].sort((a, b) => {
      const valA = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key];
      const valB = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key];

      if (valA < valB) return sortingOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortingOrder === 'asc' ? 1 : -1;
      return 0;
    });




    this.displayusers = sorted;
    this.calculatetotalpages();
    this.paginateitems();
  }


  fromDate: string = '';
  toDate: string = '';


  applyFilter(): void {
    let filteredItems = [...this.displayusers];

    if (this.fromDate && this.toDate) {
      const from = new Date(this.fromDate + 'T00:00:00');
      const to = new Date(this.toDate + 'T23:59:59');

      filteredItems = filteredItems.filter(item => {
        if (!item.signupDate) return false;

        const parsedDate = new Date(item.signupDate);
        return parsedDate >= from && parsedDate <= to;
      });
    }

    this.displayusers = filteredItems;
    this.calculatetotalpages();
    this.currentpage = 1;
    this.paginateitems();
  }

  clearFilters(): void {
    this.fromDate = '';
    this.toDate = '';
    this.selectedbutton = '';
    this.selectedbtn = 'Amount';
    this.filter = this.filter.map(item => ({ ...item, background: 'white' }));
    this.retrievedata();
    this.calculatetotalpages();
    this.paginateitems();
  }

  clearSort() {
    this.selectedbtn = 'Amount';


  }


}

