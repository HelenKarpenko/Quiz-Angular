import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';

import { User, AuthenticationService, Errors } from '../../core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errors: { [key: string] : string; } = {};
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
    this.registerForm = this.formBuilder.group({
      email: [
        '', 
        [
          Validators.required,
          Validators.email
        ],
      ],
      userName: [
        '', 
        [
          Validators.required, 
          Validators.minLength(5),
          Validators.pattern("^[a-zA-Z0-9]+$")
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
      confirmPassword: [
        '', 
        [
          Validators.required, 
          Validators.minLength(6),
          Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,15}$")
        ]
      ],
    })
  }

  register() {
    var credentials = this.registerForm.value;
    console.log(credentials);
    this.authService
    .register(credentials)
    .subscribe(
      _ => {
        this.isAuthenticated = true;
        this.router.navigateByUrl('/home');
        this.isSubmitting = true;
      },
      err => {
        this.errors = err.modelState;
        this.isSubmitting = false;
        this.isAuthenticated = false;
      }
    );
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  logout() {
    console.log("logout");
    this.authService.logout();
  }
}
