import {Component, Input} from '@angular/core';
import {Model} from '../../../entities/model/model';
import {Version} from '../../../entities/version/version';

@Component({
  selector: 'app-version',
  standalone: true,
  imports: [],
  templateUrl: './version.component.html',
  styleUrl: './version.component.css'
})
export class VersionComponent {
  @Input() version!: Version;
}
