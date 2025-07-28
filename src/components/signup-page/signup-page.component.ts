import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
isSubmitted:boolean = false;
signup= {
  username:'',
  email: '',
  phone: '',
  password: '',
  ordercount: '0',
  totalspend: '0'
};

constructor(private router:Router) {}
showerror: boolean =false;
showerror1: boolean =false;
showerror2: boolean =false;
showerror3: boolean =false;
showerror4: boolean =false;
hide(){
  
  this.showerror=false;
  this.showerror1=false;
  this.showerror2=false;
  this.showerror3=false;
  this.showerror4=false;
}

onsignup(form:NgForm){
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const existingUser= users.find((user:any)=> user.username === this.signup.username);
  this.isSubmitted = true;
  if(this.signup.username =='' && this.signup.email=='' && this.signup.phone == '' && this.signup.password == ''){
    this.showerror1 = true;
    return;
  }

  if(this.signup.email==''){
    this.showerror2 = true;
    return;
  }

  if(this.signup.phone==''){
    this.showerror3 = true;
    return;
  }

  if(this.signup.password==''){
    this.showerror4 = true;
    return;
  }



  if(existingUser){
    //alert('Username already Exists!');
    this.showerror = true;
    form.resetForm();
    this.isSubmitted = false;
    return;
  }

  const newUser = {
    ...this.signup,
    id: '#'+ Math.floor(100000 + Math.random() * 900000),   
    signupDate: new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })  
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  alert('Account created successfully!');
  this.router.navigate(['/login']);
  this.isSubmitted = false; 
}

filterNumbers(event: any): void {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
  this.signup.phone = event.target.value;
}

}
