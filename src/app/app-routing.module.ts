import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './core/guards';
import { CreateTestComponent } from './create-test/create-test.component';
import { LoginComponent } from './auth/login';
import { TestsComponent, TestLauncherComponent, TestResultComponent } from './tests';
import { RegisterComponent } from './auth/register';
import { UsersListComponent } from './users/users-list';
import { UserDetailsComponent } from './users/user-details';

const routes: Routes = [
  { path: 'home', redirectTo: "tests", pathMatch: "full"},

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'tests', component: TestsComponent, canActivate: [AuthGuard] },
  { path: 'tests/:id', component: TestLauncherComponent, canActivate: [AuthGuard] },
  { path: 'tests/:id/result', component: TestResultComponent, canActivate: [AuthGuard] },

  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserDetailsComponent, canActivate: [AuthGuard] },

  { path: 'results/:id', component: TestResultComponent, canActivate: [AuthGuard] },


  { path: 'create', component: CreateTestComponent, canActivate: [AuthGuard] },
  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
