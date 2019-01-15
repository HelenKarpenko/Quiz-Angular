import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

import { User, AuthenticationService, Errors } from '../../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;
  isSubmitting = false;
  isAuthenticated: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.isAuthenticated.subscribe(isAuth => this.isAuthenticated = isAuth);
    this.loginForm = this.formBuilder.group({
      username: [
        '', 
        [
          Validators.required, 
          Validators.minLength(5),
          Validators.pattern("^[a-zA-Z0-9]+$"),
          // Validators.email
        ],
      ],
      password: [
        '', 
        [
          Validators.required, 
          Validators.minLength(6),
          Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,15}$")
        ]
      ],
    })
  }

  login() {
    console.log("login");
    var credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(
      _ => {
        this.isAuthenticated = true;
        this.router.navigateByUrl('/home');
        this.isSubmitting = true;
      },
      err => {
        this.error = err.error.error_description;
        this.isSubmitting = false;
        this.isAuthenticated = false;
      }
    );
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  logout() {
    console.log("logout");
    this.authService.logout();
  }
}
