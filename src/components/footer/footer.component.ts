import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule,RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {


  icons=[
    {img:"/assets/pics/facebook2.png"},
    {img:"/assets/pics/twitter.png"},
    {img:"/assets/pics/whatsapp.png"},
    {img:"/assets/pics/instagram.png"},
    {img:"/assets/pics/youtube.png"}
  ]
}
