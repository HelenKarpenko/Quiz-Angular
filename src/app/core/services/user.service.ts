import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { User, ListConfig, Paging, UserAnswers } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable();

  private userUrl = '/users';

  constructor(private apiService: ApiService) {
    this._getCurrentUser().subscribe(
      (user: User) => {
        this.currentUserSubject.next(user);
      }
    );
  }

  getAll(): Observable<User[]> {
    return this.apiService.get(this.userUrl);
  }

  query(config: ListConfig): Observable<{users: User[], paging: Paging}> {
    const params = {};

    Object.keys(config.filters)
    .forEach((key) => {
      params[key] = config.filters[key];
    });

    return this.apiService
    .get(this.userUrl, new HttpParams({ fromObject: params}));
  }

  get(id: string): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.apiService.get(url);
  }

  delete(id: string): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.apiService.delete(url);
  }

  update(id: string, user: User): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.apiService.put(url, user);
  }

  private _getCurrentUser() {
    const url = `${this.userUrl}/currentUser`;
    return this.apiService.get(url);
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  isAdmin(user: User) {
    var index = user.roles.indexOf['admin'];
    return index !== -1;
  }

  getUserAnswers(id: string): Observable<UserAnswers[]> {
    const url = `${this.userUrl}/${id}/results`;
    return this.apiService.get(url);
  }
}
