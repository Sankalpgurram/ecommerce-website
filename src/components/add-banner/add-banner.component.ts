import { Component, Type } from '@angular/core';
import { InventoryComponent } from '../inventory/inventory.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FileHandle ,DragDirective} from '../add-product/drag.directive';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-banner',
  imports: [InventoryComponent,RouterLink,FormsModule,CommonModule,DragDirective],
  templateUrl: './add-banner.component.html',
  styleUrl: './add-banner.component.css'
})
export class AddBannerComponent {
 
    files: FileHandle[] = [];
  
    filesDropped(files: FileHandle[]): void {
      this.files.push(...files);
       
    }

    onBrowseClick(event: MouseEvent) {
      event.stopPropagation();
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      fileInput?.click();
    }


  constructor(private sanitizer: DomSanitizer) { }
  filesSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const fileList = Array.from(target.files);
      const newFiles = fileList.map(file => ({
        file,
        url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
      }));
      if (this.files.length + newFiles.length <= 2) {
        this.files.push(...newFiles);
      }
      if(target.files && target.files.length>0){
        const file = target.files[0];
        const reader = new FileReader();
  
        reader.onload =() =>{
          const base64 = reader.result as string;
          this.saveimage(base64);
        };
  
        reader.readAsDataURL(file);
      }
    }

   

  }

saveimage(base64:string) :void{ 
  this.Banner.image = base64;
 
}



removeFile(fileToRemove: FileHandle,event:any) {
  event.preventDefault();
  this.files = this.files.filter(file => file !== fileToRemove);
  
}





Banner={
  name:'',
  startdate:'',
  endDate: '',
  type: '',
  location: '',
  url: '',
  status: '',
  description: '',
  image:''

};

onSubmit() {

  alert('Form Submitted');
  let BannerDetails = JSON.parse(localStorage.getItem('addBanner') || '[]');
  BannerDetails.push(this.Banner);
  localStorage.setItem('addBanner', JSON.stringify(BannerDetails));
 
this.Banner = {
  name: '',
  startdate: '',
  endDate: '',
  type: '',
  location: '',
  url: '',
  status: '',
  description: '',
  image: ''
};

 
this.files = [];

} }
