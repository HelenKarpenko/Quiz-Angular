import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
   
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const token = localStorage['jwtToken'];

        if (token) {
            headersConfig['Authorization'] = `Bearer ${token}`
        }

        const request = req.clone({ setHeaders: headersConfig });
        return next.handle(request);
    }
}