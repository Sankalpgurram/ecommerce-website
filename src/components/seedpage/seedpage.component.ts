import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { SeedcategoryComponent } from './seedcategory/seedcategory.component';
import { DiscountComponent } from '../discount/discount.component';
import { DataService } from '../../app/services/data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-seedpage',
  imports: [CommonModule, SeedcategoryComponent, DiscountComponent, RouterLink, FormsModule, FooterComponent],
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
  constructor(public dataservice: DataService,private router:Router,private route:ActivatedRoute) { }

  // ngOnInit(): void {
  //   this.dataservice.getdata().subscribe((data) => {
  //     this.category = data.category;
  //     this.retrieveData();
  
  //     this.selectedbtn = 'Amount';
 
  //   });
  // }
  


  selectedCategory: string = '';
  ngOnInit(): void {
   
    this.route.queryParams.subscribe(params => {
      const categoryParam = decodeURIComponent(params['category'] || '').trim().toLowerCase();
      if (categoryParam) {
        this.selectedCategory = categoryParam;
      }
    });
  
 
    this.dataservice.getdata().subscribe((data) => {
      this.category = data.category;
      this.retrieveData();
      this.selectedbtn = 'Amount';
    });
  }

  displayseeds: any[] = [];
  retrieveData(): void {
    const seedsData = localStorage.getItem('seedsdata');
    if (seedsData) {
      const parsedData = JSON.parse(seedsData);
      this.originalSeeds = [...parsedData];
      this.displayseeds = [...parsedData];
      this.filteredseeds = []; 
    } else {
      this.displayseeds = [];
      this.originalSeeds = [];
      this.filteredseeds = [];  
    }
  }
  

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.sortByPrice(value);
  }

  pagedcount: number = 0;
  pageditemscount(count: number): void {

    this.pagedcount = count;
  }


  originalSeeds: any[] = [];  



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
      const target = (this.filteredseeds && this.filteredseeds.length)
      ? [...this.filteredseeds]
      : [...this.displayseeds];
    
    
      const sorted = [...target].sort((a, b) => {
        if (order === 'lowToHigh') return +a.price - +b.price;
        if (order === 'highToLow') return +b.price - +a.price;
        if (order === 'topRated') return +b.rating - +a.rating;
        return 0;
      });
    
      if (this.filteredseeds && this.filteredseeds.length) {
        this.filteredseeds = sorted;
      } else {
        this.displayseeds = sorted;
      }
      
    }
    
    
  
    clearSort() {
      this.selectedbtn = 'Amount';
    
   
      this.displayseeds = [...this.originalSeeds];
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
  
 onCategoryClick(categoryItem: any) {
          const trimmedName = categoryItem.name.trim().toLowerCase();
        
          if (trimmedName === 'pots and accesories') {
            this.router.navigate(['/potspage'], {
              queryParams: { category: categoryItem.name.trim() }
            });
          } else if (trimmedName === 'indoor plants' || trimmedName === 'outdoor plants') {
            this.router.navigate(['/plants'], {
              queryParams: { category: categoryItem.name.trim() }
            });
          } else if (trimmedName === 'gift & combos') {
            this.router.navigate(['/potspage'], {
              queryParams: { category: categoryItem.name.trim() }
            });
          } else if (trimmedName === 'seeds') {
            this.router.navigate(['/seedspage'], {
              queryParams: { category: categoryItem.name.trim() }
            });
          }
        }


}


