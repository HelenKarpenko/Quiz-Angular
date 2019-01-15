import { Component, OnInit } from '@angular/core';

import { User, AuthenticationService, UserService } from 'src/app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.authService.isAuthenticated.subscribe(isAuth => {
      this.isAuthenticated = isAuth
    });

    this.authService.currentUser.subscribe(
      (user: User) => {
        if (user && user.roles) {
          this.currentUser = user;
          console.log(this.currentUser);
          var index = user.roles.indexOf["admin"];
          this.isAdmin = index !== -1;
        }
      }
    );
  }
}
