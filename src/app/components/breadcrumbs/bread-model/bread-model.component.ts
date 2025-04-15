import {Component, OnInit} from '@angular/core';
import {Model} from '../../../entities/model/model';
import {ModelService} from '../../../services/model/model-service.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {ModelComponent} from '../../items/model/model.component';
import {BrandComponent} from '../../items/brand/brand.component';
import {ItemComponent} from '../../items/item/item.component';
import {BrandService} from '../../../services/brand/brand-service.service';
import {Brand} from '../../../entities/brand/brand';


@Component({
  selector: 'app-bread-model',
  standalone: true,
  imports: [
    NgForOf,

    ItemComponent
  ],
  templateUrl: './bread-model.component.html',
  styleUrl: './bread-model.component.css'
})
export class BreadModelComponent implements OnInit{

  brandName: string | null = '';
  models: any[] = [];
  data: string ='';

  constructor(private route: ActivatedRoute, private modelService: ModelService, private router: Router) {}

  ngOnInit(): void {
    //console.log("Name: "+this.brandName +", Data: "+ this.data, ", Brand: "+this.brand);
    // Pobierz parametr brandId z trasy
    this.route.paramMap.subscribe(params => {
      this.brandName = params.get('brandName');
      //console.log(this.brandName)
      this.modelService.getModelsByBrandName(this.brandName).subscribe(models => {
          this.models = models;
         // console.log(this.models);
      })

    });

  }
/*  getNavigationPath(model: Model){
    console.log(model.generations, model.versions);
    console.log(model, this.brandName);
    if (model.generations && model.generations.length > 0) {
      this.router.navigate(['archives', this.brandName, model.name, 'gens']);
/!*
      return [model.name]; // Przekierowanie do generacji
*!/
    } else {
/!*
      return [model.name, 'gen']; // Przekierowanie do wersji
*!/
      this.router.navigate(['archives', this.brandName, model.name]);

    }
  }*/


  getNavigationPath(model: Model): void {
    if (model.generations && model.generations.length > 0) {
      // Jeśli są generacje, przekieruj do pierwszej generacji
      this.router.navigate(['archives', this.brandName, model.name, 'gens']);
    } else if (model.versions && model.versions.length > 0) {
      // Jeśli są wersje, przekieruj do pierwszej wersji
      this.router.navigate(['archives', this.brandName, model.name, 'vers']);
    }
  }
}
