import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService, Category } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Output() created = new EventEmitter<Category>();
  form!: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(90)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.categoryService.createCategory(this.form.value).subscribe({
      next: category => {
        this.errorMessage = '';
        this.successMessage = 'Categoría creada con éxito';
        this.form.reset();
        this.created.emit(category);
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: err => {
        if (err.status === 0) {
          this.errorMessage = 'No se pudo conectar al servidor. Revisa tu conexión.';
        } else if (err.status >= 500) {
          this.errorMessage = 'Error en el servidor. Intenta de nuevo más tarde.';
        } else {
          this.errorMessage = err.error?.message || 'Ocurrió un error al crear la categoría.';
        }
        this.successMessage = '';
      }
    });
  }
}