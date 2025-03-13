import {Component, OnInit} from '@angular/core';
import {Model} from '../../../entities/model/model';
import {ModelService} from '../../../services/model/model-service.service';
import {BreadcrumbService} from '../../../services/breadcrumbs/breadcrumb.service';
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
    RouterLink,
    ItemComponent
  ],
  templateUrl: './bread-model.component.html',
  styleUrl: './bread-model.component.css'
})
export class BreadModelComponent implements OnInit{

  brandName: string | null = '';
  brand: Brand | undefined;
  models: any[] = [];
  data: string ='';

  constructor(private route: ActivatedRoute, private modelService: ModelService, private brandService: BrandService) {}

  ngOnInit(): void {
    console.log("Name: "+this.brandName +", Data: "+ this.data);
    // Pobierz parametr brandId z trasy
    this.route.paramMap.subscribe(params => {
      this.brandName = params.get('brandName');
      this.brandService.getBrandByName(this.brandName).subscribe(brand => {
        this.brand = brand;

        this.loadModels(this.brand.id);
      });

    });

  }

  loadModels(brandId: number): void {
    this.modelService.getModelsByBrand(brandId).subscribe(models => {
      console.log("Models: "+models, brandId);
      this.models = models;
    });
  }


}
