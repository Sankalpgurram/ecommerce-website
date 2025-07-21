import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmationpage',
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './confirmationpage.component.html',
  styleUrl: './confirmationpage.component.css'
})
export class ConfirmationpageComponent implements OnInit {

  ngOnInit(): void {
      this.retrievedata();
  }
  
  displayorder: any[]=[];

  retrievedata(): void {
    const orders = localStorage.getItem('orderplaced');
    if (orders) {
      this.displayorder = [JSON.parse(orders)];
      
    }
  }
  
}
