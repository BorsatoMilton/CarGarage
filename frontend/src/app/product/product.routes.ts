import {Routes} from '@angular/router';
import { CategoriesComponent } from './categories/categories.component.js';
import { BrandComponent } from './brand/brand.component.js';
import { VehicleComponent } from './vehicles/vehicles.component.js';
import { VehiclesCardComponent } from './vehicles-card/vehicles-card.component.js';
import { onlyAdmin } from '../guards/onlyAdmin.guard.js';
import { isLoggedInGuard } from '../guards/is-logged-in.guard.js';
import { CompraComponent } from './compra/compra.component.js';
import { ConfirmPurchaseComponent } from './confirm-purchase/confirm-purchase.component.js';
import { PurchasesComponent } from './purchases/purchases.component.js';

export const productRoutes: Routes = [
    {path: 'categories', component: CategoriesComponent, canActivate: [onlyAdmin]},
    {path: 'brands', component: BrandComponent, canActivate: [onlyAdmin]},
    {path: 'vehicles', component: VehicleComponent, canActivate: [isLoggedInGuard]}, //Aca no se como se manejaria
    {path: 'compra/:id', component: CompraComponent, canActivate: [isLoggedInGuard]},
    {path: 'confirm-purchase', component: ConfirmPurchaseComponent},
    {path: 'purchases', component: PurchasesComponent, canActivate: [isLoggedInGuard]},
    {path: '', component: VehiclesCardComponent},



];