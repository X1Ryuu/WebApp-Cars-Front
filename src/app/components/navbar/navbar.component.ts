/*
import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {LogFormComponent} from '../logForm/log-form/log-form.component';
import {OAuthService} from 'angular-oauth2-oidc';
import {NgIf} from '@angular/common';
import {authCodeFlowConfig} from '../../app.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {filter} from 'rxjs';

@Component({

  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    FormsModule,
    LogFormComponent,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAdmin: boolean = false;
  helper: JwtHelperService;
  roles: string[] = [];
  isAble: boolean = false;
  constructor(private oauthService: OAuthService, private http: HttpClient) {
    this.helper = new JwtHelperService();
  }


/!*  ngOnInit(): void {
    this.checkRoles();
    console.log(this.isAdmin);
    this.isAble = this.isAble && this.oauthService.hasValidAccessToken();
  }*!/

  ngOnInit(): void {
    // Subskrypcja na zdarzenie logowania
    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received' || e.type === 'token_expires'))
      .subscribe(() => {
        this.checkRoles();  // Odświeżenie ról po zalogowaniu lub odświeżeniu tokenu
        this.isAble = this.isAdmin && this.oauthService.hasValidAccessToken(); // Sprawdzanie, czy token jest ważny
        console.log(this.isAble);
      });

    // Sprawdzenie ról na początku
    this.checkRoles();
  }



  /!*checkRoles() {
    const token = this.oauthService.getAccessToken();
    if (token) {
      const decodedToken = this.helper.decodeToken(token);
      //const roles: string[] = decodedToken?.realm_access?.roles || [];
      const roles = decodedToken['authorities'];
      this.isAdmin = roles.includes('ROLE_admin');
    }
  }*!/

  checkRoles(): void {
    const token = this.oauthService.getAccessToken();  // Pobierz token
    console.log("Checking Roles+token: "+token)
    if (token) {
      // Dekodowanie tokenu JWT
      const decodedToken = this.helper.decodeToken(token);

      // Sprawdzamy, czy token zawiera 'realm_access' i role
      const roles: string[] = decodedToken?.realm_access?.roles || [];

      // Ustawiamy flagi na podstawie roli
      this.isAdmin = roles.includes('admin');
      console.log(roles)
      this.roles=roles;
  //    this.isUser = roles.includes('user');
    }
  }

  showRoles(){
    console.log("Roles: "+this.roles);
    console.log("Is there admin?: "+this.isAdmin);
    console.log("Is valid token?: "+this.oauthService.hasValidAccessToken())
    console.log("Is able?: "+this.isAble+"\n\n");

  }

  login(event: MouseEvent) {
    event.preventDefault();

    this.oauthService.initLoginFlow(); // Rozpoczyna logowanie
    this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(() => {
        this.checkRoles();  // Odświeżenie ról po zalogowaniu
        console.log('Logged in and roles checked');
      });
   // console.log("Token: ", this.oauthService.getAccessToken() + " turned login");
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    window.location.reload();
    this.oauthService.logOut(); // Wylogowuje użytkownika
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken(); // Sprawdza, czy użytkownik jest zalogowany
  }

}
*/










import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LogFormComponent } from '../logForm/log-form/log-form.component';
import { OAuthService } from 'angular-oauth2-oidc';
import { NgIf } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { filter, Subscription } from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    FormsModule,
    LogFormComponent,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
  login(event: MouseEvent): void {
    this.authService.login();
  }

  logout(event: MouseEvent): void {
    this.authService.logout();
  }

}
