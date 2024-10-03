import {Routes} from '@angular/router';
import { CategoriesComponent } from './categories/categories.component.js';
import { BrandComponent } from './brand/brand.component.js';
import { VehicleComponent } from './vehicles/vehicles.component.js';
import { VehiclesCardComponent } from './vehicles-card/vehicles-card.component.js';
import { authGuard } from '../guards/auth.guard.js';

export const productRoutes: Routes = [
    {path: 'categories', component: CategoriesComponent, canActivate: [authGuard]},
    {path: 'brands', component: BrandComponent, canActivate: [authGuard]},
    {path: 'vehicles', component: VehicleComponent}, //Aca no se como se manejaria
    {path: '', component: VehiclesCardComponent}

];