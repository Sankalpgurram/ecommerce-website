
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

  totalRevenue = 0;
  chart: any;
  data: any[] = [];
  displayusers: any[] = [];
  ngOnInit(): void {
    this.retrievedata();
    const ordersData = localStorage.getItem('checkoutdetails');
    const usersData = localStorage.getItem('users');

    const totalOrders = ordersData ? JSON.parse(ordersData).length : 0;
    const totalVisitors = usersData ? JSON.parse(usersData).length : 0;

    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: ['Orders', 'Visitors'],
        datasets: [
          {
            label: 'Orders',
            data: [totalOrders, null],
            borderColor: '#4CAF50',
            backgroundColor: '#4CAF50',
         
             
          },
          {
            label: 'Visitors',
            data: [null, totalVisitors],
            borderColor: '#FFCE56',
            backgroundColor: '#FFCE56',
            
      
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  
    this.chartfunc();
    // this.totalRevenue = this.getTotalRevenue();
    const storedData = localStorage.getItem('users');
    if (storedData) {
      this.displayusers = JSON.parse(storedData);

    }
    const data = localStorage.getItem('checkoutdetails');
    if (data) {
      this.data = JSON.parse(data);
    }
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

  order = [
    { value: " 5", text: "Total Orders today", background: " #F2EFF7" },
    { value: "253", text: "Active Users Now", background: "#FAF7F0" },
    { value: "21,530", text: "Revenue this month", background: "#F0F7FE" },
    { value: "9", text: "Return Requests today", background: "#EBF2EB" },
    { value: "2", text: "Payment Failures", background: "#FAF0EB" },

  ]

  stock = [
    { name: "Monstera deliciosa", qty: "40", background: "linear-gradient(180deg, #26AB66 0%, #197A48 100%)", status: "Healthy" },
    { name: "Brown Clay Pot", qty: "27", background: "linear-gradient(180deg, #E8C91C 0%, #EAB422 100%)", status: "Reorder" },
    { name: "Portulaca Seeds", qty: "5", background: "linear-gradient(180deg, #EA7474 0%, #C74D4D 100%", status: "Low" },
    { name: "Metal green watering can", qty: "16", background: "linear-gradient(180deg, #26AB66 0%, #197A48 100%)", status: "Healthy" },
    { name: "Neem tree", qty: "32", background: "linear-gradient(180deg, #26AB66 0%, #197A48 100%)", status: "Healthy" },
    { name: "Christmas tree", qty: "60", background: "linear-gradient(180deg, #26AB66 0%, #197A48 100%)", status: "Healthy" },
    { name: "Button Rose Plant", qty: "2", background: "linear-gradient(180deg, #EA7474 0%, #C74D4D 100%", status: "Low" },
    { name: "Yellow hanging Pot", qty: "15", background: "linear-gradient(180deg, #E8C91C 0%, #EAB422 100%)", status: "Reorder" },


  ]



  displaydata: any[] = [];
  retrievedata(): void {
    const storedData = localStorage.getItem('plantdata');
    if (storedData) {
      this.displaydata = JSON.parse(storedData);

    }
  }

  
}
