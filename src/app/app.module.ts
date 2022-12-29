import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { PainelComponent } from './pages/painel/painel.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { OperationComponent } from './components/operation/operation.component';
import { OperationsTableComponent } from './components/operations-table/operations-table.component';
import { OperationFormComponent } from './components/operation-form/operation-form.component';
import { PackageComponent } from './components/package/package.component';
import { MaxWidthDirective } from './max-width.directive';
import { IconComponent } from './components/icon/icon.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterFormComponent,
    LoginFormComponent,
    PainelComponent,
    UserDetailComponent,
    OperationComponent,
    OperationsTableComponent,
    OperationFormComponent,
    PackageComponent,
    MaxWidthDirective,
    IconComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputMaskModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
