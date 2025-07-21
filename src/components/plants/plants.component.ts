import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantCategoryComponent } from './plant-category/plant-category.component';
import { DiscountComponent } from '../discount/discount.component';
import { ProductService } from '../../app/services/product.service';
import { DataService } from '../../app/services/data.service';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-plants',
  imports: [CommonModule,PlantCategoryComponent,DiscountComponent,RouterLink,NavbarComponent,FormsModule],
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.css'
})
export class PlantsComponent implements OnInit {
  



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



data: any;
plants: any;
filteredplants: any; 
 
  constructor(public dataservice:DataService,private router:Router) {}

  ngOnInit(): void {
      this.dataservice.fetchData().subscribe(
        (data) => {
          this.data=data.category;
          
          this.retrievedata();
          this.selectedbtn = 'Amount'
      
        },

      );
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
    { name: "Outdoor Plant", background: "white" },
    { name: "Indoor Plant", background: "white" },
  ]

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

 

    selectedbtn: any = '';
    sort = [
      { id: 1, name: "High-Price", value: "highToLow" },
      { id: 2, name: "Low-Price", value: "lowToHigh" },
      { id: 3, name: "Top-rated", value: "topRated" }
    ];

    onSortChangeFromRadio(value: string) {
      this.sortByPrice(value);
    }
  
    sortByPrice(order: string) {
      let list = this.filteredplants.length ? this.filteredplants : this.displayplants;
    
      if (order === 'lowToHigh') {
        list.sort((a:any, b:any) => Number(a.plants.price) - Number(b.plants.price));
      } else if (order === 'highToLow') {
        list.sort((a:any, b:any) => Number(b.plants.price) - Number(a.plants.price));
      } else if (order === 'topRated') {
        list.sort((a: any, b: any) => Number(b.plants.rate || 0) - Number(a.plants.rate || 0));

      }
    
      if (this.filteredplants.length) {
        this.filteredplants = [...list];
      } else {
        this.displayplants = [...list];
      }
    }
    
    clearSort() {
      this.selectedbtn = 'Amount';

      this.displayplants = JSON.parse(localStorage.getItem('plantdata') || '[]');
      this.filteredplants = [];
    }
  



   applyFilter() {
  if (this.selectedFilters.length > 0) {
    this.filteredplants = this.displayplants.filter(plant =>
      this.selectedFilters.includes(plant.plants.type.trim())
    );
  } else {
    this.filteredplants = [];
  }
  this.showcontent = false;
  this.color = false;
}

    
    
    clearFilter() {
      this.selectedFilters = [];
      this.filteredplants = [];
      this.showcontent = false;
      this.color = false;
    }

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.sortByPrice(value);
  }


  filterByCategory(category: string) {
    this.filteredplants = this.displayplants.filter((plant: any) => 
      plant.plants.type.trim().toLowerCase() === category.trim().toLowerCase()
    );
  }
  
  
  handleCategoryClick(category: any) {
    if (category.type === 'plant') {
      this.filterByCategory(category.name);
    } else if (category.type === 'route') {
      this.router.navigate([category.link]);
    }

} 

displayplants: any[]=[];
retrievedata(): void {
  const plantData = localStorage.getItem('plantdata');
  if (plantData) {
    this.displayplants = JSON.parse(plantData);
    this.filteredplants = [];  
    
    
  }
}




}
