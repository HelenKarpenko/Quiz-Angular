import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list';
import { UserDetailsComponent } from './user-details';
import { SharedModule } from '../shared';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    UsersListComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    UsersListComponent,
    UserDetailsComponent
  ]
})
export class UsersModule { }
