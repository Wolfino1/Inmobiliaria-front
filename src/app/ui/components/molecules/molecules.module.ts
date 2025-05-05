import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule }        from '@angular/router';

import { BottomBannerComponent }   from './bottom-banner/bottom-banner.component';
import { SearchBannerComponent }   from './search-banner/search-banner.component';
import { TopNavbarComponent }      from './top-navbar/top-navbar.component';
import { CategoryFormComponent }   from './category-form/category-form.component';
import { CategoriesTableComponent }from './categories-table/categories-table.component';
import { LocationFormComponent }   from './location-form/location-form.component';  

import { AtomsModule } from '../atoms/atoms.module';

@NgModule({
  declarations: [
    BottomBannerComponent,
    SearchBannerComponent,
    TopNavbarComponent,
    CategoryFormComponent,
    CategoriesTableComponent,
    LocationFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AtomsModule,
    RouterModule
  ],
  exports: [
    BottomBannerComponent,
    SearchBannerComponent,
    TopNavbarComponent,
    CategoryFormComponent,
    CategoriesTableComponent,
    LocationFormComponent     
  ]
})
export class MoleculesModule {}

