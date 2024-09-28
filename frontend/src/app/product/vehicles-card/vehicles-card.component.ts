import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../core/models/vehicles.interface.js';
import { VehiclesService } from '../../core/services/vehicles.services.js';

@Component({
  selector: 'app-vehicles-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicles-card.component.html',
  styleUrl: './vehicles-card.component.css'
})
export class VehiclesCardComponent {
  vehicles: Vehicle[] = [];

  constructor(private vehicleService: VehiclesService) {
  }

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehicleService.getAllVehicle().subscribe((vehiculos) => {
      this.vehicles = vehiculos;
      console.log(this.vehicles);
    });
  }

}
