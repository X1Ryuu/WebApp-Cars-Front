import {Component, Input} from '@angular/core';
import {Brand} from '../../../entities/brand/brand';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent {
  @Input() brand!: Brand;
}
