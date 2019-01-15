import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  getToken(): string {
    return localStorage['jwtToken'];
  }

  saveToken(token: string) {
    localStorage['jwtToken'] = token;
  }

  destroyToken() {
    localStorage.removeItem('jwtToken');
  }
}
