import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  mainUrl = `${environment.apiUrl}`;
  versionUrl = `${this.mainUrl}/versions`

  constructor(private http: HttpClient, private oauthService: OAuthService) { }

  public addVersion(version: any){
    console.log("Version: "+version);
    const token = this.oauthService.getAccessToken(); // Get the JWT token
    return this.http.post(`${this.versionUrl}/add`, version, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    /*    return this.http.post<Brand>(`${this.brandsUrl}/add`, brand);*/
  }
}
