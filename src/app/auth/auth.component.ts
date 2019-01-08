import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../core/services/authentication.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Errors } from '../core/models'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService 
  ) {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      if(this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
        this.authForm.addControl('confirmPassword', new FormControl());
      }
    })
  }

  onSubmit() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = this.authForm.value;
    if(this.authType === 'login') {
      this.authenticationService
      .login(credentials)
      .subscribe(
        _ => 
          this.router.navigateByUrl('/home'),
        error => {
          this.errors = error; 
          this.isSubmitting = false;
        }
      );
    } else if (this.authType === 'register') {
      this.authenticationService
      .register(credentials)
      .subscribe(
        _ => {
          console.log('Register: data');
          this.router.navigateByUrl('/home');
          // this.router.navigate(['/home']);
        },
        error => {
          this.errors = error; 
          this.isSubmitting = false;
        }
      )
    }
  }
}
