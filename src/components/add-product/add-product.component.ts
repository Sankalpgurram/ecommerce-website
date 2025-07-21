import { Component, Directive, HostListener, input } from '@angular/core';
import { InventoryComponent } from '../inventory/inventory.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DragDirective, FileHandle } from './drag.directive';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-product',
  imports: [InventoryComponent, CommonModule, RouterLink, FormsModule, DragDirective],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})

export class AddProductComponent {

  files: FileHandle[] = [];

  filesDropped(files: FileHandle[]): void {
    this.files.push(...files);
    // event.stopPropagation();
    // this.files = files;
  }


  custom = [
    { name: "Monstera", img: "/assets/pics/icon (12).png" },
    { name: "Plant", img: "/assets/pics/icon (12).png" },
    { name: "Under 999", img: "/assets/pics/icon (12).png" },
    { name: "Indoor", img: "/assets/pics/icon (12).png" },
    { name: "deliciosa ", img: "/assets/pics/icon (12).png" },
    { name: "Seeds ", img: "/assets/pics/icon (12).png" }

  ]


  // addproduct() {
  //   alert('Product Added Sucessfully' );
  //   let productDetails = JSON.stringify(this);

  //   localStorage.setItem('plants',productDetails);


  // }

  product = {
    id: '',
    name: '',
    type: '',
    category: '',
    productquantity: '',
    price: '',
    saleprice: '',
    sku: '',
    tax: '',
    taxclass: '',
    image: ''

  };

  plantDummyData = {
    "id": " ",
    "quantity":"",
    "sales": 0,
    "amount": 0,
    "plants": {
      "type": "Outdoor Plant",
      "name": "Caladium ",
      "image": "/assets/pics/home.jpg",
      "button": "In Stock",
      "star": "/assets/pics/star.png",
      "rate": "4.8",
      "price": "999",
      "description": "The Monstera Deliciosa plant, also known as the 'cheese plant,' boasts large, glossy leaves with unique splits and holes, adding a touch of tropical elegance to ..."
    },
    "description": {
      "info": " The Monstera Deliciosa, commonly known as the Swiss Cheese Plant, is a popular tropical houseplant    prized for its stunning, large, heart-shaped leaves that develop unique perforations or 'fenestrations' as they mature. Native to the rainforests of Central and South America, this evergreen climber can grow  up to 10-15 feet indoors with proper care, though it's often kept smaller in pots. Its glossy, dark green leaves, which can reach up to 3 feet wide in ideal conditions, create a bold, exotic aesthetic, making it a favorite for interior decor and web design visuals. The plant's name,  'Monstera,' derives from the Latin word for 'monstrous,' referring to its impressive size, while    'Deliciosa' hints at its edible fruit, which tastes like a mix of pineapple and banana but is rarely  produced indoors.<br><br>Care Requirements: <br> <ul><li> Light: Thrives in bright, indirect light but tolerates low light (though growth may slow).</li><li> Water: Water when the top 1-2 inches of soil feel dry; avoid overwatering to prevent root rot.</li> <li> Soil: Prefers well-draining, peat-based potting mix. </li> <li> Humidity: Loves high humidity (50%+), but adapts to average household levels.</li> <li> Temperature: Best between 65-85°F (18-29°C); avoid cold drafts.</li><li> Support: As a climber, it benefits from a moss pole or trellis for vertical growth.</li></ul>",
      "review": "2K"
    },
    "info": [
      {
        "attribute": "Plant Size",
        "description": "Medium  (12-14 inches ) "
      },
      {
        "attribute": " Watering Needs",
        "description": "Moderate (Once every 2-3 days. Keep soil slightly moist, not soggy) "
      },
      {
        "attribute": " Light Requirements",
        "description": " Indirect Sunlight (Thrives in bright, indirect light. Avoid direct sunlight-it can burn the leaves) "
      },
      {
        "attribute": " Maintenace levels",
        "description": " Easy (Great for beginners! Low-maintenance and resilient to occasional neglect) "
      },
      {
        "attribute": "Growth Rate",
        "description": " Moderate (Moderate growth rate indoor) "
      },
      {
        "attribute": "Pet Safety",
        "description": " No (Toxic to cats and dogs if ingested. Keep out of reach of pets) "
      }
    ],
    "review": [
      {
        " name": "John Watson",
        "date": "2 weeks ago",
        "review1": " Amazing Product, Awesome! ",
        "review2": "Loved the Plant. Definitely worth it for Plant lovers!",
        "link": "/assets/pics/man.png",
        "url": "/assets/pics/icon (5).png",
        "stars": [
          1,
          2,
          3,
          4,
          5
        ],
        "pics": [
          {
            "plant": "/assets/pics/plantpic.jpg"
          },
          {
            "plant": "/assets/pics/pot2.jpg"
          },
          {
            "plant": "/assets/pics/plantpic.jpg"
          }
        ]
      },
      {
        "name": "John Watson",
        "date": "1 Month ago",
        "review1": " Amazing Product, Awesome! ",
        "review2": "Loved the Plant. Definitely worth it for Plant lovers!",
        "link": "/assets/pics/man.png",
        "url": "/assets/pics/icon (5).png",
        "stars": [
          1,
          2,
          3,
          4,
          5
        ]
      },
      {
        "name": "John Watson",
        "date": "2 Months ago",
        "review1": " Amazing Product, Awesome! ",
        "review2": "Loved the Plant. Definitely worth it for Plant lovers!",
        "link": "/assets/pics/man.png",
        "url": "/assets/pics/icon (5).png",
        "stars": [
          1,
          2,
          3,
          4,
          5
        ]
      }
    ],
    "rating": [
      {
        "star": "5 Star",
        "height": "6px",
        "width": "233px",
        "borderradius": "24px",
        "background": "#E8C91C"
      },
      {
        "star": "4 Star",
        "height": "6px",
        "width": "187px",
        "borderradius": "24px",
        "background": "#E8C91C"
      },
      {
        "star": "3 Star",
        "height": "6px",
        "width": "156px",
        "borderradius": "24px",
        "background": "#E8C91C"
      },
      {
        "star": "2 Star",
        "height": "6px",
        "width": "75px",
        "borderradius": "24px",
        "background": "#E8C91C"
      },
      {
        "star": "1 Star",
        "height": "6px",
        "width": "22px",
        "borderradius": "24px",
        "background": "#E8C91C"
      }
    ],
    "feedback": [
      {
        "avgrate": "4.8",
        "link": "/assets/pics/man.png",
        "url": "/assets/pics/icon (5).png",
        "stars": [
          1,
          2,
          3,
          4,
          5
        ]
      }
    ]
  }


  dummypots={
    
      "type":"Indoor Use ",
      "name":" Glossy Ceramic Pot",
      "price":"499",
      "isfavrouite":false,
      "rating":4.8,
      "image":"/assets/pics/Image 22.png"
    
  }

  onSubmit(form: NgForm) { 
    
    if(this.product.category=="Pots"){
      alert("Pot added successfully");
      this.dummypots.name = this.product.name
      this.dummypots.price= this.product.price
      this.dummypots.type = this.product.type
      this.dummypots.image= this.product.image

      let productDetails = JSON.parse(localStorage.getItem('potsdata') || '[]');
      productDetails.push(this.dummypots);
     
      localStorage.setItem('potsdata', JSON.stringify(productDetails));

  }

  else{

    console.log('Form Submitted');
alert("Plant added successfully");
this.plantDummyData.id = this.product.id

    this.plantDummyData.plants.name = this.product.name
    this.plantDummyData.quantity = this.product.productquantity
    this.plantDummyData.plants.image = this.product.image
    this.plantDummyData.plants.type = this.product.type
    this.plantDummyData.plants.price = this.product.price

    let productDetails = JSON.parse(localStorage.getItem('plantdata') || '[]');
    productDetails.push(this.plantDummyData);
   
    localStorage.setItem('plantdata', JSON.stringify(productDetails)); }
    form.resetForm();

  }




  removeFile(fileToRemove: FileHandle,event:any) {
    event.preventDefault();
    this.files = this.files.filter(file => file !== fileToRemove);
    
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
  this.product.image = base64;
 
}
}






