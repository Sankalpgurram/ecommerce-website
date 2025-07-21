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

hide(){
  
  this.showerror=false;
}

onsignup(form:NgForm){
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const existingUser= users.find((user:any)=> user.username === this.signup.username);

  if(existingUser){
    //alert('Username already Exists!');
    this.showerror = true;
    form.resetForm();
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
}


}
