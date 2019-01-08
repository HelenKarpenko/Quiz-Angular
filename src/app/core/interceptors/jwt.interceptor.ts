import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
   
    constructor(private jwtService: JwtService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const token = this.jwtService.getToken();
        console.log(`JwtInterceptor: ${token !== null}`);
        console.log(token);

        if (token) {
            headersConfig['Authorization'] = `Bearer ${token}`
        }

        const request = req.clone({ setHeaders: headersConfig });

        console.log(request);
        return next.handle(request);
    }
}