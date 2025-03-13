import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Brand}  from '../../../../entities/brand/brand';
import {BrandService} from '../../../../services/brand/brand-service.service';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../../environments/environment.development';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-brand-edition',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './brand-edition.component.html',
  styleUrl: './brand-edition.component.css'
})
export class BrandEditionComponent {
  brands: Brand[] | undefined;
  brandAddForm: FormGroup;
  brandEditForm: FormGroup;
  url: string = environment.apiUrl
  errorMessage: string | null = null;
  constructor(private http: HttpClient, private fb: FormBuilder,
              private brandService: BrandService, private oauthService: OAuthService) {
    this.brandAddForm = this.fb.group({
      name: ['', Validators.required],
      logo: ['', Validators.required]
    });
    this.brandEditForm = this.fb.group({
      name: ['', Validators.required],
      logo: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.brandService.findAll().subscribe(data => {
      this.brands = data;
    });
  }

  reallyTouched(){
    return (this.brandAddForm.get('name')?.touched
      && this.brandAddForm.get('logo')?.touched
      && !this.brandAddForm.valid);
  }

/*
    onOpenModal(){
      this.brandService.addBrand(brand: NgForm).subscribe
    }
  */
  onOpenModal(){}
  onOpenModalEdit(brand: Brand){}


  onSubmit() {
    if(!this.oauthService.hasValidAccessToken())this.oauthService.refreshToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.oauthService.getAccessToken()}`// Przekazywanie tokenu
    });
    console.log('headers: '+JSON.stringify(headers));
    console.log('link: '+this.url);
    console.log('clicked & data: '+JSON.stringify(this.brandAddForm.value));
    if (this.brandAddForm.valid && this.oauthService.getAccessToken()) {
/*      this.brandService.addBrand(this.brandAddForm.value, headers).subscribe(*/
      this.http.post(`${this.url}/brands/add`, this.brandAddForm.value,{ headers,  responseType: 'text' }).subscribe(
        response => {
          this.errorMessage = null;
          console.log('Registration successful:', response);
        },
        error => {
          if (error.status === 409) { // Status 409 dla konfliktu (użytkownik istnieje)
            this.errorMessage = error.error; // Przypisanie komunikatu błędu
          } else {
            this.errorMessage = 'An unexpected error occurred. Please try again later.';
          }
        }
      );
    } else {
      console.log("Form is invalid or passwords don't match.");
    }
  }
}
