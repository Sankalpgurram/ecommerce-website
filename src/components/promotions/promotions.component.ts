import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { InventoryComponent } from '../inventory/inventory.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InventoryService } from '../../app/services/inventory.service';

@Component({
  selector: 'app-promotions',
  imports: [InventoryComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.css'
})
export class PromotionsComponent implements OnInit {

  search: string = '';
  ismoved = false;
  isshift = false;

  moveImage() {
    this.ismoved = !this.ismoved;

  }

  movetext() {
    this.isshift = !this.isshift;
  }


  constructor(private el: ElementRef, private order: InventoryService) { }
  @HostListener('document:click', ['$event']) onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    console.log('Clicked element:', clickedElement.id);


    if (clickedElement.id != "search-container") {
      if (this.ismoved) {
        this.ismoved = !this.ismoved;
        this.isshift = !this.isshift;
      }

    }
  }



  ngOnInit(): void {
    this.retrievedata();
    this.calculatetotalpages();
    this.paginateitems();
  }

 
  retrievedata(): void {
    const storedData = localStorage.getItem('addBanner');
    if (storedData) {
      this.displaydata = JSON.parse(storedData);
      
    }
  }

  removeitem(index: number): void {
    if (index > -1 && index < this.pageditems.length) {
      const actualIndex = (this.currentpage - 1) * this.itemsperpage + index;
      this.displaydata.splice(actualIndex, 1);
      localStorage.setItem('addBanner', JSON.stringify(this.displaydata));
      this.calculatetotalpages();
      this.paginateitems();
    }
  }


  displaydata: any[] = [];
  pageditems: any[] = [];
  currentpage: number = 1;
  itemsperpage: number = 7;
  totalpages: number = 0;



  calculatetotalpages(): void {
    this.totalpages = Number(Math.ceil(this.displaydata.length / this.itemsperpage))
  }

  paginateitems(): void {
    const startindex = (this.currentpage - 1) * this.itemsperpage;
    const endindex = startindex + this.itemsperpage;

    this.pageditems = this.displaydata.slice(startindex, endindex);
    console.log("Page:", this.currentpage, "Items:", this.pageditems);
  }

  gotopage(page: number): void {
    if (page >= 1 && page <= this.totalpages) {
      this.currentpage = page;
      this.paginateitems();

    }
  }



}
