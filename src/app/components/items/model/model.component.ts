import {Component, Input} from '@angular/core';
import {Model} from '../../../entities/model/model';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [],
  templateUrl: './model.component.html',
  styleUrl: './model.component.css'
})
export class ModelComponent {
  @Input() model!: Model;
}
