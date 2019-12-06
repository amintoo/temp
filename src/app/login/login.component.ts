import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../service/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  invalidLogin = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private loginservice: AuthenticationService ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  checkLogin(username, password) {
  if (this.loginservice.authenticate(username, password) ) {
    this.router.navigate(['HomePage']);
    this.invalidLogin = false;
  } else {
    this.invalidLogin = true;
  }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (!this.validateForm.invalid) {
      console.log(this.validateForm.controls['userName'].value, this.validateForm.controls['password'].value)
      this.checkLogin(this.validateForm.controls['userName'].value, this.validateForm.controls['password'].value )

    }
  }
}
