import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../../core/models/vehicles.interface.js';
import { VehiclesService } from '../../../core/services/vehicles.service.js';
import { RouterLink } from '@angular/router';
import { User } from '../../../core/models/user.interface.js';
import { AuthService } from '../../../core/services/auth.service.js';
import { FilterComponent } from '../../../shared/components/filter/filter.component.js';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-vehicles-card',
  standalone: true,
  imports: [CommonModule, RouterLink, FilterComponent],
  templateUrl: './vehicles-card.component.html',
  styleUrl: './vehicles-card.component.css',
})
export class VehiclesCardComponent {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  usuarioActual: User | null = null;
  showFilter = false;
  isMobile = false;
  vehiculoSeleccionado: string | null = null;

  constructor(
    private vehicleService: VehiclesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioActual = this.authService.getCurrentUser();
    this.loadVehicles();
    this.checkScreenSize();
  }

  loadVehicles() {
    this.vehicleService.getAllVehicle().subscribe({
      next: (data: Vehicle[]) => {
        this.vehicles = data.filter((vehicle) => !vehicle.compra);
        this.filteredVehicles = this.vehicles;
      },
      error: (err) => {
        console.error('Error al obtener vehiculos:', err);
      },
    });
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  toggleDetalles(id: string): void {
    this.vehiculoSeleccionado = this.vehiculoSeleccionado === id  ? null : id;
  }

  onFilterChanged(filters: any): void {
    this.filteredVehicles = this.vehicles.filter((vehicle) => {
      if (
        filters.category &&
        vehicle.categoria.nombreCategoria !== filters.category
      ) {
        return false;
      }

      if (filters.brand && vehicle.marca.nombreMarca !== filters.brand) {
        return false;
      }

      if (filters.priceDesde && vehicle.precioVenta < filters.priceDesde) {
        return false;
      }

      if (filters.priceHasta && vehicle.precioVenta > filters.priceHasta) {
        return false;
      }

      if (
        filters.kilometersDesde &&
        vehicle.kilometros < filters.kilometersDesde
      ) {
        return false;
      }

      if (
        filters.kilometersHasta &&
        vehicle.kilometros > filters.kilometersHasta
      ) {
        return false;
      }

      if (filters.isRentable && vehicle.precioAlquilerDiario <= 0) {
        return false;
      }

      if (filters.isBuyable && vehicle.precioVenta <= 0) {
        return false;
      }
      return true;
    });
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 992;
    this.showFilter = !this.isMobile;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }
}
