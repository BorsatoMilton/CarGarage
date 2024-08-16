import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)},
    {path: 'product', loadChildren: () => import('./product/product.routes').then(m => m.productRoutes)},
];
