import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
declare var $: any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  isStyleInvalid = { 'background-color': '#17a2b8', 'border-color': '#17a2b8' };
  isStyleValid = { 'background-color': 'gray', 'border-color': 'gray' };
  isClicked = false;
  responseMessage = '';
  uniqueEmail = '';
  isUnique = false;
  isSuccess = false;
  constructor(private _AuthService: AuthService) { }

  signUp = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+[,.]?|[a-z]+['-]?)+$/)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z]+[,.]?|[a-z]+['-]?)+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)])

  })

  formData() {
    this.isClicked = true;
    if (this.signUp.valid) {
      this._AuthService.signUp(this.signUp.value).subscribe(res => {
        if (res.message == 'success') {
          this.isClicked = false
          this.isSuccess = true
          this.isUnique = false
          this.responseMessage = res.message
          this.signUp.reset();
        }
        else {
          this.uniqueEmail = res.errors.email.message
          this.isUnique = true
          this.isSuccess = false
          this.isClicked = false
        }
        // console.log(res);

      })
    }

  }


  ngOnInit(): void {
    $('#signUp').particleground();

  }

}
