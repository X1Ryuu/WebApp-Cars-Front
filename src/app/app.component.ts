


import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [NavbarComponent, RouterOutlet],
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title: string;
  helloUrl: string = `${environment.apiUrl}`;
  helloText: string = '';

  constructor(
    private oauthService: OAuthService,
    private authService: AuthService,
  ) {
    this.title = 'SamochodyOne';
  }

  ngOnInit(): void {
    // Initialize the AuthService
    this.authService.initialize();

    // Load discovery document and try to log in
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      console.log('Discovery document loaded and login attempted');
    });

    // Set up automatic silent refresh
    this.oauthService.setupAutomaticSilentRefresh();

    // Subscribe to token expiration events
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_expires'))
      .subscribe(() => {
        this.refreshAccessToken();
      });
  }



  private refreshAccessToken(): void {
    this.oauthService
      .refreshToken()
      .then(() => {
        console.log('Token refreshed');
      })
      .catch((err) => {
        console.error('Error refreshing token:', err);
        this.oauthService.logOut(); // Log out the user if the refresh token is invalid
        window.location.reload(); // Reload the page to redirect to the login page
      });
  }

  logOut(): void {
    this.oauthService.logOut(); // Log out and remove the token
    window.location.reload(); // Reload the page after logout
  }
}
