import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Model} from '../../entities/model/model';
import {OAuthService} from 'angular-oauth2-oidc';
import {Brand} from "../../entities/brand/brand";

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  mainUrl = `${environment.apiUrl}`;
  modelsUrl = `${this.mainUrl}/models`
  constructor(private http: HttpClient, private oauthService: OAuthService) {
  }
  public findAll(): Observable<Model[]>{
    return this.http.get<Model[]>(`${this.modelsUrl}/all`);
  }

  public getModelByName(modelName: string | null): Observable<Model>{
    console.log(modelName);
    return this.http.get<Model>(`${this.modelsUrl}/${modelName}`);
  }

  public getModelsByBrand(nameId: number): Observable<Model[]>{
    console.log(nameId);
    return this.http.get<Model[]>(`${this.modelsUrl}/${nameId}`);
  }

  public getModelsByBrandName(name: string | null): Observable<Model[]>{
    return this.http.get<Model[]>(`${this.modelsUrl}/${name}`);
  }



  public addModel(model: any){
    console.log("Model: "+model);
    const token = this.oauthService.getAccessToken(); // Get the JWT token
    return this.http.post(`${this.modelsUrl}/add`, model, {
      headers: {
        'Authorization': `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    /*    return this.http.post<Brand>(`${this.brandsUrl}/add`, brand);*/
  }

}
