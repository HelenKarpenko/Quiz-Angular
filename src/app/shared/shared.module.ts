import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, FooterComponent } from './layout';
import { ListErrorsComponent } from './error/list-errors/list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';

import { RouterModule } from '@angular/router';

import { TestPreviewComponent, TestListComponent, QuestionCreatorComponent, TestCreatorComponent } from './tests';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { ToolbarComponent } from './toolbar/toolbar.component';

import { MaterialModule } from 'src/app/material.module';
import { DialogComponent } from './tests/test-preview';

@NgModule({
  declarations: [
    ListErrorsComponent,
    ShowAuthedDirective,
    TestPreviewComponent,
    TestListComponent,
    QuestionCreatorComponent,
    TestCreatorComponent,
    ToolbarComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
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
    ToolbarComponent,
    DialogComponent,
  ],
  entryComponents: [DialogComponent]
})
export class SharedModule { }
