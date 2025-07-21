import { Component, OnInit } from '@angular/core';
import { BlogComponent } from '../blog/blog.component';
import { DiscountComponent } from '../discount/discount.component';
import { AboutComponent } from '../about/about.component';
import { NeedComponent } from '../need/need.component';
import { DataService } from '../../app/services/data.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-blogpage',
  imports: [BlogComponent,DiscountComponent,AboutComponent,NeedComponent,NavbarComponent],
  templateUrl: './blogpage.component.html',
  styleUrl: './blogpage.component.css'
})
export class BlogpageComponent implements OnInit {

  blogs:any;
  needhelp:any;

  constructor(private dataservice:DataService) {}

  ngOnInit(): void {
      this.dataservice.Getdata().subscribe(
      (data) =>{
        this.blogs= data.blogs;
        this.needhelp = data.needhelp;
      },

      )
  }




  // saveCheckoutdetails() {
  //   const checkoutDetails = {
  //     paymentMethod: this.selectedpayment,
  //     address: this.displayaddress,
  //     totalItems: this.totalitems,
  //     totalMRP:this.totalMRP,
  //     totalAmount: this.totalamount,
  //     checkoutDate: new Date().toLocaleString('en-US', {
  //       year: 'numeric',
  //       month: 'short',
  //       day: 'numeric',
  //       hour12: true
  //     })
  //   };
  //   const existingCheckouts = JSON.parse(localStorage.getItem('checkoutdetails') || '[]');
  //   existingCheckouts.push(checkoutDetails);
  //   localStorage.setItem('checkoutdetails', JSON.stringify(existingCheckouts));
  // }





}
