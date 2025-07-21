import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { SeedcategoryComponent } from './seedcategory/seedcategory.component';
import { DiscountComponent } from '../discount/discount.component';
import { DataService } from '../../app/services/data.service';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seedpage',
  imports: [CommonModule, SeedcategoryComponent, DiscountComponent, RouterLink ,FormsModule],
  templateUrl: './seedpage.component.html',
  styleUrl: './seedpage.component.css'
})
export class SeedpageComponent implements OnInit {




  @HostListener('document:click', ['$event']) onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    console.log('Clicked element:', clickedElement.id);


    if (!clickedElement.closest('.dropdown3')) {
      this.showdata = false;
    }

    if (!clickedElement.closest('.dropdown2')) {
      this.showcontent = false;
      this.color = false;
    }
  }



  category: any[] = [];
  seeds: any;
  data: any;
  constructor(public dataservice: DataService) { }

  ngOnInit(): void {
    this.dataservice.getdata().subscribe(
      (data) => {
        this.category = data.category;
        this.retrieveData();
           this.selectedbtn = 'Amount'
      },
    )
  }

  






  displayseeds: any[] = [];
  retrieveData(): void {
    const seedsData = localStorage.getItem('seedsdata');
    if (seedsData) {
      this.displayseeds = [...JSON.parse(seedsData)];

    } else {
      this.displayseeds = [];
    }
  }


  // sortByPrice(order: string) {
  //   if (order === 'lowToHigh') {
  //     this.displayseeds = [...this.displayseeds.sort((a, b) => Number(a.price) - Number(b.price))];
  //   } else if (order === 'highToLow') {
  //     this.displayseeds = [...this.displayseeds.sort((a, b) => Number(b.price) - Number(a.price))];
  //   }

  // }



  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.sortByPrice(value);
  }

  pagedcount: number = 0;
  pageditemscount(count: number): void {

    this.pagedcount = count;
  }





  showdata: boolean = false;

  show() {
    this.showdata = !this.showdata;
  
    
    if (this.showdata) {
      this.showcontent = false;
      this.color = false;
    }
  }
  
  filter = [
    { name: "100g", background: "white" },
    { name: "150g", background: "white" },
    { name: "200g", background: "white" }, 
    { name: "250g", background: "white" },
  ]
  selectedbtn: any = '';
  selectedbutton: string = '';
  selectedFilters: string[] = [];
  changecolor(name: string) {
    if (this.selectedFilters.includes(name)) {
      this.selectedFilters = this.selectedFilters.filter(item => item !== name);
    } else {
      this.selectedFilters.push(name);
    }
  }
  
  color: boolean = false;
  showcontent: boolean = false;
  visible() {
    this.showcontent = !this.showcontent;
    this.color = !this.color;
    if (this.showcontent) {
      this.showdata = false;
    } }
  
    filteredseeds: any; 
  
   
    sort = [
      { id: 1, name: "High-Price", value: "highToLow" },
      { id: 2, name: "Low-Price", value: "lowToHigh" },
      { id: 3, name: "Top-rated", value: "topRated" }
    ];
  
    onSortChangeFromRadio(value: string) {
      this.sortByPrice(value);
    }
  
    sortByPrice(order: string) {
      let list = this.filteredseeds.length ? this.filteredseeds : this.displayseeds;
    
      if (order === 'lowToHigh') {
        list.sort((a:any, b:any) => Number(a.price) - Number(b.price));
      } else if (order === 'highToLow') {
        list.sort((a:any, b:any) => Number(b.price) - Number(a.price));
      } else if (order === 'topRated') {
        list.sort((a: any, b: any) => Number(b.rating || 0) - Number(a.rating || 0));
  
      }
    
      if (this.filteredseeds.length) {
        this.filteredseeds = [...list];
      } else {
        this.displayseeds = [...list];
      }
    }
  
    clearSort() {
      this.selectedbtn = 'Amount';
  
      this.displayseeds = JSON.parse(localStorage.getItem('seedsdata') || '[]');
      this.filteredseeds = [];
    }
  
  
  
    applyFilter() {
      if (this.selectedFilters.length > 0) {
        this.filteredseeds = this.displayseeds.filter(seeds =>
          this.selectedFilters.includes(seeds.type.trim())
        );
      } else {
        this.filteredseeds = [];
      }
      this.showcontent = false;
      this.color = false;
    }
    
        
        
        clearFilter() {
          this.selectedFilters = [];
          this.filteredseeds = [];
          this.showcontent = false;
          this.color = false;
        }
  



}


