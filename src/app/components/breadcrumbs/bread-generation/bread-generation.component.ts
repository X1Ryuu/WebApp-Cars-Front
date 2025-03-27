import {Component, OnInit} from '@angular/core';
import {ItemComponent} from '../../items/item/item.component';
import {NgForOf} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Brand} from "../../../entities/brand/brand";
import {ModelService} from "../../../services/model/model-service.service";
import {BrandService} from "../../../services/brand/brand-service.service";
import {GenerationService} from "../../../services/generation/generation-service.service";
import {Generation} from "../../../entities/generation/generation";

@Component({
  selector: 'app-bread-generation',
  standalone: true,
  imports: [
    ItemComponent,
    NgForOf,

  ],
  templateUrl: './bread-generation.component.html',
  styleUrl: './bread-generation.component.css'
})
export class BreadGenerationComponent implements OnInit{
  modelName: string | null = '';
  brandName: string | null = '';
  generations: any[] = [];
  data: string ='';

  constructor(private route: ActivatedRoute, private generationService: GenerationService, private router: Router) {}

  ngOnInit(): void {
    console.log("Name: "+this.modelName +", Data: "+ this.data);
    // Pobierz parametr brandId z trasy
    this.route.paramMap.subscribe(params => {
      this.brandName = params.get('brandName');
      this.modelName = params.get('modelName');
      this.generationService.getGenerationsByModelName(this.modelName).subscribe(generations => {
        this.generations = generations;
      })
    });

  }

  getNavigationPath(generation: Generation): void {
    //console.log(generation.versions, ['archives', this.brandName, this.modelName, 'gens', generation.name]);
    if (generation.versions && generation.versions.length > 0) {
      // Jeśli są generacje, przekieruj do pierwszej generacji
      this.router.navigate(['archives', this.brandName, this.modelName, 'gens', generation.name]);
    }
  }

}
