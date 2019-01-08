import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guards';
import { CreateTestComponent } from './create-test/create-test.component';
import {} from './tests/tests.module'
import { TestsComponent, TestLauncherComponent, TestResultComponent } from './tests';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  // { path: 'tests/:id', component: TestDetailComponent, canActivate: [AuthGuard] },

  { path: 'tests', component: TestsComponent },
  { path: 'tests/:id', component: TestLauncherComponent },
  { path: 'tests/:id/result', component: TestResultComponent },

  // { 
  //   path: 'tests', 
  //   loadChildren: () => TestsModule
  // },

  // { path: 'tests/create', component: CreateTestComponent, canActivate: [AuthGuard] },
  
  { path: 'create', component: CreateTestComponent },
  
  { path: '', redirectTo: 'tests/1015', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
