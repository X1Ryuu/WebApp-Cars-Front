import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {VersionService} from '../../../services/version/version-service.service';
import {ItemComponent} from '../../items/item/item.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-bread-version',
  standalone: true,
  imports: [
    ItemComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './bread-version.component.html',
  styleUrl: './bread-version.component.css'
})
export class BreadVersionComponent implements OnInit{
  constructor(private route: ActivatedRoute, private versionService: VersionService) {
  }
  modelId: string | null = '';
  versions: any[] = [];
  ngOnInit(): void {
    console.log(this.modelId)
    // Pobierz parametr brandId z trasy
    this.route.paramMap.subscribe(params => {
      this.modelId = params.get('modelId');
      if (this.modelId) {
        console.log(this.modelId)
        //this.loadVersions(this.modelId);
      }
    });
  }

/*  loadVersionsByModel(modelId: string): void {
    this.versionService.getVersionsByModel(modelId).subscribe(versions => {
      this.versions = versions;
    });
  }

  loadVersionsByGeneration(modelId: string): void {
    this.versionService.getVersionsByGeneration(modelId).subscribe(versions => {
      this.versions = versions;
    });
  }*/
}
