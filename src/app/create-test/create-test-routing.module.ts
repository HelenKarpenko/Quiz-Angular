import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTestComponent } from './create-test.component';
import { AuthGuard } from '../core/guards'
import { SharedModule } from '../shared';


import { CommonModule } from '@angular/common'; // ???

const routers: Routes = [
  { path: '', component: CreateTestComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [
    RouterModule.forChild(routers),
    CommonModule // ??
  ],
  exports: [RouterModule]
})
export class CreateTestRoutingModule { }
