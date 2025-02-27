import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RentsService } from '../../../core/services/rents.service.js';
import { VehiclesService } from '../../../core/services/vehicles.service.js';
import { Vehicle } from '../../../core/models/vehicles.interface.js';
import { Rent } from '../../../core/models/rent.interface.js';
import { User } from '../../../core/models/user.interface.js';
import { CompraService } from '../../../core/services/compra.service.js';
import { UsuariosService } from '../../../core/services/users.service.js';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalVehiculos: number = 0;
  totalReservas: number = 0;
  totalCompras: number = 0;
  totalIngresosPorReserva: number = 0;
  totalIngresosPorCompras: number = 0;
  vehiculos: Vehicle[] = [];
  usuariosActivos: { nombre: string; cantCompras: number, cantAlquileres: number, cantVentas: number }[] = [];

  constructor(private vehicleService: VehiclesService, private rentService: RentsService, private compraService: CompraService, private usersService: UsuariosService) {}

  ngOnInit(): void {
    this.vehicleService.getAllVehicle().subscribe((data) => {
      this.vehiculos = data;
      this.totalVehiculos = data.length;
    });

    this.compraService.getAllCompra().subscribe((compras) => {
      this.totalCompras = compras.length;
      
      this.totalIngresosPorCompras = compras.reduce((acc, compra) => {
        const precio = compra.vehiculo.precioVenta ?? 0;
        return acc + (typeof precio === 'number' ? precio : 0);
      }, 0);
    });

    /*this.usersService.getAllUser().subscribe((usuarios) => {
      this.usuariosActivos = usuarios.map((usuario) => {
        return {
          nombre: usuario.nombre + ' ' + usuario.apellido,
          cantCompras: usuario.compras.length,
          cantAlquileres: usuario.alquileres.length,
          cantVentas: (() => {
            let cantidadVentas : number = 0;
            for(let vehiculo of usuario.vehiculos) {
              if(vehiculo.compra){
                cantidadVentas++;
              }
            }
            return cantidadVentas;
          })()
        };
      })
    })*/

    this.rentService.getAllRents().subscribe((reservas) => {
      this.totalReservas = reservas.length;
      
      this.totalIngresosPorReserva = reservas.reduce((acc, reserva) => {
        const dias = this.calcularDias(reserva);
        const precioDiario = reserva.vehiculo?.precioAlquilerDiario ?? 0;
        return acc + (dias * (typeof precioDiario === 'number' ? precioDiario : 0));
      }, 0);
    });
  }

  calcularDias(reserva: Rent): number { 
    try {
      const fechaInicio = new Date(reserva.fechaHoraInicioAlquiler);
      const fechaFin = new Date(reserva.fechaHoraDevolucion);
      const diferencia = fechaFin.getTime() - fechaInicio.getTime();
      return Math.max(0, Math.ceil(diferencia / (1000 * 3600 * 24)));
    } catch (error) {
      console.error('Error calculando días:', error);
      return 0;
    }
  }
}
