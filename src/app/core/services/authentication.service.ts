import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, catchError, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { JwtService } from './jwt.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  populate() {
    let token = this.jwtService.getToken();
    if (token) {
      this.http
      .get<any>(`${environment.api_url}/api/account/userInfo`)
      .pipe(
        map(user => {
          return { email: user.Email, token: token } as User;
        })
      )
      .subscribe(
        user => this.setAuth(user),
        _ => this.purgeAuth() 
      )
    } else {
      this.purgeAuth();
    }
  }

  setAuth(user: any) {
    console.log(user);
    console.log(user.access_token);
    this.jwtService.saveToken(user.access_token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  login(credentials: any) {
    var data = `username=${credentials['email']}&password=${credentials['password']}&grant_type=password`;
    console.log(data);
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http
      .post<any>(`${environment.url}/token`, data, { headers: reqHeader })  
      .pipe(
        map(tokenInfo => {
          this.setAuth(tokenInfo);
      })
    );
  }

  register(credentials: any) {
    return this.http
      .post<any>(`${environment.api_url}/api/account/register`, credentials);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}
