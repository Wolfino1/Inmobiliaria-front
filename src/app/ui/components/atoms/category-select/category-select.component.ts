import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from 'src/app/shared/services/category.service'; 
@Component({
  selector: 'app-category-select',
    templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss']
})
export class CategorySelectComponent implements OnInit {
  categories: any[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories()
      .subscribe((response: any) => {
        console.log('Respuesta completa:', response); 
        this.categories = response.content;
      });
  }
}
