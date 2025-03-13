/*
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAdminSubject = new BehaviorSubject<boolean>(false);  // Używamy BehaviorSubject do śledzenia stanu admina
  private roles: string[] = [];

  constructor(private oauthService: OAuthService) {
    this.oauthService.events.subscribe(e => {
      if (e.type === 'token_received') {
        this.updateRoles();

      }
    });

  }

  private updateRoles(): void {
    // Odczytaj token z OAuthService
    const claims = this.oauthService.getIdentityClaims();
    if (claims && claims['roles']) {
      this.roles = claims['roles'];
      const isAdmin = this.roles.includes('admin');
      this.isAdminSubject.next(isAdmin);  // Ustawienie, czy użytkownik ma rolę admin
    }
  }

  // Metoda, która zwraca Observable dla komponentów subskrybujących
  isAdmin$() {
    return this.isAdminSubject.asObservable();
  }

  // Metoda, która zwraca wszystkie role
  getRoles(): string[] {
    return this.roles;
  }


}

*/



/*
isAdmin: boolean = false;
helper: JwtHelperService;
roles: string[] = [];
isAble: boolean = false;
private oauthSubscription: Subscription = new Subscription();

constructor(private oauthService: OAuthService, private http: HttpClient) {
  this.helper = new JwtHelperService();
}

ngOnInit(): void {
  // Subskrypcja na zdarzenie logowania/odświeżenia tokenu
  this.oauthSubscription = this.oauthService.events
    .pipe(filter(e => e.type === 'token_received' || e.type === 'token_expires'))
    .subscribe(() => {

      this.checkRoles();  // Odświeżenie ról po zalogowaniu lub odświeżeniu tokenu

      this.isAble = /!*this.isAdmin &&*!/ this.oauthService.hasValidAccessToken();  // Sprawdzanie, czy token jest ważny

    });

  // Początkowe sprawdzenie ról
  //this.checkRoles();
}

ngOnDestroy(): void {
  if (this.oauthSubscription) {
  this.oauthSubscription.unsubscribe();  // Usuwamy subskrypcję przy zniszczeniu komponentu
}
}

checkRoles(): void {
  const token = this.oauthService.getAccessToken();  // Pobierz token
  if (token) {
    // Dekodowanie tokenu JWT
    const decodedToken = this.helper.decodeToken(token);

    // Odczyt ról z tokenu (w zależności od struktury tokenu)
    const roles: string[] = decodedToken?.realm_access?.roles || [];

    // Ustawienie flagi admina na podstawie ról
    this.isAdmin = roles.includes('admin');
    this.roles = roles;  // Przechowanie ról w tablicy

    // Ustawienie stanu dostępności
    this.isAble = this.isAdmin && this.oauthService.hasValidAccessToken();
  }
}

showRoles(): void {
  console.log("Roles:", this.roles);
  console.log("Is admin:", this.isAdmin);
  console.log("Is valid token:", this.oauthService.hasValidAccessToken());
  console.log("Is able:", this.isAble);
}

login(event: MouseEvent): void {
  event.preventDefault();
  this.oauthService.initLoginFlow();  // Rozpoczyna logowanie
  this.oauthService.events
    .pipe(filter(e => e.type === 'token_received'))
    .subscribe(() => {
      this.checkRoles();  // Odświeżenie ról po zalogowaniu
      console.log('Logged in and roles checked');
      window.location.reload();
    });
}

logout(event: MouseEvent): void {
  event.preventDefault();
  this.oauthService.logOut();  // Wylogowanie użytkownika
  window.location.reload();  // Przeładowanie strony po wylogowaniu
}

isLoggedIn(): boolean {
  return this.oauthService.hasValidAccessToken();  // Sprawdza, czy użytkownik jest zalogowany
}*/


import { Injectable, OnDestroy } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription, filter } from 'rxjs';

@Injectable({
  providedIn: 'root', // Make the service available application-wide
})
export class AuthService implements OnDestroy {
  isAdmin: boolean = false;
  helper: JwtHelperService;
  roles: string[] = [];
  isAble: boolean = false;
  private oauthSubscription: Subscription = new Subscription();

  constructor(private oauthService: OAuthService) {
    this.helper = new JwtHelperService();
  }

  initialize(): void {
    // Subscribe to OAuth events (e.g., token received or expired)
    this.oauthSubscription = this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received' || e.type === 'token_expires'))
      .subscribe(() => {
        this.checkRoles(); // Refresh roles after login or token refresh
        this.isAble = this.isAdmin && this.oauthService.hasValidAccessToken(); // Check if the token is valid
      });

    // Initial role check
    this.checkRoles();
    console.log(this.isAdmin)
    console.log(this.roles)
  }

  ngOnDestroy(): void {
    if (this.oauthSubscription) {
      this.oauthSubscription.unsubscribe(); // Clean up the subscription
    }
  }

  checkRoles(): void {
    const token = this.oauthService.getAccessToken(); // Get the token
    if (token) {
      // Decode the JWT token
      const decodedToken = this.helper.decodeToken(token);

      // Extract roles from the token (adjust based on your token structure)
      const roles: string[] = decodedToken?.['resource_access']?.['angular-app']?.roles || [];

      // Set the admin flag based on roles
      this.isAdmin = roles.includes('admin');
      this.roles = roles; // Store roles in an array

      // Update the ability status
      this.isAble = this.isAdmin && this.oauthService.hasValidAccessToken();
    }
  }
  public getRoles(){
    return this.roles;
  }

  public doesIncludeRole(role: string): boolean {
    return this.roles.includes(role);
  }

  showRoles(): void {
    console.log('Roles:', this.roles);
    console.log('Is admin:', this.isAdmin);
    console.log('Is valid token:', this.oauthService.hasValidAccessToken());
    console.log('Is able:', this.isAble);
  }

  login(): void {
    this.oauthService.initLoginFlow(); // Start the login flow
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe(() => {
        this.checkRoles(); // Refresh roles after login
      });
/*    window.location.reload(); // Reload the page after login
    this.checkRoles();*/
  //  console.log('Logged in and roles checked');
  }

  logout(): void {
    this.oauthService.logOut(); // Log out the user
    window.location.reload(); // Reload the page after logout
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken(); // Check if the user is logged in
  }
}
