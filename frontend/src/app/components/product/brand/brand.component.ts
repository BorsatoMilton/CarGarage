import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrandsService } from '../../../core/services/brands.service.js';
import { Brand } from '../../../core/models/brands.interfaces.js';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SearcherComponent } from '../../../shared/components/searcher/searcher.component.js';
import { UniversalAlertComponent } from '../../../shared/components/alerts/universal-alert/universal-alert.component.js';
import { alertMethod } from '../../../shared/components/alerts/alert-function/alerts.functions.js';
@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SearcherComponent],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})

export class BrandComponent implements OnInit {
brandForm: FormGroup=new FormGroup({}); 
brands: Brand[] = [];
selectedBrand: Brand | null = null;
filteredBrands: Brand[] = [];

@ViewChild(UniversalAlertComponent) alertComponent!: UniversalAlertComponent

constructor(
private fb: FormBuilder, 
private brandService: BrandsService
)
 {this.brandForm = this.fb.group({
  nombreMarca: ['', Validators.required]
  });}

ngOnInit(): void {
    this.loadBrand()
}

openModal(modalId: string, brand: Brand): void{
  this.selectedBrand = brand;
  if (brand) {
    this.brandForm.patchValue({
      nombreMarca: brand.nombreMarca,
    });
  }
  const modalDiv = document.getElementById(modalId);
  if(modalDiv != null){
    modalDiv.style.display='block';
  }
}

closeModal(modalId: string){
  const modalDiv = document.getElementById(modalId);
  if(modalDiv != null){
    modalDiv.style.display='none';
  }
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop != null) {
    backdrop.parentNode?.removeChild(backdrop);
  }
  this.selectedBrand= null;
}

loadBrand(): void {
  this.brandService.getAllBrand().subscribe((brands : Brand[]) => {
    this.brands = brands;
    this.filteredBrands = brands;
  });
}

onSearch(filteredBrands: Brand[]): void {
  this.filteredBrands = filteredBrands.length > 0 ? filteredBrands : [];
}

checkBrandExists(): Observable<boolean> {
  const nombreMarca = this.brandForm.get('nombreMarca')?.value;
  return this.brandService.getOneBrandByName(nombreMarca).pipe(
    map((marca: Brand) => !!marca),
    catchError(() => of(false))
  );
}

addBrand() {
  if (this.brandForm.valid) {
    const brandData = this.brandForm.value;    
    this.checkBrandExists().subscribe((existe: boolean) => {
      if (!existe) {
          this.brandService.addBrand(brandData).subscribe(() => {
            alertMethod('Alta de marcas', 'Marca agregada exitosamente', 'success');
            this.brandForm.reset();
            this.closeModal('addBrand');
            this.loadBrand();   
         });
      } else {
            this.alertComponent.showAlert('La marca que intenta agregar ya existe', 'error');
            this.brandForm.reset();
      }
  });
  }
}

editBrand(): void {
  if (this.selectedBrand) {
    const updatedBrand: Brand = {
      ...this.selectedBrand,
      ...this.brandForm.value
    };
    this.brandService.editBrand(updatedBrand).subscribe(() => {
      alertMethod('Edición de marcas', 'Marca editada exitosamente', 'success');
      this.closeModal('editBrand');
      this.loadBrand();
      this.brandForm.reset();
    });
  }
}

deleteBrand(brand: Brand | null, modalId: string) {
  if(brand){
      this.brandService.deleteBrand(brand).subscribe(() => {
        alertMethod('Baja de marcas', 'Marca eliminada exitosamente', 'success');
        this.loadBrand();
        this.closeModal(modalId);
        this.brandForm.reset();
      });
  }
}
}

