import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TestService, AuthenticationService } from '../core/services';
import { Test, TestListConfig } from '../core/models';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthenticated: boolean;
  listConfig: TestListConfig = {
    filters: {}
  };

  tests: Test[] = [];
  testsLoaded = false;

  constructor (
    private router: Router,
    private testService: TestService,
    private authServise: AuthenticationService 
  ) { }

  ngOnInit() {
    this.authServise
    .isAuthenticated
    .subscribe(
      authenticated => {
        this.isAuthenticated = authenticated;
        if (!this.isAuthenticated) {
          this.router.navigateByUrl('/login');
          return;
        }
      }
    );
  }

}
