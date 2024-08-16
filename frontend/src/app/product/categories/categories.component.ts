import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
categoryForm: FormGroup=new FormGroup({});

constructor(
  private fb: FormBuilder, 
  private categoriesService: CategoriesService
)
 {}

ngOnInit(): void {
this.categoryForm = this.fb.group({
nombreCategoria: ['', Validators.required],
descripcionCategoria: ['', Validators.required]
});
}

onSubmit() {
  if (this.categoryForm.valid) {
    const categoryData = this.categoryForm.value;
  
    this.categoriesService.addCategory(categoryData).subscribe((category) => {
      alert('Categoria agregada' );
      this.categoryForm.reset();
    });
  }
}
}
