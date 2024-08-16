import {Routes} from '@angular/router';
import { CategoriesComponent } from './categories/categories.component.js';
import { BrandComponent } from './brand/brand.component.js';

export const productRoutes: Routes = [
    {path: 'categories', component: CategoriesComponent},
    {path: 'brands', component: BrandComponent},

];