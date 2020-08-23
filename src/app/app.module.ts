import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserAuthenticationComponent } from './components/user-authentication/user-authentication.component';
import {FormsModule} from "@angular/forms";
import {HttpClientService} from "./services/http-client.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthHttpInterceptor} from "./classes/auth-http-interceptor";
import { HomeComponent } from './components/home/home.component';
import {AuthGuard} from "./guards/auth.guard";
import {VerifyTokenGuard} from "./guards/verify-token.guard";
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserAuthenticationComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    HttpClientService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    AuthGuard,
    VerifyTokenGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
