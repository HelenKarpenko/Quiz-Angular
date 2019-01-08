import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestLauncherComponent } from './test-launcher/test-launcher.component';
import { TestResultComponent } from './test-result';
import { TestsComponent } from './tests';
import { SharedModule } from '../shared';

import { 
  MatCardModule,
  MatRadioModule,
  MatProgressBarModule
} from '@angular/material';

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

    /////////////
    MatCardModule,
    MatRadioModule,
    MatProgressBarModule,
  ],
  exports: [ 
    TestsComponent,
    TestLauncherComponent, 
    TestResultComponent 
  ]
})
export class TestsModule { }
