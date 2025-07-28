import { Component, OnInit } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { NeedComponent } from '../need/need.component';
import { DiscountComponent } from '../discount/discount.component';
import { BlogComponent } from '../blog/blog.component';
import { DataService } from '../../app/services/data.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-aboutus',
  imports: [AboutComponent,NeedComponent,DiscountComponent,BlogComponent,NavbarComponent,FooterComponent],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent  implements OnInit{

needhelp:any;
blogs:any;
 
constructor(private dataservice:DataService) {}

ngOnInit(): void {
    this.dataservice.Getdata().subscribe(
      (data)=> {
        this.needhelp = data.needhelp;
        this.blogs = data.blogs
      },
    )
}

}
