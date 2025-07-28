import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-loginpage',
  imports: [FormsModule, RouterLink, NavbarComponent, CommonModule,ReactiveFormsModule],
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
  showDiv1: boolean = false; 
  showerror2: boolean = false; 
showerror: boolean =false;

  hide(){
    this.showDiv = false;
    this.showDiv1 = false;
    this.showerror=false;
    this.showerror2=false;
  }
  onSubmit(form: NgForm): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((user: any) => user.username === this.login.username);


    if(this.login.password == '' && this.login.username ==''){
      this.showerror2 = true;
      return;
    }

     
    if (!existingUser) {
      this.showerror = true;
      form.resetForm();
      return;
    }

    if(this.login.password == ''){
      this.showDiv1 = true;
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

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
//   form = new FormGroup({
//     name: new FormControl("",[Validators.required,Validators.minLength(5)]),
//     username: new FormControl("",[Validators.required,Validators.maxLength(10)]),
//     email: new FormControl("",[Validators.required]),
//     password: new FormControl("",[Validators.required]),
//   });
//  formValue: any;
// <button id="sign-in" type="submit" [disabled]="!loginForm.valid">Sign In</button>
}
