import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService, Category } from 'src/app/core/services/category.service';
import { NO_INTERNET_ERROR, NO_SERVER, UNKNOWN_ERROR } from 'src/app/shared/errors/constant-error';
import { CATEGORY_CREATED } from 'src/app/shared/errors/constant-success';

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
        this.successMessage = CATEGORY_CREATED;
        this.form.reset();
        this.created.emit(category);
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: err => {
        if (err.status === 0) {
          this.errorMessage = NO_INTERNET_ERROR;
        } else if (err.status >= 500) {
          this.errorMessage = NO_SERVER;
        } else {
          this.errorMessage = err.error?.message || UNKNOWN_ERROR;
        }
        this.successMessage = '';
      }
    });
  }
}