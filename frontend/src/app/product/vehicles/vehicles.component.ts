import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehiclesService } from '../../core/services/vehicles.services.js';
import { Vehicle } from '../../core/models/vehicles.interface.js';
import { BrandComponent } from '../brand/brand.component.js';
import { BrandsService } from '../../core/services/brands.services.js';
import { Brand } from '../../core/models/brands.interfaces.js';
import { CategoriesService } from '../../core/services/categories.service.js';
import { Category } from '../../core/models/categories.interface.js';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, BrandComponent],
  templateUrl: 'vehicles.component.html',
  styleUrl: './vehicles.component.css'

})

export class VehicleComponent implements OnInit {
vehicleForm: FormGroup=new FormGroup({}); 
vehicles: Vehicle[] = [];
selectedVehicle: Vehicle | null = null;
brands: Brand[] = [];
categories: Category[] = [];




constructor(
private fb: FormBuilder, 
private vehicleService: VehiclesService,
private brandService: BrandsService,
private categoriesService: CategoriesService
)
 {this.vehicleForm = this.fb.group({
  nombre: ['', Validators.required],
  descripcion: ['', Validators.required],
  precioVenta: ['', Validators.required],
  precioAlquilerDiario: ['', Validators.required],
  stock: [''],
  modelo: ['', Validators.required],
  marca: ['', Validators.required],
  categoria: ['', Validators.required],
  });}

ngOnInit(): void {
    this.loadVehicle()
    this.vehicleService.getBrands().subscribe(data => {
      this.brands = data;
    });
    this.vehicleService.getCategories().subscribe(data => {
      this.categories = data;
    });
    console.log(this.vehicles)
    
}



openModal(modalId: string, vehicle: Vehicle): void{
  this.selectedVehicle = vehicle;
  const marcaid = vehicle.marca
  const categoriaid = vehicle.categoria
  if (vehicle) {
    const marcaobjeto = this.brandService.getOneBrand(marcaid).subscribe((marca) => {
    const nombremarca = marca.nombreMarca;
    const categoriaobjeto = this.categoriesService.getOneCategory(categoriaid).subscribe((categoria) => {
      const nombrecategoria = categoria.nombreCategoria;
    this.vehicleForm.patchValue({
      nombre: vehicle.nombre,
      descripcion: vehicle.descripcion,
      fechaAlta: vehicle.fechaAlta,
      fechaBaja: vehicle.fechaBaja,
      precioVenta: vehicle.precioVenta,
      precioAlquilerDiario: vehicle.precioAlquilerDiario,
      stock: vehicle.stock,
      modelo: vehicle.modelo,
      marca: nombremarca,
      categoria: nombrecategoria,
      vendedor: vehicle.vendedor,
    });})})
    
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
  this.selectedVehicle= null;
}

addVehicle() {
  if (this.vehicleForm.valid) {
    const vehicleData = this.vehicleForm.value;
  
    this.vehicleService.addVehicle(vehicleData).subscribe(() => {
      alert('Vehiculo agregada' );
      this.vehicleForm.reset();
      this.closeModal('addVehicle');
      this.loadVehicle() 
    });
  }

}

loadVehicle(): void {
  this.vehicleService.getAllVehicle().subscribe((vehicles : Vehicle[]) => {
    this.vehicles = vehicles;
  });
}

editVehicle(): void {
  if (this.selectedVehicle) {
    const updatedVehicle: Vehicle = {
      ...this.selectedVehicle,
      ...this.vehicleForm.value,
    };
    console.log('Vehículo a actualizar:', updatedVehicle);
    this.vehicleService.editVehicle(updatedVehicle).subscribe(() => {
      alert('Vehiculo actualizado');
      this.closeModal('editVehicle');
      this.loadVehicle();
      this.vehicleForm.reset();
    });
  }
}
removeVehicle(vehicle: Vehicle | null, modalId: string) {
  if(vehicle){
      this.vehicleService.deleteVehicle(vehicle).subscribe(() => {
        alert('Vehiculo eliminado');
        this.loadVehicle();
        this.closeModal(modalId);
        this.vehicleForm.reset();
      });
  }
}
}

