import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    OperationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputMaskModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
