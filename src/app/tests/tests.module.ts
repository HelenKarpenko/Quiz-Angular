import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestLauncherComponent } from './test-launcher/test-launcher.component';
import { TestResultComponent } from './test-result';
import { TestsComponent } from './tests';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    TestsComponent,
    TestLauncherComponent, 
    TestResultComponent 
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [ 
    TestsComponent,
    TestLauncherComponent, 
    TestResultComponent 
  ]
})
export class TestsModule { }
