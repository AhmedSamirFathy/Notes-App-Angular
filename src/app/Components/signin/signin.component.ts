import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
declare var $: any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isStyleInvalid = { 'background-color': 'gray', 'border-color': 'gray' };
  isStyleValid = { 'background-color': '#17a2b8', 'border-color': '#17a2b8' }
  isClicked = false;
  emailNotExists = '';
  isEmailExist = false;

  constructor(private _AuthService: AuthService, private _Router: Router) {
    if (this._AuthService.isLoggedIn()) {
      this._Router.navigate(['/profile'])
    }
  }


  signIn = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)])
  })

  formData() {
    this.isClicked = true;
    if (this.signIn.valid) {
      this._AuthService.signIn(this.signIn.value).subscribe(res => {
        // console.log(res);
        if (res.message == "success") {
          this._Router.navigate(['/profile'])
          localStorage.setItem("TOKEN", res.token)
          this.isClicked = false;
          this.isEmailExist = false;

        }
        else {
          this.emailNotExists = res.message
          this.isEmailExist = true;

        }

      })
    }


  }


  ngOnInit(): void {
    $('#signIn').particleground();
  }

}
