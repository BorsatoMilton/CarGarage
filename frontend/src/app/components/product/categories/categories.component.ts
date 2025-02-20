import { CommonModule } from '@angular/common';
import { Component,  OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../../core/services/categories.service';
import { Category } from '../../../core/models/categories.interface';
import { SearcherComponent } from '../../../shared/components/searcher/searcher.component.js';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { alertMethod } from '../../../shared/components/alerts/alert-function/alerts.functions.js';
import { UniversalAlertComponent } from '../../../shared/components/alerts/universal-alert/universal-alert.component.js';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SearcherComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
categoryForm: FormGroup=new FormGroup({});
categories: Category[] = [];
filteredCategories: Category[] = [];
selectedCategory: Category | null = null;

@ViewChild(UniversalAlertComponent) alertComponent!: UniversalAlertComponent;

constructor(
  private fb: FormBuilder, 
  private categoriesService: CategoriesService,

  ) {
    this.categoryForm = this.fb.group({
      nombreCategoria: [''],
      descripcionCategoria: ['']
    });
   }


ngOnInit(): void {
  this.loadCategories();
}

openModal(modalId: string, category: Category): void{
  this.selectedCategory = category;
  if (category) {
    this.categoryForm.patchValue({
      nombreCategoria: category.nombreCategoria,
      descripcionCategoria: category.descripcionCategoria
    });
  }
  const modalDiv = document.getElementById(modalId);
  if(modalDiv != null){
    modalDiv.style.display='block';
  }
}

closeModal(modalId: string){
  const modalDiv = document.getElementById(modalId);
  if(modalDiv != null){
    modalDiv.style.display='none';
  }
  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop != null) {
    backdrop.parentNode?.removeChild(backdrop);
  }
  this.selectedCategory= null;
}

loadCategories(): void {
  this.categoriesService.getAllCategories().subscribe((categories : Category[]) => {
    this.categories = categories;
    this.filteredCategories = categories;
  });
}

onSearch(filteredCategories: Category[]): void {
  this.filteredCategories = filteredCategories.length > 0 ? filteredCategories: [];
}

checkCategoryExists(): Observable<boolean> {
  const nombreCategoria = this.categoryForm.get('nombreCategoria')?.value;
  return this.categoriesService.getOneCategoryByName(nombreCategoria).pipe(
    map((categoria: Category) => !!categoria),
    catchError(() => of(false))
  );
}

addCategory() {
  if (this.categoryForm.valid) {
    const categoryData = this.categoryForm.value;
    this.checkCategoryExists().subscribe((existe: boolean) => {
      if (!existe) {
          this.categoriesService.addCategory(categoryData).subscribe(() => {
            alertMethod('Alta de categorias','Categoría agregada exitosamente', 'success');
            this.categoryForm.reset();
            this.closeModal('addCategoria');
            this.ngOnInit();
          });
      }else {
        this.alertComponent.showAlert('La categoría ya existe', 'error');
        this.categoryForm.reset();
      }
    });
  }  
}

editCategory(): void {
  if (this.selectedCategory) {
    const updatedCategory: Category = {
      ...this.selectedCategory,
      ...this.categoryForm.value
    };
    this.categoriesService.editCategory(updatedCategory).subscribe(() => {
      alertMethod('Edición de categorias','Categoría editada exitosamente', 'success');
      this.closeModal('editCategoria');
      this.loadCategories();
      this.categoryForm.reset();
    });
  }
}

deleteCategory(category: Category | null, modalId: string) {
  if(category){
      this.categoriesService.deleteCategory(category).subscribe(() => {
        alertMethod('Eliminación de categorias','Categoría eliminada exitosamente', 'success');
        this.ngOnInit();
        this.closeModal(modalId);
        this.categoryForm.reset();
      });
  }
}

}
