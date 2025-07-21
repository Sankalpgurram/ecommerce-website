import { Component,Directive,ElementRef,HostListener} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

// @Directive({
//   selector: '[search-container]'
// })

export class HomeComponentComponent {
  search: string = '';
  ismoved = false;
  isshift = false;

  moveImage() {
    this.ismoved = !this.ismoved;  
  
  }

   movetext() {
    this.isshift = !this.isshift; 
   }


  constructor(private el: ElementRef) {}
  @HostListener('document:click',['$event']) onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
     
    console.log('Clicked element:', clickedElement.id);


    if(clickedElement.id != "search-container")
      { if(this.ismoved){
        this.ismoved = !this.ismoved;
        this.isshift = !this.isshift;
      }
       
    }

    
//     if(event.target == this.el.nativeElement) {
     
//       if(!this.ismoved){
// this.ismoved = !this.ismoved; }
//     }

      // if(event.target &&   (event.target != "search-container")) {
  //        if(!this.ismoved){
  //  this.ismoved = !this.ismoved; }
       


  }
  

}


