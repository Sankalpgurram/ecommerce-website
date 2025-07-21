import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-loginpage',
  imports: [FormsModule, RouterLink, NavbarComponent, CommonModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})


export class LoginpageComponent {

  login = {
    username: '',
    password: '',
    ordercount: '0',
    totalspend: '',
  };


  constructor(private router: Router) { }

  showDiv: boolean = false; 
showerror: boolean =false;

  hide(){
    this.showDiv = false;
    this.showerror=false;
  }
  onSubmit(form: NgForm): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((user: any) => user.username === this.login.username);

    if (!existingUser) {
      this.showerror = true;
      form.resetForm();
      return;
    }

    if (existingUser.password !== this.login.password) {
 
      this.showDiv = true;
      
      return;
    }

   


    // localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('login', JSON.stringify(existingUser));
    // alert(`Welcome, ${this.login.username}`);

    if (this.login.username !== 'admin') {
      this.router.navigate(['/']);
      
    }
    else{
      this.router.navigate(['/dashboard']);
    }
   
  }




}
