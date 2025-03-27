import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})

export class ItemComponent implements OnInit{
  @Input() date!: string;
  @Input() name!: string;
  ngOnInit(): void {

  }
}
