



import { Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import {AuthService} from '../../services/auth/auth.service';
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    FormsModule,
    RouterLink,
    NgIf,
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
  login(): void {
    this.authService.login();
  }

/*  logout(): void {
    this.authService.logout();
    sessionStorage.clear();
    localStorage.clear();
  }*/

  logout(): void {
    // Wyczyść localStorage/sessionStorage

    this.authService.logout();
    sessionStorage.clear();
    localStorage.clear();


/*    // Dane Keycloak
    const keycloakBaseUrl = 'http://localhost:9090'; // zmień na adres swojego Keycloak
    const realm = 'my-realm'; // zamień na nazwę swojego realm'u
    const redirectUri = encodeURIComponent(window.location.origin); // np. http://localhost:4200

    // Finalny URL do wylogowania
    const logoutUrl = `${keycloakBaseUrl}/realms/${realm}/protocol/openid-connect/logout?redirect_uri=${redirectUri}`;

    // Przekierowanie do Keycloak logout
    window.location.href = logoutUrl;*/
  }

 // protected readonly AppComponent = AppComponent;
}
