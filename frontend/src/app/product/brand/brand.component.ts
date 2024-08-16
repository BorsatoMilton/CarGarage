import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrandsService } from '../../core/services/brands.services.js';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit {
brandForm: FormGroup=new FormGroup({}); 

constructor(
private fb: FormBuilder, 
private brandService: BrandsService
)
 {}

ngOnInit(): void {
this.brandForm = this.fb.group({
nombreMarca: ['', Validators.required]
});
}

onSubmit() {
  if (this.brandForm.valid) {
    const brandData = this.brandForm.value;
  
    this.brandService.addBrand(brandData).subscribe((brand) => {
      alert('Marca agregada' );
      this.brandForm.reset();
    });
  }
}
}
