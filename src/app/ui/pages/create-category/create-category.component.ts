import { Component, OnInit } from '@angular/core';
import { CategoryService, Category, PagedResult } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  userName = 'Admin';
  userAvatarUrl = '/assets/user-avatar.jpg';

  categories: Category[] = [];
  totalElements = 0;

  // Estado de paginación y orden que controlará el padre
  page = 0;
  size = 10;
  orderAsc = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(
    page: number = this.page,
    size: number = this.size,
    orderAsc: boolean = this.orderAsc
  ): void {
    this.categoryService
      .getAllCategories(page, size, orderAsc)
      .subscribe({
        next: (response: PagedResult<Category>) => {
          this.categories = response.content;
          this.totalElements = response.totalElements;
          // Actualizo el estado interno para mantenerlo alineado con el hijo
          this.page = page;
          this.size = size;
          this.orderAsc = orderAsc;
        },
        error: (err) => {
          console.error('Error loading categories', err);
        }
      });
  }

  /**
   * Cuando el formulario emite que se creó una categoría,
   * reinicio la paginación a la página 0 para que el usuario
   * vea la nueva categoría en el primer bloque.
   */
  handleNewCategory(cat: Category): void {
    this.loadCategories(0, this.size, this.orderAsc);
  }

  /**
   * Recibe PageEvent desde el componente de tabla
   * y recarga según la nueva página/tamaño/orden.
   */
  onPageChange(event: { page: number; size: number; orderAsc: boolean }): void {
    this.loadCategories(event.page, event.size, event.orderAsc);
  }
}
