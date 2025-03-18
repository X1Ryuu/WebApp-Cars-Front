import {Component, OnInit} from '@angular/core';
import {Brand} from '../../../entities/brand/brand';
import {BrandService} from '../../../services/brand/brand-service.service';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {BrandComponent} from '../../items/brand/brand.component';

@Component({
  selector: 'app-bread-brand',
  standalone: true,
  imports: [
    NgForOf,
    BrandComponent,
    RouterLink,

  ],
  templateUrl: './bread-brand.component.html',
  styleUrl: './bread-brand.component.css'
})
export class BreadBrandComponent implements OnInit{


  brands: Brand[] = [];

  constructor(
    private brandService: BrandService,
  ) {}

  ngOnInit(): void {
    this.brandService.findAll().subscribe((brands) => {
      this.brands = brands;
      /*console.log(this.brands[0].models[0])*/
     // this.show();
    });

  }
/*  show(brand: Brand){

      console.log(brand);


  }*/

  show(){
    for(let brand of this.brands){
      console.log(brand);
      for(let model of brand.models){
        console.log(model);
      }
    }
  }


}
