import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, catchError, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { JwtService } from './jwt.service';
import { User } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private apiService: ApiService
  ) { }

  setAuth(token, user: User) {
    this.jwtService.saveToken(token);
    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(user);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next({} as User);
  }

  logout() {
    this.purgeAuth();
  }

  login(credentials: any) {
    var data = `username=${credentials['username']}&password=${credentials['password']}&grant_type=password`;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http
      .post<any>(`${environment.url}/token`, data, { headers: reqHeader })
      .pipe(
        map(tokenInfo => {
          this.setAuth(tokenInfo.access_token, {}as User);
      })
    );
  }

  register(credentials: any) {
    return this.apiService
    .post('/account/register', credentials);
  }

  populate() {
    var token = this.jwtService.getToken();
    if (token) {
      this.apiService.get('/users/currentUser')
      .subscribe(
        data => this.setAuth(token, data),
        _ => this.purgeAuth()
      )
    } else {
      this.purgeAuth();
    }
  }

  getUserInfo() {
    return this.apiService.get('/users/currentUser');
  }

  // getCurrentUser(): User {
  //   console.log(this.currentUserSubject.value);
  //   return this.currentUserSubject.value;
  // }

  getCurrentUser(): User {
    console.log(this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }
}
