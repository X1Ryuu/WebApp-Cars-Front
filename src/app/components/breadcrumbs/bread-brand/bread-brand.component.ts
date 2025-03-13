import {Component, OnInit} from '@angular/core';
import {Brand} from '../../../entities/brand/brand';
import {BrandService} from '../../../services/brand/brand-service.service';
import {BreadcrumbsService} from '../../../services/breadcrumbs/breadcrumbs.service';
import {BreadcrumbService} from '../../../services/breadcrumbs/breadcrumb.service';
import {NgForOf} from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {BrandComponent} from '../../items/brand/brand.component';

@Component({
  selector: 'app-bread-brand',
  standalone: true,
  imports: [
    NgForOf,
    BreadcrumbComponent,
    BrandComponent,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './bread-brand.component.html',
  styleUrl: './bread-brand.component.css'
})
export class BreadBrandComponent implements OnInit{
 // brands = ['Audi', 'BMW', 'Mercedes'];
/*  brands: Brand[] | undefined;
  constructor(private breadcrumbService: BreadcrumbService, private brandService: BrandService) {}*/

  brands: Brand[] = [];

  constructor(
    private brandService: BrandService,
    private breadcrumbService: BreadcrumbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.brandService.findAll().subscribe((brands) => {
      this.brands = brands;
    });
  }
  show(brand: Brand){
    console.log(brand);
  }

/*  selectBrand(brand: Brand): void {
    // Update breadcrumbs
    this.breadcrumbService.setBreadcrumbs([
      { label: 'Brands', url: '/brands' },
      { label: brand.name, url: `/brands/${brand.nameId}` },
    ]);
    console.log(brand.nameId)
    // Navigate to the models page for the selected brand
  //  this.router.navigate(['/models', brand.nameId, "/all"], )
   // this.router.  navigate(['/brands', brand.name.toLowerCase(), 'models']);
  }*/
}
