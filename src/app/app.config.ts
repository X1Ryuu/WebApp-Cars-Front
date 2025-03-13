import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient} from '@angular/common/http';
import {KeycloakService} from 'keycloak-angular';
import {AuthConfig, OAuthEvent, OAuthService, provideOAuthClient} from 'angular-oauth2-oidc';
import {AuthInterceptor} from './auth/auth.interceptor';


export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:9090/realms/my-realm',
  tokenEndpoint: 'http://localhost:9090/realms/my-realm/protocol/openid-connect/token',
  redirectUri: window.location.origin,
/*  redirectUri: 'http://localhost:4200',*/
/*  redirectUri: 'http://localhost:4200',*/
  clientId: 'angular-app',
  responseType: 'code',
  scope: 'openid profile',

}

/*function initializeOAuth(oauth: OAuthService): Promise<void>{
  return new Promise((resolve)=> {
  //  oauth.configure(authCodeFlowConfig);
    oauth.setupAutomaticSilentRefresh();
    oauth.loadDiscoveryDocumentAndLogin().then(() => {
      resolve();
      console.log("Token: ", oauth.getAccessToken());
    }).catch(err => {
      console.error('Error during login:', err);
    });

  });
}*/

function initializeOAuth(oauth: OAuthService): Promise<void>{
  return new Promise((resolve)=> {
    oauth.configure(authCodeFlowConfig);
    oauth.setupAutomaticSilentRefresh();
    oauth.loadDiscoveryDocumentAndTryLogin().then(() => {
      resolve();
      console.log("Token: ", oauth.getAccessToken());
    }).catch(err => {
      console.error('Error during login:', err);
    });

  });
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (oauthService: OAuthService) => {
        return () => {initializeOAuth(oauthService);
        }
      },
      multi: true,
      deps: [OAuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
