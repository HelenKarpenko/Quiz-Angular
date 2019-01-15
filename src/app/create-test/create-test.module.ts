import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTestComponent } from './create-test.component';
import { SharedModule } from '../shared'

import {MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [ CreateTestComponent ],
  imports: [
    SharedModule,
    CommonModule,

    MatFormFieldModule,
    MatInputModule 
  ]
})
export class CreateTestModule { }
