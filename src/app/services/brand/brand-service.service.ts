import { Injectable } from '@angular/core';
import {Brand} from '../../entities/brand/brand';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.development';
import {NgForm} from '@angular/forms';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable({providedIn: 'root'})
export class BrandService {

  mainUrl = `${environment.apiUrl}`;
  brandsUrl = `${this.mainUrl}/brands`
  constructor(private http: HttpClient,   private oauthService: OAuthService) {
  }
  public findAll(): Observable<Brand[]>{
    return this.http.get<Brand[]>(`${this.brandsUrl}/all`);
  }

  public getBrandByName(brandName: string | null): Observable<Brand>{
    console.log(brandName);
    return this.http.get<Brand>(`${this.brandsUrl}/${brandName}`);
  }


  public addBrand(brand: any){
    console.log("Brand: "+brand);
    const token = this.oauthService.getAccessToken(); // Get the JWT token
    return this.http.post(`${this.brandsUrl}/add`, brand, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });
/*    return this.http.post<Brand>(`${this.brandsUrl}/add`, brand);*/
  }

  public updateBrand(brand: Brand) :Observable<Brand> {
    return this.http.put<Brand>(`${this.brandsUrl}/update`, brand);
  }

  public deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.brandsUrl}/delete/${id}`);
  }
}
