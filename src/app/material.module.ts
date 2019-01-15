import { NgModule } from '@angular/core';

import {
  MatCardModule,
  MatGridListModule, 
  MatPaginatorModule,
  MatFormFieldModule,
  MatRadioModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatDialogModule,
  MatTableModule,
  MatListModule,
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    MatCardModule,
    MatGridListModule, 
    MatPaginatorModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatDialogModule,
    MatTableModule,
    MatListModule,
  ],
  exports: [
    MatCardModule,
    MatGridListModule, 
    MatPaginatorModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatDialogModule,
    MatTableModule,
    MatListModule,
  ]
})
export class MaterialModule {}