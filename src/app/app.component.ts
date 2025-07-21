import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { CategoryComponent } from "../components/category/category.component";
import { PlantsComponent } from "../components/plants/plants.component";
import { DataService } from './services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'website';

  constructor(private router: Router, private data: DataService) {
    router.events.subscribe((val: any) => {
      if (val['url'] == '/login' || val['url'] == '/inventory-products' || val['url'] == '/customer' || val['url'] == '/orders' || val['url'] == '/add-product' || val['url'] == '/promotions' || val['url'] == '/add-banner' || val['url'] == '/payments' || val['url'] == '/dashboard' || val['url'] == '/sign-up'  ) {
        this.isNavBarAllowed = false;
      } else {
        this.isNavBarAllowed = true;
      }
    });

  }

  plants: any;
  pots: any;
  seeds: any;
  isNavBarAllowed: boolean = true;

  ngOnInit(): void {
    this.data.fetchData().subscribe(
      (data) => {
        this.plants = data.plants;
        this.convertdata();
      }
    )

    this.data.fetch().subscribe(
      (data) => {
        this.pots = data.pots;
        this.changedata();
      }
    )

    this.data.getdata().subscribe(
      (data) => {
        this.seeds = data.seeds;
        this.sendData();
      }
    )

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });


  }

  convertdata(): void {
    const jsonstring = JSON.stringify(this.plants);
    //localStorage.setItem('plantdata', jsonstring);
  }


  changedata(): void {
    const json = JSON.stringify(this.pots);
    //localStorage.setItem('potsdata', json);
  }


  sendData(): void {
    const url = JSON.stringify(this.seeds);
    localStorage.setItem('seedsdata', url);
  }



}
