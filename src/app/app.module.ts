import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule }    from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestDetailComponent } from './test-detail/test-detail.component';

import { JwtInterceptor } from './core/interceptors';
import { HomeComponent } from './home/home.component';
import { CreateTestComponent } from './create-test/create-test.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule, MatInputModule, MatCardModule} from '@angular/material';

import { 
  HeaderComponent, 
  FooterComponent,
  SharedModule,
} from './shared';

import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestsModule } from './tests/tests.module';
import { CreateTestModule } from './create-test/create-test.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TestDetailComponent,
    HomeComponent,
    // CreateTestComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TestsModule,
    CreateTestModule,
    AuthModule,
    
    BrowserAnimationsModule,

    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
