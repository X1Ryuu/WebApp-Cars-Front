import {Component, Input} from '@angular/core';
import {Model} from '../../../entities/model/model';
import {Generation} from '../../../entities/generation/generation';

@Component({
  selector: 'app-generation',
  standalone: true,
  imports: [],
  templateUrl: './generation.component.html',
  styleUrl: './generation.component.css'
})
export class GenerationComponent {
  @Input() generation!: Generation;
}
