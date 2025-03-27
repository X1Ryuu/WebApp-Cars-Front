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
/*    {path: 'editions', component: EditionPillsComponent},
    {path: 'archives', component: BreadcrumbComponent, data:{type: 'normal'}, children: [
        {path: '', component: BreadBrandComponent},//brands
        {path: ':brandName', children: [
            {path: '', component: BreadModelComponent},//models
            {path: ':modelName', children: [
                {path: 'gens', children: [
                    {path: '', component: BreadGenerationComponent},
                    {path: ':generationName', children: [
                        {path: '', component: BreadVersionComponent},//versions
                        {path: ':versionName', children: [
                                {path: '', component: BreadEngineComponent},//version
                                //{path: ':engineId', component: }
                        ]}
                    ]},
                ]},//generations
                {path: 'vers', children: [
                    {path: '', component: BreadVersionComponent},
                    {path: ':versionName', children: [
                        {path: '', component: BreadEngineComponent}
                    ]}
                ]},

            ]},

        ]},
    ]},*/


    {path: 'editions', component: EditionPillsComponent},
    {path: 'archives', component: BreadcrumbComponent, data:{type: 'normal'}, children: [
            {path: '', component: BreadBrandComponent},//brands
            {path: ':brandName', children: [
                {path: '', component: BreadModelComponent},//models
                {path: ':modelName/gens',children:[
                    {path: '', component: BreadGenerationComponent},
                    {path: ':generationName', children: [
                        {path: '', component: BreadVersionComponent},//versions
                        {path: ':versionName', children: [
                            {path: '', component: BreadEngineComponent},//version
                            //{path: ':engineId', component: }
                        ]}
                    ]},
                ]},
                {path: ':modelName/vers', component: BreadVersionComponent},

            ]},
        ]},


/*    {path: 'archives', component: BreadcrumbComponent, data:{type: 'normal'}, children: [
        {path: '', component: BreadBrandComponent},//brands
        {path: ':brandName', component: BreadModelComponent},//models
        {path: ':brandName/:modelName/gens', component: BreadGenerationComponent},//generations
        {path: ':brandName/:modelName/gens/:generationName', component: BreadVersionComponent},//versions
        {path: ':brandName/:modelName/gens/:generationName/:versionName', component: BreadEngineComponent},//engines
        {path: ':brandName/:modelName/', component: BreadVersionComponent},//versions
        {path: ':brandName/:modelName/:versionName', component: BreadEngineComponent},//engines
    ]}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
