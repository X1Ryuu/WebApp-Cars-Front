



import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    FormsModule,
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
