import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandListComponent } from './components/lists/brand-list/brand-list.component';
import {LogFormComponent} from './components/logForm/log-form/log-form.component';
import {LoginComponent} from './components/logForm/login/login.component';
import {RegisterComponent} from './components/logForm/register/register.component';
import {UserListComponent} from './components/lists/user-list/user-list.component';
import {AppComponent} from './app.component';
import {EditionPillsComponent} from './components/forAdmin/editionPills/edition-pills/edition-pills.component';
import {AuthGuard} from './auth/auth.guard';
import {HomeComponent} from './components/home/home.component';
import {BreadBrandComponent} from './components/breadcrumbs/bread-brand/bread-brand.component';
import {BreadModelComponent} from './components/breadcrumbs/bread-model/bread-model.component';
import {BreadVersionComponent} from './components/breadcrumbs/bread-version/bread-version.component';
import {ModelListComponent} from './components/lists/model-list/model-list.component';
import {BreadcrumbComponent} from './components/breadcrumbs/breadcrumb/breadcrumb.component';
import {BreadGenerationComponent} from './components/breadcrumbs/bread-generation/bread-generation.component';
import {BreadEngineComponent} from './components/breadcrumbs/bread-engine/bread-engine.component';



export const routes: Routes = [

  {path: 'editions', component: EditionPillsComponent, canActivate: [AuthGuard], data: {roles: ['admin']}, },
  // {path: 'editions', component: BreadcrumbComponent, data:{type: 'edit'}},




/*  {path: 'editions', component: EditionPillsComponent, canActivate: [AuthGuard], data: {roles: ['admin']}, children: [
      {path: '', component: BreadBrandComponent},
      {path: ':brandId', component: BreadModelComponent},
    ]},*/
/*  {path: 'brands/all', component: BrandListComponent},
  {path: 'models/:brandId/all', component: ModelListComponent},*/

/*  {path: 'brands', component: BreadBrandComponent, children: [
      {
        path: ':brandId', component: BreadModelComponent
      }
    ]
  },*/
  // {path: 'brands/:brandId', component: BreadcrumbComponent},
/*  {path: 'brands', component: BreadBrandComponent},
  {path: 'brands/:brandId', component: BreadModelComponent},*/
  {path: 'vehicles', component: BreadcrumbComponent, data:{type: 'normal'}, children: [
      {path: '', component: BreadBrandComponent},//marka
  //    {path: ':brandId', component: BreadModelComponent},
      {path: ':brandName', children: [
          {path: '', component: BreadModelComponent},//model
          {path: ':generationId', children: [
              {path: '', component: BreadGenerationComponent},//generacja
              {path: ':versionId', children: [
                  {path: '', component: BreadVersionComponent},//wersja
                  {path: ':engineId', component: BreadEngineComponent}
              ]}
          ]},
          {path: ':versionId', children: [
              {path: '', component: BreadVersionComponent},//wersja
              {path: ':engineId', component: BreadEngineComponent}
          ]}
      ]},


   //   {path: ':brandId/:versionId', component: BreadVersionComponent}
    ]
  },


  {path: 'users', component: UserListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
