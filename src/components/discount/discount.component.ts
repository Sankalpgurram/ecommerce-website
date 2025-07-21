import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app/services/data.service';

@Component({
  selector: 'app-discount',
  imports: [],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.css'
})
export class DiscountComponent implements OnInit {

deals:any;

  constructor(private dataservice:DataService) {}
ngOnInit(): void {
  this.dataservice.derivedata().subscribe(
    (data)=> {
      this.deals = data.deals;
    },
  )
    
}

}
