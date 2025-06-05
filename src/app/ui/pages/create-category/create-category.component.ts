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
          this.page = page;
          this.size = size;
          this.orderAsc = orderAsc;
        },
        error: (err) => {
          console.error('Error loading categories', err);
        }
      });
  }

  handleNewCategory(cat: Category): void {
    this.loadCategories(0, this.size, this.orderAsc);
  }

  onPageChange(event: { page: number; size: number; orderAsc: boolean }): void {
    this.loadCategories(event.page, event.size, event.orderAsc);
  }
}
