import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors'
import {
  AuthenticationService,
  JwtService,
  TestService,
  ShareResultService
} from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    AuthenticationService,
    JwtService,
    TestService,
    ShareResultService
  ]
})
export class СoreModule { }
