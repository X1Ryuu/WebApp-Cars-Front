import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {BrandService} from '../../../../services/brand/brand-service.service';
import {ModelService} from '../../../../services/model/model-service.service';
import {VersionService} from '../../../../services/version/version-service.service';
import {GenerationService} from '../../../../services/generation/generation.service';
import {Brand} from '../../../../entities/brand/brand';


@Component({
  selector: 'app-car-add-pills',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf,
    NgClass
  ],
  templateUrl: './car-add-pills.component.html',
  styleUrl: './car-add-pills.component.css'
})
export class CarAddPillsComponent implements OnInit {
  activeTab: string = 'brands'; // Aktywna zakładka
  successMessage: string | null = null;
  errorMessage: string | null = null;


  brands: any[] = [];
  models: any[] = [];
  generations: any[] = [];
  versions: any[] = [];
  engines: any[] = [];
  years: string[] = [];



  brandForm!: FormGroup;
  modelForm!: FormGroup;
  generationForm!: FormGroup;
  versionForm!: FormGroup;
  engineForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private brandService: BrandService,
              private modelService: ModelService,
              private versionService: VersionService,
              private generationService: GenerationService,
              private engineService: GenerationService
              ) {}

  ngOnInit(): void {
 //   this.brand.id = 0;
    this.years.push("now");
    for(let i = new Date().getFullYear(); i >= 1900; i--){
      this.years.push(i.toString());
    }
    this.brandForm = this.fb.group({
      name: ['', Validators.required],
      logo: ['']
    });

    this.modelForm = this.fb.group({
      brandName: ['', Validators.required],
      name: ['', Validators.required],
/*      startYear: ['', Validators.required],
      endYear: ['', Validators.required]*/
    });

    this.generationForm = this.fb.group({
      brandId: ['', Validators.required],
      modelId: ['', Validators.required],
      name: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required]
    });


    this.versionForm = this.fb.group({
      brandId: ['', Validators.required],
      modelId: ['', Validators.required],
      generationId: ['', Validators.required],
      name: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required]
    });


    this.engineForm = this.fb.group({
      brandId: ['', Validators.required],
      modelId: ['', Validators.required],
      generationId: ['', Validators.required],
      versionId: ['', Validators.required],
      name: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required]});

    this.loadBrands();
  }

  setActiveTab(tab: string) {
    if(tab!=this.activeTab) this.resetForms();
    this.activeTab = tab;
  }


  resetForms(){
    this.brandForm.reset();
    this.modelForm.reset();
    this.generationForm.reset();
    this.versionForm.reset();
    this.engineForm.reset();
  }


  loadBrands() {

    this.brandService.findAll().subscribe((brands) => {
      this.brands = this.brands.concat(brands);
    });
  }

  onBrandChange() {
    let brandId = this.generationForm.get('brandId')?.value;
    if(brandId.empty) {
      brandId = this.versionForm.get('brandId')?.value;
    }
    console.log(brandId)
    if (brandId) {
      this.http.get<any[]>(`http://localhost:8080/models/${brandId}`).subscribe({
        next: data => this.models = data,
        error: err => this.errorMessage = 'Error loading models'
    });
    }
  }

  onModelChange(){

  }

  onGenerationChange(){}


  onVersionChange(){}

/*  submitBrand() {
    this.http.post('http://localhost:8080/brands/add', this.brandForm.value).subscribe({
      next: () =>{
        this.successMessage = 'Brand added successfully!';
        console.log(this.brandForm.value);
      },

      error: () => this.errorMessage = 'Error adding brand'
  });
  }*/

  submitBrand(){
  //  console.log(this.brandForm.value)
    if (this.brandForm.valid) {
      this.brandService.addBrand(this.brandForm.value).subscribe({
        next: (response) => {
          alert('Brand added successfully');
          this.resetForms();
        },
        error: (error) => {
          console.log(this.brandForm.value);
          console.error('Error adding brand:', error);
          alert('Failed to add brand');
        }
      });
    }
  }
  public oj: boolean = 2025<new Date().getFullYear();

  submitModel() {


/*    console.log(this.modelForm.value.name+", "+this.modelForm.value.brandId+", "+this.modelForm.value.startYear+", "+this.modelForm.value.endYear)
    console.log(this.modelForm.value+", "+this.modelForm.valid+", "+this.oj)*/
      //  console.log(this.brandForm.value)

    const selectedBrandId = this.modelForm.value.brandName;
    console.log(this.brands, this.modelForm.value);

    const modelData = {
      name: this.modelForm.value.name,
/*      startYear: this.modelForm.value.startYear,
      endYear: this.modelForm.value.endYear,*/
 //     brand: this.brand,
      brandId: selectedBrandId // Przekazujemy brand jako obiekt
    };
    console.log(modelData, selectedBrandId);




      if (this.modelForm.valid) {
        console.log("Valid model form")
        this.modelService.addModel(modelData).subscribe({
          next: (response) => {
            alert('Model added successfully');
            this.resetForms();
          },
          error: (error) => {
            console.log(this.modelForm.value);
            console.error('Error adding brand:', error);
            alert('Failed to add brand');
          }
        });
      }
  }

  submitGeneration(){
    console.log(this.generationForm.value, this.generationForm.valid)
    if(this.generationForm.valid){
      //this.generationService.addGeneration()
      //this.generationService
    }
  }


  submitVersion() {
    console.log(this.versionForm.value)
    if (this.versionForm.valid) {
      this.versionService.addVersion(this.versionForm.value).subscribe({
        next: (response) => {
          alert('Version added successfully');
          this.resetForms();
        },
        error: (error) => {
          console.log(this.versionForm.value);
          console.error('Error adding brand:', error);
          alert('Failed to add brand');
        }
      });
    }
  }
  submitEngine(){}
  submitEngDesc(){}

}
