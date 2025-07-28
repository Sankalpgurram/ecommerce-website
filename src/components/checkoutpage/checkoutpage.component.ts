import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../app/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkoutpage',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './checkoutpage.component.html',
  styleUrl: './checkoutpage.component.css'
})
export class CheckoutpageComponent implements OnInit {


  

  cards = [
    { img: "/assets/pics/mastercard.png", number: "XXXX    -    XXXX    -   XXXX   -   5234" },
    { img: "/assets/pics/cards.png", number: "XXXX    -    XXXX    -   XXXX   -   8736" }
  ]



  useraddress = {
    name: '',
    mobile: '',
    email: '',
    city: '',
    state: '',
    pincode: '',
    address: ''
  };

  showDiv1: boolean = true;
  toggle(): void {
    if (!this.showDiv1) {

      let useraddress = JSON.stringify(this.useraddress);
      localStorage.setItem('Address', useraddress);
      this.displayaddress = JSON.parse(localStorage.getItem('Address') || "");
    }
    this.showDiv1 = !this.showDiv1;
  }


  cancel(): void {
    if (!this.showDiv1) {

      this.showDiv1 = !this.showDiv1;

    }


  }

  cartitems: any[] = [];
  totalitems: number = 0;
  totalMRP: number = 0;
  tax: number = 0;
  totalamount: number = 0;
  couponApplied: boolean = false;
  couponMessage: string = '';
  couponDiscount: number = 100;   
  minCartValue: number = 1000;
  
  constructor(private cartservice: CartService) { }

  ngOnInit(): void {
    this.cartitems = this.cartservice.getcartitems();
    this.retrievedata();
    this.checkCoupon();
    this.calculatetotals();
   
    
  }


  calculatetotals(): void {
    this.totalitems = this.cartitems.reduce((sum, item) => sum + item.quantity, 0);
    this.totalMRP = this.cartitems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.tax = Math.round(this.totalMRP * 0.10);
  
    const grossTotal = this.totalMRP + this.tax;
  
    if (grossTotal < this.minCartValue && this.couponApplied) {
      this.couponApplied = false;
      this.couponDiscount = 0;
      localStorage.removeItem('couponApplied');
      localStorage.removeItem('couponDiscount');
    }
  
    this.totalamount = this.couponApplied ? grossTotal - this.couponDiscount : grossTotal;
  }
  
  
  
  gettotal(): number {
    let total = this.cartitems.reduce((total, item) => total + (item.quantity * Number(item.price)), 0);
    return total;
  }




  placeorder() {
    //alert('Order Placed Sucessfully');
     
    this.saveCheckoutdetails();
    this.updatePlantQuantities();
    let orderDetails = JSON.stringify(this.cartitems);
    const totalvalue = this.gettotal();
    localStorage.setItem('orders', orderDetails);
    const storedorder = localStorage.getItem('orders');
    this.savecart();
    if(storedorder){
     this.cartitems = JSON.parse(storedorder);
     
     console.log("data:",this.cartitems);
    }
    this.cartitems = [];

    const storedData = JSON.parse(localStorage.getItem('login') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const loggedInUser = users.find((user: any) => user.username == storedData.username)
    if (loggedInUser.username) {

      console.log(loggedInUser.username);
      loggedInUser.ordercount++;
      loggedInUser.totalspend = Number(loggedInUser.totalspend) + this.totalamount;

    }

    localStorage.setItem('users', JSON.stringify(users));
    this.cartservice.clearCart();
  }

  //getaddress
  displayaddress: any;
  retrievedata(): void {
    this.displayaddress = JSON.parse(localStorage.getItem('Address') || "");
  }


  payment = [
    { id: 'Card', border: '1px solid #D9D9D9', icon: "/assets/pics/card.png", name: "Card" },
    { id: 'Wallet', border: '1px solid #D9D9D9', icon: "/assets/pics/wallet.png", name: "Wallet" },
    { id: 'UPI', border: '1px solid #D9D9D9', icon: "/assets/pics/gpay.png", name: "UPI" },
    { id: 'Bank Transfer', border: '1px solid #D9D9D9', icon: "/assets/pics/bank.png", name: "Bank Transfer" },
  ];

  selectedpayment: string = '';

  changesize(id: string) {
    this.selectedpayment = id;
    this.payment = this.payment.map(item => {
      if (item.id === id) {
        return { ...item, border: '2px solid #9EFFCD' };
      } else {
        return { ...item, border: '1px solid #D9D9D9' };
      }
    });
  }

  // time(): void{
  //   const now = new Date();
  //   const dateTimeString = now.toISOString();
   
  // }

  updatePlantQuantities(): void {
    const storedData = localStorage.getItem('plantdata');
    if (!storedData) return;
    let plantData = JSON.parse(storedData);
  
     
    this.cartitems.forEach(cartItem => {
      const index = plantData.findIndex((p: any) => p.plants.name === cartItem.name);
  
      if (index !== -1) {
        const plant = plantData[index];
        plant.quantity = (plant.quantity || 0) - cartItem.quantity;
        plant.sales = (plant.sales || 0) + cartItem.quantity;
        plant.amount = (plant.amount || 0) + (cartItem.quantity * cartItem.price);
  
        
        if (plant.quantity >= 20) {
          plant.status = 'Healthy';
        } else if (plant.quantity < 10) {
          plant.status = 'Reorder';
        } else if (plant.quantity < 5) {
          plant.status = 'Low';
        }
  
        if (plant.quantity <= 0) {
          plantData.splice(index, 1);
        }
      }
    });
    localStorage.setItem('plantdata', JSON.stringify(plantData));
  }
  
  

  saveCheckoutdetails() {
    const storedLogin = JSON.parse(localStorage.getItem('login') || '{}');
    const checkoutDetails = {

      id: '#' + Math.floor(Math.random() * 100000),  
      name: this.displayaddress.name ,
      address: this.displayaddress,
      payment: this.selectedpayment,
      totalMRP: this.totalMRP,
      discount: this.couponDiscount,
      totalitems:this.totalitems,
      username: storedLogin.username,
      plantname: this.cartitems.map(item => item.name).join(', '),
      planttype: this.cartitems.map(item => item.type).join(', '),
      tax: this.tax,
      shipping: 0,  
      amount: this.totalamount,
      date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      checkoutDate: new Date().toLocaleString('en-US', {
              year: 'numeric',
             month: 'short',
              day: 'numeric',
              hour12: true
            })
    };
  
    const existingdata = JSON.parse(localStorage.getItem('checkoutdetails') || '[]');
    existingdata.push(checkoutDetails);
    localStorage.setItem('checkoutdetails', JSON.stringify(existingdata));
  }
  


  savecart(){
    const storedLogin = JSON.parse(localStorage.getItem('login') || '{}');
    const cartDetails = {

      
      name: this.displayaddress.name ,
      address: this.displayaddress,
      payment: this.selectedpayment,
      totalMRP: this.totalMRP,
      discount: this.couponDiscount,
      totalitems:this.totalitems,
      username: storedLogin.username,
      cart: this.cartitems,
    
      tax: this.tax,
      shipping: 0,  
      amount: this.totalamount,
      date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
  }
  localStorage.setItem('orderplaced', JSON.stringify(cartDetails));
}


applyCoupon(): void {
  const grossTotal = this.totalMRP + this.tax;

  if (grossTotal >= this.minCartValue && !this.couponApplied) {
    this.couponApplied = true;
    this.totalamount = grossTotal - this.couponDiscount;
    this.couponMessage = 'Coupon Applied';
  } else if (grossTotal < this.minCartValue) {
    const remaining = this.minCartValue - grossTotal;
    this.couponMessage = `Shop for ₹${remaining} more to apply this coupon.`;
    setTimeout(() => {
      this.couponMessage = '';
    }, 2000);
  }
}

checkCoupon(): void {
  const couponApplied = localStorage.getItem('couponApplied') === 'true';
  const discountStr = localStorage.getItem('couponDiscount');

  if (couponApplied && discountStr !== null) {
    this.couponApplied = true;
    this.couponDiscount = parseInt(discountStr, 10);
  } else {
    this.couponApplied = false;
    this.couponDiscount = 0;
  }
}



}