import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ModelService} from '../../../services/model/model-service.service';
import {EngineService} from '../../../services/engine/engine-service.service';
import {ItemComponent} from '../../items/item/item.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-bread-engine',
  standalone: true,
  imports: [
    ItemComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './bread-engine.component.html',
  styleUrl: './bread-engine.component.css'
})
export class BreadEngineComponent {
  versionId: string | null = '';
  engines: any[] = [];

  constructor(private route: ActivatedRoute, private engineService: EngineService) {}
}
