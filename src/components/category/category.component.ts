import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [CommonModule,RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})



export class CategoryComponent {
// imagelist=[
//   {name:"Indoor Plants ",url:"assets/pics/Group 5.jpg"},
//   {name:"Outdoor Plants",url:"assets/pics/image.jpg" },
//   {name:"Pots and Accesories",url:"assets/pics/img.jpg" },
//   {name:"Gift & Combos",url:"assets/pics/plant.jpg" },
//   {name:"Sesds",url:"assets/pics/Group 7.jpg" }
// ];

@Input() shopbycategory:any



}
