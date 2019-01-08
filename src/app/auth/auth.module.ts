import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

import { SharedModule } from '../shared'
import { AuthComponent } from './auth.component';
import { NoAuthGuard } from '../core/guards';
import { CreateTestRoutingModule } from '../create-test/create-test-routing.module'

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    CreateTestRoutingModule,
  ],
  providers: [
    NoAuthGuard
  ]
})
export class AuthModule { }
