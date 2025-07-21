import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  imports: [CommonModule,RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  cards =[
    {url:"/assets/pics/image 10.png ",info:"5 Easiest Plants to Grow at Home (And How to Keep Them Happy)" ,text:"New to gardening? Start strong with these low-maintenance plants that thrive in Indian homes...",tag:"Read more..."},
    {url:" /assets/pics/image 12.png " ,info:"Seed to Success: A Beginner’s Guide to Sowing Your First Crop",text:" Understand how to pick the right seeds, prep your soil, and give your crops the best start.",tag:"Read more..."},
    {url:" /assets/pics/f7419ee8ad7469c5850bd0420b0b06e3f2dfbf1e.png ",info:" Organic vs. Chemical Fertilizers: What Should You Use?  " ,text:"Both have pros and cons. Learn which is better for your crop type, soil condition, and long-term ...",tag:"Read more..."},
  ]

  @Input() blogs:any
//  @Output() messageEvent = new EventEmitter<string>();

//  sendMessage(){
//   this.messageEvent.emit("hello world");
//  }

// 
}
