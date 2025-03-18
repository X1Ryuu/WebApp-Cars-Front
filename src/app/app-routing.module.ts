import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EditionPillsComponent} from './components/forAdmin/editionPills/edition-pills/edition-pills.component';
import {AuthGuard} from './auth/auth.guard';
import {BreadBrandComponent} from './components/breadcrumbs/bread-brand/bread-brand.component';
import {BreadModelComponent} from './components/breadcrumbs/bread-model/bread-model.component';
import {BreadVersionComponent} from './components/breadcrumbs/bread-version/bread-version.component';
import {BreadcrumbComponent} from './components/breadcrumbs/breadcrumb/breadcrumb.component';
import {BreadGenerationComponent} from './components/breadcrumbs/bread-generation/bread-generation.component';
import {BreadEngineComponent} from './components/breadcrumbs/bread-engine/bread-engine.component';
import {AppComponent} from "./app.component";
import {HomeComponent} from "./components/home/home.component";



export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'edit-archives', component: BreadcrumbComponent, canActivate: [AuthGuard], data: {roles: ['admin']}, },
/*
    {path: 'edit-archives'},
*/
    {path: 'archives', component: BreadcrumbComponent, data:{type: 'normal'}, children: [
        {path: '', component: BreadBrandComponent},//brand
        {path: ':brandName', children: [
            {path: '', component: BreadModelComponent},//model
            {path: ':generationId', children: [
                {path: '', component: BreadGenerationComponent},//generation
                {path: ':versionId', children: [
                    {path: '', component: BreadVersionComponent},//version
                    {path: ':engineId', component: BreadEngineComponent}
              ]}
            ]},
            {path: ':versionId', children: [
              {path: '', component: BreadVersionComponent},//version
              {path: ':engineId', component: BreadEngineComponent}
            ]}
        ]},
    ]},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
