import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, FooterComponent } from './layout';
import { ListErrorsComponent } from './error/list-errors/list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';

import { RouterModule } from '@angular/router';

import { TestPreviewComponent, TestListComponent, QuestionCreatorComponent, TestCreatorComponent } from './tests';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';


// Angular material
import { 
  MatCardModule,
  MatGridListModule, 
  MatPaginatorModule,
  MatFormFieldModule,
  MatRadioModule,
  MatInputModule,
  MatButtonModule,
  // MatToolbarModule, 
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ListErrorsComponent,
    ShowAuthedDirective,
    TestPreviewComponent,
    TestListComponent,
    QuestionCreatorComponent,
    TestCreatorComponent,
  ],
  imports: [
    CommonModule,

    RouterModule,
    // Angular material
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    // MatToolbarModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ListErrorsComponent,
    ShowAuthedDirective,
    TestPreviewComponent,
    TestListComponent,
    QuestionCreatorComponent,
    TestCreatorComponent,
  ]
})
export class SharedModule { }
