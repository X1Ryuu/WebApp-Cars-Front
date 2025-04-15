import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../../../environments/environment.development';
import {Observable} from "rxjs";
import {Generation} from "../../entities/generation/generation";
import {Version} from "../../entities/version/version";
import {Brand} from "../../entities/brand/brand";

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  mainUrl = `${environment.apiUrl}`;
  versionsUrl = `${this.mainUrl}/versions`

  constructor(private http: HttpClient, private oauthService: OAuthService) { }

  public addVersion(version: any){
    console.log("Version: "+version);
    const token = this.oauthService.getAccessToken(); // Get the JWT token
    return this.http.post(`${this.versionsUrl}/add`, version, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    /*    return this.http.post<Brand>(`${this.brandsUrl}/add`, brand);*/
  }
  public getVersionByName(versionName: string | null): Observable<Version>{
    console.log(versionName);
    return this.http.get<Version>(`${this.versionsUrl}/${versionName}`);
  }

  public getVersionsByModel(modelName: string | null): Observable<Version[]>{
    return this.http.get<Version[]>(`${this.versionsUrl}/mods/${modelName}`);
  }

  public getVersionsByGeneration(generationName: string | null): Observable<Version[]>{
    return this.http.get<Version[]>(`${this.versionsUrl}/gens/${generationName}`);
  }

}
