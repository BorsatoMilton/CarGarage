import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/models/categories.interface';




@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
categoryForm: FormGroup=new FormGroup({});
categories: Category[] = [];



constructor(
  private fb: FormBuilder, 
  private categoriesService: CategoriesService,
){}

ngOnInit(): void {
this.categoryForm = this.fb.group({
nombreCategoria: ['', Validators.required],
descripcionCategoria: ['', Validators.required]
})
this.loadCategories();
}

openModal(){
  const modalDiv = document.getElementById('editCategoria');
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
}



loadCategories(): void {
  this.categoriesService.getAllCategories().subscribe((categories : Category[]) => {
    this.categories = categories;
  });
}



addCategory() {
  if (this.categoryForm.valid) {
    const categoryData = this.categoryForm.value;
  
    this.categoriesService.addCategory(categoryData).subscribe(() => {
      alert('Categoria agregada' );
      this.categoryForm.reset();
      this.closeModal('addCategoria');
      this.ngOnInit();
      
    });
  }

}


editCategory(category: Category) {
}

deleteCategory(category: Category) {
  this.categoriesService.deleteCategory(category).subscribe(() => {
    alert('Categoria eliminada');
    this.ngOnInit();
  });
}

}
