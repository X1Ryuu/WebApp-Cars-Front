/*
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppModule { }
*/


import {APP_INITIALIZER, NgModule, OnDestroy, OnInit} from '@angular/core';
import {AppComponent} from './app.component';

import {HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import {AppRoutingModule} from './app-routing.module';

import {RouterModule, RouterOutlet} from '@angular/router';
import {NavbarComponent} from './components/navbar/navbar.component';
import {OAuthService} from 'angular-oauth2-oidc';
import {JwtHelperService} from '@auth0/angular-jwt';
import {filter, Subscription} from 'rxjs';


/*@NgModule({
  declarations: [
    AppComponent,
    BrandListComponent,
    NavbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  exports: [BrowserModule],
  bootstrap: [AppComponent]
})

export class AppModule { }*/

/*function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:9090',
        realm: 'my-realm',
        clientId: 'angular-app',
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
      },
    });
}*/
@NgModule({
  declarations: [


  ],

  imports: [
    KeycloakAngularModule,

    RouterModule,
    AppRoutingModule,
    HttpClientModule,
  ],


  bootstrap: []
})

export class AppModule {

}
