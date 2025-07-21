import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { PotscategoryComponent } from './potscategory/potscategory.component';
import { DiscountComponent } from '../discount/discount.component';
import { DataService } from '../../app/services/data.service';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-potspage',
  imports: [CommonModule, PotscategoryComponent, DiscountComponent, RouterLink, NavbarComponent,FormsModule],
  templateUrl: './potspage.component.html',
  styleUrl: './potspage.component.css'
})
export class PotspageComponent implements OnInit {
   
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




  category: any;
   
  constructor(public dataservice: DataService) { }

  ngOnInit(): void {
    this.dataservice.fetch().subscribe(
      (data) => {
        this.category = data.category;
         this.selectedbtn = 'Amount'
        this.retrieveData();
      },
    )
  }


  displaypots: any[] = [];
  retrieveData(): void {
    const potsData = localStorage.getItem('potsdata');
    if (potsData) {
      this.displaypots = [...JSON.parse(potsData)];  
      this.filteredpots = [];  
      
    } else {
      this.displaypots = [];
    }
  }

//   sortByPrice(order: string) {
//     if (order === 'lowToHigh') {
//       this.displaypots = [...this.displaypots.sort((a, b) => Number(a.price) - Number(b.price))];
//     } else if (order === 'highToLow') {
//       this.displaypots = [...this.displaypots.sort((a, b) => Number(b.price) - Number(a.price))];
//     }
  
// }



onSortChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  this.sortByPrice(value);
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
  { name: "Outdoor Use", background: "white" },
  { name: "Indoor Use", background: "white" },
  { name: "Outdoor friendly", background: "white" }, 
  { name: "Balcony Garden", background: "white" },
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

  filteredpots: any; 

 
  sort = [
    { id: 1, name: "High-Price", value: "highToLow" },
    { id: 2, name: "Low-Price", value: "lowToHigh" },
    { id: 3, name: "Top-rated", value: "topRated" }
  ];

  onSortChangeFromRadio(value: string) {
    this.sortByPrice(value);
  }

  sortByPrice(order: string) {
    let list = this.filteredpots.length ? this.filteredpots : this.displaypots;
  
    if (order === 'lowToHigh') {
      list.sort((a:any, b:any) => Number(a.price) - Number(b.price));
    } else if (order === 'highToLow') {
      list.sort((a:any, b:any) => Number(b.price) - Number(a.price));
    } else if (order === 'topRated') {
      list.sort((a: any, b: any) => Number(b.rating || 0) - Number(a.rating || 0));

    }
  
    if (this.filteredpots.length) {
      this.filteredpots = [...list];
    } else {
      this.displaypots = [...list];
    }
  }

  clearSort() {
    this.selectedbtn = 'Amount';

    this.displaypots = JSON.parse(localStorage.getItem('potsdata') || '[]');
    this.filteredpots = [];
  }



  applyFilter() {
    if (this.selectedFilters.length > 0) {
      this.filteredpots = this.displaypots.filter(pots =>
        this.selectedFilters.includes(pots.type.trim())
      );
    } else {
      this.filteredpots = [];
    }
    this.showcontent = false;
    this.color = false;
  }
  
      
      
      clearFilter() {
        this.selectedFilters = [];
        this.filteredpots = [];
        this.showcontent = false;
        this.color = false;
      }



}

