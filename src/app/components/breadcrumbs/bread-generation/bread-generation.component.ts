import { Component } from '@angular/core';
import {ItemComponent} from '../../items/item/item.component';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-bread-generation',
  standalone: true,
  imports: [
    ItemComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './bread-generation.component.html',
  styleUrl: './bread-generation.component.css'
})
export class BreadGenerationComponent {
  modelId: string | null = '';
  generations: any[] = [];
  data: string ='';
}
