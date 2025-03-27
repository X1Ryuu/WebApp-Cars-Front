import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {VersionService} from '../../../services/version/version-service.service';
import {ItemComponent} from '../../items/item/item.component';
import {NgForOf} from '@angular/common';
import {GenerationService} from "../../../services/generation/generation-service.service";
import {ModelService} from "../../../services/model/model-service.service";
import {Model} from "../../../entities/model/model";
import {Version} from "../../../entities/version/version";

@Component({
  selector: 'app-bread-version',
  standalone: true,
  imports: [
    ItemComponent,
    NgForOf,
  ],
  templateUrl: './bread-version.component.html',
  styleUrl: './bread-version.component.css'
})
export class BreadVersionComponent implements OnInit{

  brandName: string | null = '';
  modelName: string | null = '';
  generationName: string | null = '';
  versions: any[] = [];

  constructor(private route: ActivatedRoute, private versionService: VersionService) {
  }


  ngOnInit(): void {
    // Pobierz parametr brandId z trasy
    this.route.paramMap.subscribe(params => {
      console.log("Got to versions");
      this.brandName = params.get('brandName');
      this.modelName = params.get('modelName');
      this.generationName = params.get('generationName');
      if(this.generationName){
        this.versionService.getVersionsByGeneration(this.generationName).subscribe(versions => {
          this.versions = versions;
        })
      }else{
        this.versionService.getVersionsByModel(this.modelName).subscribe(versions => {
          this.versions = versions;
        })
      }
    });
  }

  getNavigationPath(version: Version): void {
/*    if (model.generations && model.generations.length > 0) {
      // Jeśli są generacje, przekieruj do pierwszej generacji
      this.router.navigate(['archives', this.brandName, model.name, 'gens']);
    } else if (model.versions && model.versions.length > 0) {
      // Jeśli są wersje, przekieruj do pierwszej wersji
      this.router.navigate(['archives', this.brandName, model.name, 'vers']);
    }*/
  }

}
