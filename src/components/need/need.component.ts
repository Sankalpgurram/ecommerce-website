import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-need',
  imports: [CommonModule],
  templateUrl: './need.component.html',
  styleUrl: './need.component.css'
})
export class NeedComponent  {
  

  @Input()needhelp:any
 
   
    open: number | null = null;
  
    accord(index: number) {
      this.open = this.open === index ? null : index;
    }
    
  
}
