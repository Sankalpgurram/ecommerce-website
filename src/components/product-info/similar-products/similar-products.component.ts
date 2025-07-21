import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../../app/services/data.service';
import { CartService } from '../../../app/services/cart.service';

@Component({
  selector: 'app-similar-products',
  imports: [FormsModule, CommonModule,RouterModule,],
  templateUrl: './similar-products.component.html',
  styleUrl: './similar-products.component.css'
})
export class SimilarProductsComponent {
  topseller:any;
     needhelp:any;
      
   
     constructor(private dataservice: DataService,private cartservice:CartService,private router:Router) {}
   
      ngOnInit(): void {
          this.dataservice.Getdata().subscribe(
           (data) => {
              
             this.topseller= data.topseller;
             this.needhelp = data.needhelp;
             
           },
          )
      }
      transferdata(data:any){
        console.log(data)
        this.cartservice.pushdata(data);
        this.router.navigate(['/product-info']);
       }

       addtocart(plants: any,event?:any) {
        event?.stopPropagation();
        const cartitems = {
          ...plants, 
          quantity: this.count,
          selectedsize:this.size
          
        };
        
      
        this.cartservice.addtocart(cartitems);
        alert(`${plants.name} added to cart!`);
      
      }
      count:number=1;
      size:string='S';

}
