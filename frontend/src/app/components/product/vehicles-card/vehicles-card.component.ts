import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../../core/models/vehicles.interface.js';
import { VehiclesService } from '../../../core/services/vehicles.service.js';
import { RouterLink } from '@angular/router';
import { User } from '../../../core/models/user.interface.js';
import { AuthService } from '../../../core/services/auth.service.js';

@Component({
  selector: 'app-vehicles-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vehicles-card.component.html',
  styleUrl: './vehicles-card.component.css'
})
export class VehiclesCardComponent {
  vehicles: Vehicle[] = [];
  usuarioActual: User|null = null;
  constructor(private vehicleService: VehiclesService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.usuarioActual = this.authService.getCurrentUser()
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehicleService.getAllVehicle().subscribe((vehiculos) => {
      this.vehicles = vehiculos;
      this.vehicles = this.vehicles.filter(vehicle => !vehicle.compra);
    });
  }

  
}
