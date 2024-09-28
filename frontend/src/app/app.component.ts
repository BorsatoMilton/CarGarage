import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component.js';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component.js';
import { FooterComponent } from './shared/components/footer/footer.component.js';
import {VehiclesCardComponent} from './product/vehicles-card/vehicles-card.component.js';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent, NavBarComponent, FooterComponent, VehiclesCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
