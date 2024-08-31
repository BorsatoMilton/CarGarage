import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrandsService } from '../../core/services/brands.services.js';
import { Brand } from '../../core/models/brands.interfaces.js';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit {
brandForm: FormGroup=new FormGroup({}); 
brands: Brand[] = [];
selectedBrand: Brand | null = null;
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

addBrand() {
  if (this.brandForm.valid) {
    const brandData = this.brandForm.value;
  
    this.brandService.addBrand(brandData).subscribe(() => {
      alert('Marca agregada' );
      this.brandForm.reset();
      this.closeModal('addBrand');
      this.ngOnInit();   
    

    });
  }

}

loadBrand(): void {
  this.brandService.getAllBrand().subscribe((brands : Brand[]) => {
    this.brands = brands;
  });
}

editBrand(): void {
  if (this.selectedBrand) {
    const updatedBrand: Brand = {
      ...this.selectedBrand,
      ...this.brandForm.value
    };
    this.brandService.editBrand(updatedBrand).subscribe(() => {
      alert('Marca actualizada');
      this.closeModal('editBrand');
      this.loadBrand();
      this.brandForm.reset();
    });
  }
}

deleteBrand(brand: Brand | null, modalId: string) {
  if(brand){
      this.brandService.deleteBrand(brand).subscribe(() => {
        alert('Marca eliminada');
        this.ngOnInit();
        this.closeModal(modalId);
        this.brandForm.reset();
      });
  }
}
}

