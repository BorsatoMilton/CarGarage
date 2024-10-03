import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  styleUrl: './vehicles.component.css',
})
export class VehicleComponent implements OnInit {
  vehicleForm: FormGroup = new FormGroup({});
  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle | null = null;
  brands: Brand[] = [];
  categories: Category[] = [];
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehiclesService,
    private brandService: BrandsService,
    private categoriesService: CategoriesService
  ) {
    this.vehicleForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precioVenta: ['', Validators.required],
      precioAlquilerDiario: ['', Validators.required],
      stock: [''],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.vehicleService.getBrands().subscribe((data) => {
      this.brands = data;
    });
    this.vehicleService.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.loadVehicle();
  }

  openModal(modalId: string, vehicle: Vehicle): void {
    this.selectedVehicle = vehicle;

    if (vehicle) {
      this.vehicleForm.patchValue({
        nombre: vehicle.nombre,
        descripcion: vehicle.descripcion,
        fechaAlta: vehicle.fechaAlta,
        fechaBaja: vehicle.fechaBaja,
        precioVenta: vehicle.precioVenta,
        precioAlquilerDiario: vehicle.precioAlquilerDiario,
        stock: vehicle.stock,
        modelo: vehicle.modelo,
        marca: vehicle.marca,
        categoria: vehicle.categoria,
      });
    }

    const modalDiv = document.getElementById(modalId);
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  closeModal(modalId: string) {
    const modalDiv = document.getElementById(modalId);
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
    }
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop != null) {
      backdrop.parentNode?.removeChild(backdrop);
    }
    this.selectedVehicle = null;
  }

  addVehicle() {
    if (this.vehicleForm.invalid) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }
    const formData = new FormData();

    formData.append('nombre', this.vehicleForm.get('nombre')?.value);
    formData.append('descripcion', this.vehicleForm.get('descripcion')?.value);
    formData.append('precioVenta', this.vehicleForm.get('precioVenta')?.value);
    formData.append(
      'precioAlquilerDiario',
      this.vehicleForm.get('precioAlquilerDiario')?.value
    );
    formData.append('stock', this.vehicleForm.get('stock')?.value);
    formData.append('modelo', this.vehicleForm.get('modelo')?.value);
    formData.append('marca', this.vehicleForm.get('marca')?.value);
    formData.append('categoria', this.vehicleForm.get('categoria')?.value);

    if (this.selectedFiles.length === 0) {
      alert('Por favor, selecciona al menos una imagen para el vehículo.');
      return;
    }

    this.selectedFiles.forEach((file, index) => {
      formData.append('imagenes', file, file.name);
    });

    this.vehicleService.addVehicle(formData).subscribe({
      next: () => {
        alert('Vehículo agregado con éxito');
        this.vehicleForm.reset();
        this.selectedFiles = [];
        this.closeModal('addVehicle');
        this.loadVehicle();
      },
      error: (error) => {
        console.error(error);
        alert('Error al agregar el vehículo.');
      },
    });
  }

  loadVehicle(): void {
    this.vehicleService.getAllVehicle().subscribe((vehicles: Vehicle[]) => {
      this.vehicles = vehicles;
    });
  }

  editVehicle(): void {
    if (this.selectedVehicle) {
      const updatedVehicle: Vehicle = {
        ...this.selectedVehicle,
        ...this.vehicleForm.value,
      };

      this.vehicleService.editVehicle(updatedVehicle).subscribe(() => {
        alert('Vehiculo actualizado');
        this.closeModal('editVehicle');
        this.loadVehicle();
        this.vehicleForm.reset();
      });
    }
  }

  removeVehicle(vehicle: Vehicle | null, modalId: string) {
    if (vehicle) {
      this.vehicleService.deleteVehicle(vehicle).subscribe(() => {
        alert('Vehiculo eliminado');
        this.ngOnInit();
        this.closeModal(modalId);
        this.vehicleForm.reset();
      });
    }
  }

  onFilesSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      this.selectedFiles = Array.from(fileInput.files);
    }
  }
}
