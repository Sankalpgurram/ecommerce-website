
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { InventoryComponent } from '../inventory/inventory.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [InventoryComponent, FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  public config: any = {
    type: 'line',

    data: {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      datasets: [
        {
          label: 'Sales',
          data: ['467', '576', '572', '588'],
          backgroundColor: 'blue',
        },
        {
          label: 'Products',
          data: ['100', '120', '130', '13'],
          backgroundColor: 'red',
        },
      ]
    },
    options: {
      aspectRatio: 1,
      tension: 0.4,
    },

  };

  // public configure: any={

  //   type: 'bar',
  //   data: {
  //     labels: ['Indoor plants','Outdoor Plants','Plant Accesories','Gift&Combos','Seeds'],
  //     dataset:[
  //       {
  //         data:[]
  //       }
  //     ]
  //   }
  // }


  chartfunc() {
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["Indoor Plants", "Outdoor Plants", "Pots", "Seeds"],
        datasets: [
          {

            data: [12, 19, 9, 5],
            backgroundColor: [
              " #98C0AC",

              "#8DE0B6",
              "#A6C7D0",
              "#EBD7A2",


            ],

            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {

        }
      }
    });
  }


totalOrdersToday: number = 0;

totalOrders: number = 0;
monthlyRevenue: number = 0;
  totalRevenue = 0;
  chart: any;
  data: any[] = [];
  displayusers: any[] = [];
  ngOnInit(): void {
    this.retrievedata();
    this.calculateTotalCustomers();
    const ordersData = localStorage.getItem('checkoutdetails');
    const usersData = localStorage.getItem('users');
  
    this.totalOrders = 0;
    this.totalRevenue = 0;
    this.monthlyRevenue = 0;
    this.data = [];
  
    if (ordersData) {
      const parsedOrders = JSON.parse(ordersData);
      this.data = parsedOrders;
      this.totalOrders = parsedOrders.length;
  
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
  
      parsedOrders.forEach((order: any) => {
        const amount = order.amount || 0;
        this.totalRevenue += amount;
      
        const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }); 
       
        

        // Count today's orders
        if (order.checkoutDate === todayStr) {
          this.totalOrdersToday++;
        }
        
        // Count monthly revenue
        if (order.checkoutDate.includes(todayStr.split(' ')[0]) && order.checkoutDate.includes(todayStr.split(' ')[2])) {
          this.monthlyRevenue += amount;
        } }
        );
      
    }
  
    if (usersData) {
      this.displayusers = JSON.parse(usersData);
    }
  
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: ['Orders', 'Visitors'],
        datasets: [
          {
            label: 'Orders',
            data: [this.totalOrders, null],
            borderColor: '#4CAF50',
            backgroundColor: '#4CAF50',
          },
          {
            label: 'Visitors',
            data: [null, this.displayusers.length],
            borderColor: '#FFCE56',
            backgroundColor: '#FFCE56',
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  
    this.chartfunc();
  }
  

  search: string = '';
  ismoved = false;
  isshift = false;

  moveImage() {
    this.ismoved = !this.ismoved;

  }

  movetext() {
    this.isshift = !this.isshift;
  }


  constructor(private el: ElementRef) { }
  @HostListener('document:click', ['$event']) onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    console.log('Clicked element:', clickedElement.id);


    if (clickedElement.id != "search-container") {
      if (this.ismoved) {
        this.ismoved = !this.ismoved;
        this.isshift = !this.isshift;
      }

    }

  }

  totalCustomers: number = 0;


  displaydata: any[] = [];
  retrievedata(): void {
    const storedData = localStorage.getItem('plantdata');
    if (storedData) {
      this.displaydata = JSON.parse(storedData);

    }
  }
  calculateTotalCustomers() {
    const checkoutData = localStorage.getItem('checkoutdetails');
  
    if (checkoutData) {
      const orders = JSON.parse(checkoutData);
  
      const uniqueNames = new Set();
  
      for (let order of orders) {
        if (order.name) {
          uniqueNames.add(order.name.trim().toLowerCase());  
        }
      }
  
      this.totalCustomers = uniqueNames.size;
    } else {
      this.totalCustomers = 0;
    }
  }
  
}
