import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { InventoryComponent } from '../inventory/inventory.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InventoryService } from '../../app/services/inventory.service';

@Component({
  selector: 'app-promotions',
  imports: [InventoryComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.css'
})
export class PromotionsComponent implements OnInit {

  search: string = '';
  ismoved = false;
  isshift = false;

  moveImage() {
    this.ismoved = !this.ismoved;

  }

  movetext() {
    this.isshift = !this.isshift;
  }


  constructor(private el: ElementRef, private order: InventoryService) { }
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

  allBanners: any[] = [];


  ngOnInit(): void {
    this.retrievedata();
    // this.calculatetotalpages();
    // this.paginateitems();
  }


  retrievedata(): void {
    const storedData = localStorage.getItem('addBanner');
    if (storedData) {
      const banners = JSON.parse(storedData);
  
      const today = new Date();
  
      this.allBanners = banners.map((banner: any) => {
        const start = new Date(banner.startdate);
        const end = new Date(banner.endDate);
  
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
        const formattedStart = start.toLocaleDateString('en-GB', options);
        const formattedEnd = end.toLocaleDateString('en-GB', options);
  
       
        const isExpired = end < today;
        const updatedStatus = isExpired ? 'Expired' : (banner.status || 'Live');
  
        return {
          ...banner,
          status: updatedStatus,
          dateRange: `${formattedStart} to ${formattedEnd}`
        };
      });
  
     
      localStorage.setItem('addBanner', JSON.stringify(this.allBanners));
  
      this.displaydata = [...this.allBanners];
    }
  }
  
  


  removeitem(index: number): void {
      const actualIndex = (this.currentpage - 1) * this.itemsperpage + index;
      this.displaydata.splice(actualIndex, 1);
      localStorage.setItem('addBanner', JSON.stringify(this.displaydata));
      // this.calculatetotalpages();
      // this.paginateitems();
    
  }


  displaydata: any[] = [];
  pageditems: any[] = [];
  currentpage: number = 1;
  itemsperpage: number = 7;
  totalpages: number = 0;



  // calculatetotalpages(): void {
  //   this.totalpages = Number(Math.ceil(this.displaydata.length / this.itemsperpage))
  // }

  // paginateitems(): void {
  //   const startindex = (this.currentpage - 1) * this.itemsperpage;
  //   const endindex = startindex + this.itemsperpage;

  //   this.pageditems = this.displaydata.slice(startindex, endindex);
  //   console.log("Page:", this.currentpage, "Items:", this.pageditems);
  // }

  // gotopage(page: number): void {
  //   if (page >= 1 && page <= this.totalpages) {
  //     this.currentpage = page;
  //     this.paginateitems();

  //   }
  // }

  filter = [
    { name: "Active Dates", background: "white", value: 'date' },
    { name: "Status", background: "white" },
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

    if (filterType === 'Active Dates') {
      this.showDivA = true;
    } else if (filterType === 'Status') {
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
    let filteredItems = [...this.allBanners];
 
    if (this.fromDate && this.toDate) {
      const from = new Date(this.fromDate + 'T00:00:00');
      const to = new Date(this.toDate + 'T23:59:59');
  
      filteredItems = filteredItems.filter(item => {
        if (!item.endDate) return false;
        const itemEndDate = new Date(item.endDate);
        return itemEndDate >= from && itemEndDate <= to;
      });
    }
  
 
    if (this.selectedPaymentMethod) {
      filteredItems = filteredItems.filter(item =>
        item.status?.toLowerCase() === this.selectedPaymentMethod.toLowerCase()
      );
    }
  
    this.displaydata = filteredItems;
  }
  




  amountSort: string = '';
  selectedbtn: any;
  // sorting(sortingOrder: 'asc' | 'dsc'): void {
  //   if (!this.selectedbtn) return;


  //   let sorted = [...this.payment];

  //   switch (this.selectedbtn) {
  //     case 'Amount':
  //       sorted.sort((a, b) => sortingOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount);
  //       break;
  //   }

  //   this.payment = sorted;
  //   this.currentpage = 1;
  //   this.paginateitems();
  // }


  // clearSort() {
  //   this.selectedbtn = 'Amount';
  //   this.payment = [...this.paymentTemp];
  //   this.updatePagination();
  //   this.showdata = false;
  // }


  clearFilters(): void {
    this.fromDate = '';
    this.toDate = '';
    this.selectedbutton = '';
    this.selectedPaymentMethod = '';
    this.filter = this.filter.map(item => ({ ...item, background: 'white' }));
    this.displaydata = [...this.allBanners];
  }
  
  searchBanners(): void {
    const searchText = this.search.trim().toLowerCase();
  
    if (searchText) {
      this.displaydata = this.allBanners.filter(banner =>
        banner.name?.toLowerCase().includes(searchText) ||
        banner.location?.toLowerCase().includes(searchText) ||
        banner.type?.toLowerCase().includes(searchText) ||
        banner.status?.toLowerCase().includes(searchText)
      );
    } else {
      this.displaydata = [...this.allBanners]; 
    }
  }
  

  paymentmethod = [
    { name: "Live" },
    { name: "Expired" },

  ]

}



